-- ==============================================================================
-- SMART CITY INNOVATION HACKATHON 2026 - COMPLETE DATABASE SCHEMA & RLS POLICIES
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. EXTENSIONS
-- ------------------------------------------------------------------------------
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 2. TABLE DEFINITIONS (Created in dependency order)
-- ------------------------------------------------------------------------------

-- 2.1 Admin Users allowlist
create table if not exists public.admin_users (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null unique references auth.users(id) on delete cascade,
    created_at timestamptz not null default now()
);

-- 2.2 Profiles (Stores both registered auth users and invited/registered team members)
create table if not exists public.profiles (
    id uuid primary key default gen_random_uuid(),
    full_name text not null default '',
    email text not null default '',
    phone text,
    college_name text,
    course text,
    year_of_study text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- 2.3 Teams
create table if not exists public.teams (
    id uuid primary key default gen_random_uuid(),
    team_name text not null unique,
    team_leader_id uuid not null references public.profiles(id) on delete cascade,
    team_size integer not null default 1 check (team_size >= 1 and team_size <= 5),
    registration_status text not null default 'pending' check (registration_status in ('pending', 'verified', 'rejected')),
    team_password text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Ensure team_password column exists if table was already created
alter table public.teams add column if not exists team_password text;

-- 2.4 Team Members
create table if not exists public.team_members (
    id uuid primary key default gen_random_uuid(),
    team_id uuid not null references public.teams(id) on delete cascade,
    user_id uuid not null references public.profiles(id) on delete cascade,
    member_role text not null default 'member' check (member_role in ('leader', 'member')),
    created_at timestamptz not null default now(),
    constraint unique_team_member unique (team_id, user_id)
);

-- 2.5 Payments
create table if not exists public.payments (
    id uuid primary key default gen_random_uuid(),
    team_id uuid not null references public.teams(id) on delete cascade,
    submitted_by uuid not null references public.profiles(id) on delete cascade,
    amount numeric(10,2) not null default 600.00,
    transaction_id text not null,
    payment_screenshot_path text not null,
    payment_status text not null default 'pending' check (payment_status in ('pending', 'verified', 'rejected')),
    verified_by uuid references public.profiles(id),
    verified_at timestamptz,
    created_at timestamptz not null default now()
);

-- 2.6 Problem Statements
create table if not exists public.problem_statements (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    description text not null,
    category text not null,
    organization text not null,
    published boolean not null default false,
    created_by uuid references public.profiles(id),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- 2.7 Announcements
create table if not exists public.announcements (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    message text not null,
    audience text not null default 'all' check (audience in ('all', 'leaders', 'participants')),
    created_by uuid references public.profiles(id),
    created_at timestamptz not null default now()
);

-- 2.8 Email Logs
create table if not exists public.email_logs (
    id uuid primary key default gen_random_uuid(),
    recipient_email text not null,
    subject text not null,
    email_type text not null,
    status text not null default 'sent',
    sent_by uuid references public.profiles(id),
    created_at timestamptz not null default now()
);

-- ------------------------------------------------------------------------------
-- 3. STORAGE BUCKET
-- ------------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('payment-screenshots', 'payment-screenshots', false)
on conflict (id) do nothing;

-- ------------------------------------------------------------------------------
-- 4. PERFORMANCE INDEXES (All target tables exist at this stage)
-- ------------------------------------------------------------------------------
create index if not exists idx_teams_leader on public.teams(team_leader_id);
create index if not exists idx_team_members_team on public.team_members(team_id);
create index if not exists idx_team_members_user on public.team_members(user_id);
create index if not exists idx_payments_team on public.payments(team_id);
create index if not exists idx_payments_submitted on public.payments(submitted_by);
create index if not exists idx_problem_statements_published on public.problem_statements(published);

-- ------------------------------------------------------------------------------
-- 5. AUTH TRIGGERS FOR PROFILES
-- ------------------------------------------------------------------------------
-- Automatically create or update profile upon auth.users sign up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id, full_name, email, phone, college_name, course, year_of_study
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'college_name',
    new.raw_user_meta_data->>'course',
    new.raw_user_meta_data->>'year_of_study'
  )
  on conflict (id) do update set
    full_name = coalesce(excluded.full_name, profiles.full_name),
    email = excluded.email,
    phone = coalesce(excluded.phone, profiles.phone),
    college_name = coalesce(excluded.college_name, profiles.college_name),
    course = coalesce(excluded.course, profiles.course),
    year_of_study = coalesce(excluded.year_of_study, profiles.year_of_study),
    updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert or update on auth.users
  for each row execute procedure public.handle_new_user();

-- Trigger to delete profile when user is removed from auth.users
create or replace function public.handle_user_delete()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.profiles where id = old.id;
  return old;
end;
$$;

drop trigger if exists on_auth_user_deleted on auth.users;
create trigger on_auth_user_deleted
  after delete on auth.users
  for each row execute procedure public.handle_user_delete();

-- ------------------------------------------------------------------------------
-- 6. SECURITY DEFINER HELPER FUNCTIONS (Prevent RLS infinite recursion)
-- ------------------------------------------------------------------------------

-- Helper: Check if current authenticated user is an administrator
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

-- Helper: Check if user is a member of the given team
create or replace function public.is_team_member(check_team_id uuid, check_user_id uuid default auth.uid())
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.team_members
    where team_id = check_team_id and user_id = check_user_id
  );
$$;

-- Helper: Check if user is the leader of the given team
create or replace function public.is_team_leader(check_team_id uuid, check_user_id uuid default auth.uid())
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.teams
    where id = check_team_id and team_leader_id = check_user_id
  );
$$;

-- Helper: Check if target user shares any team with the current authenticated user
create or replace function public.is_teammate(target_user_id uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 
    from public.team_members tm1
    join public.team_members tm2 on tm1.team_id = tm2.team_id
    where tm1.user_id = auth.uid() and tm2.user_id = target_user_id
  );
$$;

-- ------------------------------------------------------------------------------
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------

-- 7.1 ADMIN USERS POLICIES
alter table public.admin_users enable row level security;

drop policy if exists "Admins can view admin_users list" on public.admin_users;
create policy "Admins can view admin_users list"
    on public.admin_users for select
    using (public.is_admin());

-- 7.2 PROFILES POLICIES
alter table public.profiles enable row level security;

drop policy if exists "Users can view own profile or admins can view all" on public.profiles;
drop policy if exists "profiles_select_policy" on public.profiles;
create policy "profiles_select_policy"
    on public.profiles for select
    using (
        auth.uid() = id 
        or public.is_admin()
        or public.is_teammate(id)
    );

drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "profiles_update_policy" on public.profiles;
create policy "profiles_update_policy"
    on public.profiles for update
    using (auth.uid() = id or public.is_admin());

drop policy if exists "Users can insert own profile" on public.profiles;
drop policy if exists "profiles_insert_policy" on public.profiles;
create policy "profiles_insert_policy"
    on public.profiles for insert
    with check (true);

-- 7.3 TEAMS POLICIES
alter table public.teams enable row level security;

drop policy if exists "Team members and admins can view teams" on public.teams;
drop policy if exists "teams_select_policy" on public.teams;
-- Readable so team name checking during registration and lookup by team name during login works reliably
create policy "teams_select_policy"
    on public.teams for select
    using (true);

drop policy if exists "Authenticated users can create a team" on public.teams;
drop policy if exists "teams_insert_policy" on public.teams;
create policy "teams_insert_policy"
    on public.teams for insert
    with check (true);

drop policy if exists "Leaders and admins can update team" on public.teams;
drop policy if exists "teams_update_policy" on public.teams;
create policy "teams_update_policy"
    on public.teams for update
    using (team_leader_id = auth.uid() or public.is_admin());

drop policy if exists "teams_delete_policy" on public.teams;
create policy "teams_delete_policy"
    on public.teams for delete
    using (team_leader_id = auth.uid() or public.is_admin());

-- 7.4 TEAM MEMBERS POLICIES
alter table public.team_members enable row level security;

drop policy if exists "Team members and admins can view members" on public.team_members;
drop policy if exists "team_members_select_policy" on public.team_members;
create policy "team_members_select_policy"
    on public.team_members for select
    using (
        public.is_admin()
        or user_id = auth.uid()
        or public.is_team_leader(team_id)
        or public.is_team_member(team_id)
    );

drop policy if exists "Team leaders can add members" on public.team_members;
drop policy if exists "team_members_insert_policy" on public.team_members;
create policy "team_members_insert_policy"
    on public.team_members for insert
    with check (true);

drop policy if exists "Team leaders or admins can delete members" on public.team_members;
drop policy if exists "team_members_delete_policy" on public.team_members;
create policy "team_members_delete_policy"
    on public.team_members for delete
    using (
        public.is_admin()
        or public.is_team_leader(team_id)
    );

-- 7.5 PAYMENTS POLICIES
alter table public.payments enable row level security;

drop policy if exists "Team members and admins can view payments" on public.payments;
drop policy if exists "payments_select_policy" on public.payments;
create policy "payments_select_policy"
    on public.payments for select
    using (
        submitted_by = auth.uid()
        or public.is_admin()
        or public.is_team_leader(team_id)
        or public.is_team_member(team_id)
    );

drop policy if exists "Team leader or members can submit payment" on public.payments;
drop policy if exists "payments_insert_policy" on public.payments;
create policy "payments_insert_policy"
    on public.payments for insert
    with check (true);

drop policy if exists "Admins can update payments" on public.payments;
drop policy if exists "payments_update_policy" on public.payments;
create policy "payments_update_policy"
    on public.payments for update
    using (public.is_admin());

-- 7.6 PROBLEM STATEMENTS POLICIES
alter table public.problem_statements enable row level security;

drop policy if exists "Anyone can view published problem statements" on public.problem_statements;
drop policy if exists "problem_statements_select_policy" on public.problem_statements;
create policy "problem_statements_select_policy"
    on public.problem_statements for select
    using (published = true or public.is_admin());

drop policy if exists "Admins can insert problem statements" on public.problem_statements;
drop policy if exists "problem_statements_insert_policy" on public.problem_statements;
create policy "problem_statements_insert_policy"
    on public.problem_statements for insert
    with check (public.is_admin());

drop policy if exists "Admins can update problem statements" on public.problem_statements;
drop policy if exists "problem_statements_update_policy" on public.problem_statements;
create policy "problem_statements_update_policy"
    on public.problem_statements for update
    using (public.is_admin());

drop policy if exists "Admins can delete problem statements" on public.problem_statements;
drop policy if exists "problem_statements_delete_policy" on public.problem_statements;
create policy "problem_statements_delete_policy"
    on public.problem_statements for delete
    using (public.is_admin());

-- 7.7 ANNOUNCEMENTS POLICIES
alter table public.announcements enable row level security;

drop policy if exists "Users can view announcements" on public.announcements;
drop policy if exists "announcements_select_policy" on public.announcements;
create policy "announcements_select_policy"
    on public.announcements for select
    using (
        audience = 'all'
        or public.is_admin()
        or (audience = 'leaders' and exists (
            select 1 from public.teams where teams.team_leader_id = auth.uid()
        ))
        or (audience = 'participants' and auth.uid() is not null)
    );

drop policy if exists "Admins can create announcements" on public.announcements;
drop policy if exists "announcements_insert_policy" on public.announcements;
create policy "announcements_insert_policy"
    on public.announcements for insert
    with check (public.is_admin());

drop policy if exists "Admins can update announcements" on public.announcements;
drop policy if exists "announcements_update_policy" on public.announcements;
create policy "announcements_update_policy"
    on public.announcements for update
    using (public.is_admin());

drop policy if exists "Admins can delete announcements" on public.announcements;
drop policy if exists "announcements_delete_policy" on public.announcements;
create policy "announcements_delete_policy"
    on public.announcements for delete
    using (public.is_admin());

-- 7.8 EMAIL LOGS POLICIES
alter table public.email_logs enable row level security;

drop policy if exists "Admins can view email logs" on public.email_logs;
drop policy if exists "email_logs_select_policy" on public.email_logs;
create policy "email_logs_select_policy"
    on public.email_logs for select
    using (public.is_admin());

drop policy if exists "Admins can insert email logs" on public.email_logs;
drop policy if exists "email_logs_insert_policy" on public.email_logs;
create policy "email_logs_insert_policy"
    on public.email_logs for insert
    with check (public.is_admin() or auth.role() = 'authenticated');

-- 7.9 STORAGE OBJECTS POLICIES
drop policy if exists "Authenticated users can upload payment screenshots" on storage.objects;
drop policy if exists "Anyone can upload payment screenshots" on storage.objects;
create policy "Anyone can upload payment screenshots"
    on storage.objects for insert
    with check (bucket_id = 'payment-screenshots');

drop policy if exists "Users and admins can view payment screenshots" on storage.objects;
create policy "Users and admins can view payment screenshots"
    on storage.objects for select
    using (
        bucket_id = 'payment-screenshots'
        and (
            public.is_admin()
            or auth.uid() = owner
            or auth.role() = 'authenticated'
        )
    );

-- ==============================================================================
-- INSTRUCTIONS FOR SETTING UP AN ADMIN USER:
-- To designate any registered user as an administrator, execute in the SQL Editor:
-- INSERT INTO public.admin_users (user_id) 
-- VALUES ('<YOUR_USER_UUID_FROM_AUTH_USERS>')
-- ON CONFLICT (user_id) DO NOTHING;
-- ==============================================================================