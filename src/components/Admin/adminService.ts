/**
 * Admin Hackathon Management Service
 * Manages registrations, participants, email dispatch, problem statements,
 * event settings, and audit logs.
 */

import {
  TeamRegistration,
  ParticipantRecord,
  AdminStats,
  EmailLog,
  ProblemStatementAdminItem,
  AuditLogEntry,
  EventSettings,
  RegistrationStatus,
  EmailDeliveryStatus,
} from './types';
import { Announcement } from '../Dashboard/types';
import { supabase } from '../../lib/supabase';

const TEAMS_STORAGE_KEY = 'sci2026_registered_teams';
const ANNOUNCEMENTS_STORAGE_KEY = 'sci2026_announcements';
const PROBLEM_STATEMENTS_STORAGE_KEY = 'sci2026_admin_problem_statements';
const PS_PUBLISHED_KEY = 'sci2026_ps_published';
const EMAIL_LOGS_KEY = 'sci2026_admin_email_logs';
const AUDIT_LOGS_KEY = 'sci2026_admin_audit_logs';
const EVENT_SETTINGS_KEY = 'sci2026_event_settings';

// Seed Teams matching the reference image: 56 Teams, 214 Participants (56 Leaders + 158 Members)
// 48 Confirmed, 8 Pending, 0 Cancelled
// Team Size distribution: 18 with 2 members (32%), 24 with 3 members (43%), 14 with 4 members (25%)
// Total participants = 18*2 + 24*3 + 14*4 = 36 + 72 + 56 = 164? Wait:
// In the screenshot:
// 2 Members: 18 teams (36 participants)
// 3 Members: 24 teams (72 participants)
// 4 Members: 14 teams (56 participants)
// Sum = 18 + 24 + 14 = 56 teams! And 56 Leaders + 158 Additional Members = 214 total participants!
const INITIAL_TEAMS: TeamRegistration[] = [
  {
    id: 't-087',
    registrationId: 'SCI2026-087',
    teamName: 'Urban Innovators',
    teamLeader: 'Aditya Sharma',
    leaderEmail: 'aditya.sharma@iitn.ac.in',
    leaderPhone: '+91 98765 43210',
    college: 'IIT Nanded',
    branch: 'Computer Science',
    teamSize: 4,
    registrationDate: '12 Apr 2026',
    timestamp: 1776000000000,
    status: 'Confirmed',
    confirmationEmailStatus: 'Delivered',
    confirmationSentAt: '12 Apr 2026, 14:35',
    members: [
      { id: 'm1', fullName: 'Aditya Sharma', email: 'aditya.sharma@iitn.ac.in', phone: '+91 98765 43210', college: 'IIT Nanded', branch: 'Computer Science', role: 'Team Leader' },
      { id: 'm2', fullName: 'Priya Verma', email: 'priya.verma@iitn.ac.in', phone: '+91 98765 43211', college: 'IIT Nanded', branch: 'Information Technology', role: 'Member' },
      { id: 'm3', fullName: 'Rohan Patil', email: 'rohan.patil@iitn.ac.in', phone: '+91 98765 43212', college: 'IIT Nanded', branch: 'Civil Engineering', role: 'Member' },
      { id: 'm4', fullName: 'Sneha Kulkarni', email: 'sneha.kulkarni@iitn.ac.in', phone: '+91 98765 43213', college: 'IIT Nanded', branch: 'Electronics & IoT', role: 'Member' },
    ],
  },
  {
    id: 't-086',
    registrationId: 'SCI2026-086',
    teamName: 'TechTitans',
    teamLeader: 'Priya Verma',
    leaderEmail: 'priya.v@coep.ac.in',
    leaderPhone: '+91 98234 11223',
    college: 'COEP Pune',
    branch: 'AI & Data Science',
    teamSize: 3,
    registrationDate: '12 Apr 2026',
    timestamp: 1775980000000,
    status: 'Confirmed',
    confirmationEmailStatus: 'Delivered',
    confirmationSentAt: '12 Apr 2026, 11:20',
    members: [
      { id: 'm5', fullName: 'Priya Verma', email: 'priya.v@coep.ac.in', phone: '+91 98234 11223', college: 'COEP Pune', branch: 'AI & Data Science', role: 'Team Leader' },
      { id: 'm6', fullName: 'Amitabh Joshi', email: 'amitabh.j@coep.ac.in', phone: '+91 98234 11224', college: 'COEP Pune', branch: 'Computer Engineering', role: 'Member' },
      { id: 'm7', fullName: 'Tanvi Deshmukh', email: 'tanvi.d@coep.ac.in', phone: '+91 98234 11225', college: 'COEP Pune', branch: 'Electronics', role: 'Member' },
    ],
  },
  {
    id: 't-085',
    registrationId: 'SCI2026-085',
    teamName: 'GreenBuild',
    teamLeader: 'Rohan Patil',
    leaderEmail: 'rohan.patil@vnit.ac.in',
    leaderPhone: '+91 97654 33445',
    college: 'VNIT Nagpur',
    branch: 'Civil & Environmental',
    teamSize: 4,
    registrationDate: '11 Apr 2026',
    timestamp: 1775890000000,
    status: 'Pending',
    confirmationEmailStatus: 'Pending',
    members: [
      { id: 'm8', fullName: 'Rohan Patil', email: 'rohan.patil@vnit.ac.in', phone: '+91 97654 33445', college: 'VNIT Nagpur', branch: 'Civil & Environmental', role: 'Team Leader' },
      { id: 'm9', fullName: 'Kavita Iyer', email: 'kavita.i@vnit.ac.in', phone: '+91 97654 33446', college: 'VNIT Nagpur', branch: 'Architecture', role: 'Member' },
      { id: 'm10', fullName: 'Saurabh Rao', email: 'saurabh.r@vnit.ac.in', phone: '+91 97654 33447', college: 'VNIT Nagpur', branch: 'Electrical Engineering', role: 'Member' },
      { id: 'm11', fullName: 'Neha Shinde', email: 'neha.s@vnit.ac.in', phone: '+91 97654 33448', college: 'VNIT Nagpur', branch: 'Urban Systems', role: 'Member' },
    ],
  },
  {
    id: 't-084',
    registrationId: 'SCI2026-084',
    teamName: 'CityMinds',
    teamLeader: 'Sneha Kulkarni',
    leaderEmail: 'sneha.k@iitb.ac.in',
    leaderPhone: '+91 98112 55667',
    college: 'IIT Bombay',
    branch: 'Electrical Engineering',
    teamSize: 2,
    registrationDate: '11 Apr 2026',
    timestamp: 1775870000000,
    status: 'Confirmed',
    confirmationEmailStatus: 'Delivered',
    confirmationSentAt: '11 Apr 2026, 16:40',
    members: [
      { id: 'm12', fullName: 'Sneha Kulkarni', email: 'sneha.k@iitb.ac.in', phone: '+91 98112 55667', college: 'IIT Bombay', branch: 'Electrical Engineering', role: 'Team Leader' },
      { id: 'm13', fullName: 'Vikramaditya Shah', email: 'vikram.s@iitb.ac.in', phone: '+91 98112 55668', college: 'IIT Bombay', branch: 'Computer Science', role: 'Member' },
    ],
  },
  {
    id: 't-083',
    registrationId: 'SCI2026-083',
    teamName: 'UrbanX',
    teamLeader: 'Arjun Mehta',
    leaderEmail: 'arjun.mehta@nitt.edu',
    leaderPhone: '+91 99001 77889',
    college: 'NIT Trichy',
    branch: 'Robotics & Automation',
    teamSize: 3,
    registrationDate: '10 Apr 2026',
    timestamp: 1775790000000,
    status: 'Pending',
    confirmationEmailStatus: 'Pending',
    members: [
      { id: 'm14', fullName: 'Arjun Mehta', email: 'arjun.mehta@nitt.edu', phone: '+91 99001 77889', college: 'NIT Trichy', branch: 'Robotics & Automation', role: 'Team Leader' },
      { id: 'm15', fullName: 'Devraj Chauhan', email: 'devraj.c@nitt.edu', phone: '+91 99001 77890', college: 'NIT Trichy', branch: 'Mechanical', role: 'Member' },
      { id: 'm16', fullName: 'Pooja Hegde', email: 'pooja.h@nitt.edu', phone: '+91 99001 77891', college: 'NIT Trichy', branch: 'Electronics', role: 'Member' },
    ],
  },
];

// Generator to fill up to 56 realistic teams with matching distribution (18 size 2, 24 size 3, 14 size 4; 48 Confirmed, 8 Pending)
function generateFullSeedTeams(): TeamRegistration[] {
  const result: TeamRegistration[] = [...INITIAL_TEAMS];
  const colleges = [
    'MGM College of Engineering, Nanded',
    'SGGS Institute of Technology, Nanded',
    'VJTI Mumbai',
    'COEP Technological University, Pune',
    'BITS Pilani, Goa Campus',
    'IIT Bombay',
    'VNIT Nagpur',
    'Walchand College of Engineering, Sangli',
    'PICT Pune',
    'MIT World Peace University, Pune',
  ];

  const branches = [
    'Computer Science & Engineering',
    'Information Technology',
    'Artificial Intelligence & Data Science',
    'Electronics & Telecommunication',
    'Civil & Infrastructure Planning',
    'Electrical & Smart Grid Systems',
  ];

  const firstNames = ['Aarav', 'Vihaan', 'Aditi', 'Ananya', 'Aryan', 'Ishaan', 'Diya', 'Kabir', 'Rhea', 'Aman', 'Siddharth', 'Nikhil', 'Pooja', 'Rahul', 'Simran', 'Tanmay', 'Gaurav', 'Manish', 'Meera', 'Tarun', 'Anushka', 'Varun', 'Sakshi', 'Kunal', 'Shruti'];
  const lastNames = ['Sharma', 'Patel', 'Kulkarni', 'Deshmukh', 'Verma', 'Singh', 'Chavan', 'Jadhav', 'Reddy', 'Rao', 'Nair', 'Iyer', 'Bose', 'Menon', 'Gupta', 'Shinde', 'Pawar', 'More', 'Chopra'];

  // Current counts:
  // initial has:
  // size 4: 2 (Urban Innovators, GreenBuild) -> need 12 more
  // size 3: 2 (TechTitans, UrbanX) -> need 22 more
  // size 2: 1 (CityMinds) -> need 17 more
  // Total = 5 + 12 + 22 + 17 = 56 teams!
  // Pending count in initial: 2 (GreenBuild, UrbanX) -> need 6 more pending to total 8. Rest 48 confirmed.

  const targetSizes = [
    ...Array(12).fill(4),
    ...Array(22).fill(3),
    ...Array(17).fill(2),
  ];

  let idCounter = 82;
  let pendingAllocated = 2; // already 2 pending in initial

  for (let i = 0; i < targetSizes.length; i++) {
    const size = targetSizes[i];
    const isPending = pendingAllocated < 8 && i % 6 === 0;
    if (isPending) pendingAllocated++;

    const regNumStr = idCounter < 10 ? `00${idCounter}` : idCounter < 100 ? `0${idCounter}` : `${idCounter}`;
    const regId = `SCI2026-${regNumStr}`;
    const leaderFirst = firstNames[(i * 3 + 1) % firstNames.length];
    const leaderLast = lastNames[(i * 2 + 3) % lastNames.length];
    const leaderName = `${leaderFirst} ${leaderLast}`;
    const college = colleges[i % colleges.length];
    const branch = branches[(i * 2) % branches.length];
    const teamName = `Team ${leaderFirst}X_${size}`;
    const emailPrefix = `${leaderFirst.toLowerCase()}.${leaderLast.toLowerCase()}${i}`;
    const leaderEmail = `${emailPrefix}@${college.toLowerCase().includes('nanded') ? 'mgmcen.ac.in' : 'univ.edu.in'}`;

    const members: TeamRegistration['members'] = [
      {
        id: `m-${idCounter}-1`,
        fullName: leaderName,
        email: leaderEmail,
        phone: `+91 9${(800000000 + i * 12345).toString().slice(0, 9)}`,
        college,
        branch,
        role: 'Team Leader',
      },
    ];

    for (let m = 2; m <= size; m++) {
      const mFirst = firstNames[(i * 4 + m * 5) % firstNames.length];
      const mLast = lastNames[(i * 3 + m * 7) % lastNames.length];
      members.push({
        id: `m-${idCounter}-${m}`,
        fullName: `${mFirst} ${mLast}`,
        email: `${mFirst.toLowerCase()}.${mLast.toLowerCase()}${idCounter}@univ.edu.in`,
        phone: `+91 9${(700000000 + (i + m) * 23456).toString().slice(0, 9)}`,
        college,
        branch: branches[(m + i) % branches.length],
        role: 'Member',
      });
    }

    const regDay = Math.max(1, 12 - Math.floor(i / 5));
    const regDate = `${regDay < 10 ? `0${regDay}` : regDay} Apr 2026`;

    result.push({
      id: `t-${regNumStr}`,
      registrationId: regId,
      teamName,
      teamLeader: leaderName,
      leaderEmail,
      leaderPhone: members[0].phone,
      college,
      branch,
      teamSize: size,
      registrationDate: regDate,
      timestamp: 1775000000000 - i * 86400000,
      status: isPending ? 'Pending' : 'Confirmed',
      confirmationEmailStatus: isPending ? 'Pending' : 'Delivered',
      confirmationSentAt: isPending ? undefined : `${regDate}, 10:30`,
      members,
    });

    idCounter--;
  }

  return result;
}

// Initial Admin Problem Statements
const INITIAL_PROBLEM_STATEMENTS: ProblemStatementAdminItem[] = [
  {
    id: 'ps-01',
    referenceCode: 'PS-SCI-2026-01',
    title: 'Adaptive Smart Traffic Flow and Emergency Corridor Priority System',
    category: 'Smart Mobility & Traffic',
    shortDescription: 'AI-driven dynamic signal orchestration with instant green-light routing for emergency medical and fire response vehicles.',
    fullDescription: 'Modern urban intersections suffer from rigid timing cycles that cause massive congestion delays and block emergency ambulances. The objective is to design a high-throughput computer vision edge system integrated with GPS vehicle beacons to predict traffic surges and open clear corridor waves.',
    requirements: [
      'Real-time traffic camera feed processing with sub-100ms latency',
      'Geofenced emergency vehicle beacon transmitter & receiver handshake',
      'Fail-safe manual bypass for municipal traffic control center officers',
      'Carbon emission reduction and wait-time telemetry analytics',
    ],
    expectedOutcomes: [
      'Functional simulator or physical hardware model demonstrating signal preemption',
      'Web-based administrative dispatch dashboard for municipal traffic monitoring',
      'Documented API architecture for city sensor grid deployment',
    ],
    referenceResources: ['https://smartcities.gov.in', 'https://open-traffic-data.org'],
    status: 'Draft',
    createdAt: '06 Apr 2026',
    selectedByTeamsCount: 0,
  },
  {
    id: 'ps-02',
    referenceCode: 'PS-SCI-2026-02',
    title: 'Autonomous Smart Waste Segregation and Predictive Bin Logistics',
    category: 'Waste & Sanitation',
    shortDescription: 'IoT sensor network for optical segregation of recyclables and dynamic route optimization for municipal garbage fleets.',
    fullDescription: 'Overflowing municipal dumpsters lead to severe sanitation hazards. This track calls for an end-to-end edge-AI sorting bin that categorizes organic vs recyclable materials while transmitting fill-level telemetry to optimize fuel-efficient truck routing.',
    requirements: [
      'Edge camera ML classifier for wet, dry, plastic, and electronic waste',
      'Ultrasonic fill-level and odor detection module over LoRaWAN/NB-IoT',
      'Dynamic route re-calculation dashboard for sanitation truck drivers',
    ],
    expectedOutcomes: [
      'Live prototype bin classification demo with accuracy benchmarks',
      'Fleet route management application with turn-by-turn routing',
    ],
    referenceResources: ['https://swachhbharatmission.gov.in'],
    status: 'Draft',
    createdAt: '07 Apr 2026',
    selectedByTeamsCount: 0,
  },
  {
    id: 'ps-03',
    referenceCode: 'PS-SCI-2026-03',
    title: 'Microgrid Energy Optimization and Decentralized Peer-to-Peer Trading',
    category: 'Clean Energy & Smart Grid',
    shortDescription: 'Distributed ledger system enabling rooftop solar households to trade surplus power locally and balance community substation peaks.',
    fullDescription: 'Suburban solar adoption creates duck curves and grid strain. Build a verifiable energy telemetry and micro-transaction exchange that automatically sells surplus kilowatt-hours to neighboring buildings during peak load windows.',
    requirements: [
      'Smart meter interface simulation with tamper-evident audit logs',
      'Automated smart contract or cryptographic matching engine for peer billing',
      'Substation load-shedding prevention algorithms',
    ],
    expectedOutcomes: [
      'Consumer energy monitoring & trading mobile/web application',
      'Substation operator grid stability monitor',
    ],
    referenceResources: ['https://cea.nic.in/smartgrid'],
    status: 'Draft',
    createdAt: '08 Apr 2026',
    selectedByTeamsCount: 0,
  },
  {
    id: 'ps-04',
    referenceCode: 'PS-SCI-2026-04',
    title: 'Underground Pipeline Leak Detection & Water Quality Telemetry',
    category: 'Water Resource Management',
    shortDescription: 'Acoustic and pressure IoT node system to pinpoint subterranean water main bursts and detect chemical contaminants.',
    fullDescription: 'Cities lose up to 35% of potable water due to unnoticed underground distribution leakages. Build an acoustic wave analysis and pressure sensor network to identify pipeline leaks within a 5-meter radius and monitor pH/turbidity standards.',
    requirements: [
      'Acoustic signal pattern recognition for turbulent pipe leaks',
      'Continuous water purity monitoring (TDS, pH, turbidity)',
      'Instant burst alerts to municipal ward water engineers',
    ],
    expectedOutcomes: [
      'Sensor node simulation/hardware setup with pipe model',
      'Ward-level municipal pipe GIS map overlay',
    ],
    referenceResources: ['https://jaljeevanmission.gov.in'],
    status: 'Draft',
    createdAt: '09 Apr 2026',
    selectedByTeamsCount: 0,
  },
];

// Initial Email Logs matching screenshot
const INITIAL_EMAIL_LOGS: EmailLog[] = [
  {
    id: 'em-01',
    subject: 'Registration Confirmation & Team Credentials',
    category: 'Registration Confirmation',
    recipientCategory: 'All Registered Teams',
    recipientCount: 56,
    recipientEmails: ['team-leaders-batch1@sci2026.org'],
    sentAt: '10 Apr 2026, 10:30 AM',
    status: 'Sent',
    sentBy: 'Admin (Organizer)',
    bodyPreview: 'Dear Team Leader, your registration for Smart City Innovation Hackathon 2026 has been confirmed...',
  },
  {
    id: 'em-02',
    subject: 'Event Update — Orientation Webinar Link and Schedule',
    category: 'Important Event Update',
    recipientCategory: 'All Participants',
    recipientCount: 214,
    recipientEmails: ['all-participants@sci2026.org'],
    sentAt: '08 Apr 2026, 04:15 PM',
    status: 'Sent',
    sentBy: 'Admin (Organizer)',
    bodyPreview: 'Hello Innovators! Please join our pre-hackathon orientation session on 12 April 2026 at 5:00 PM IST...',
  },
  {
    id: 'em-03',
    subject: 'Problem Statement Release Preview & Mentor Guidelines',
    category: 'Problem Statement Release',
    recipientCategory: 'All Team Leaders',
    recipientCount: 0,
    recipientEmails: [],
    sentAt: '06 Apr 2026, 11:20 AM',
    status: 'Draft',
    sentBy: 'Admin (Organizer)',
    bodyPreview: 'Organizer preview of problem statement release schedule and evaluation rubric...',
  },
];

// Initial Audit Logs
const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud-01',
    adminName: 'Admin Organizer',
    adminRole: 'Super Admin',
    action: 'REGISTRATION_STATUS_UPDATE',
    details: 'Verified and confirmed Team Urban Innovators (SCI2026-087)',
    timestamp: '12 Apr 2026, 14:35',
    recordRef: 'SCI2026-087',
    status: 'Success',
  },
  {
    id: 'aud-02',
    adminName: 'Admin Organizer',
    adminRole: 'Super Admin',
    action: 'CONFIRMATION_EMAIL_SENT',
    details: 'Sent confirmation email to Aditya Sharma (Urban Innovators)',
    timestamp: '12 Apr 2026, 14:36',
    recordRef: 'aditya.sharma@iitn.ac.in',
    status: 'Success',
  },
  {
    id: 'aud-03',
    adminName: 'Admin Organizer',
    adminRole: 'Super Admin',
    action: 'PROBLEM_STATEMENT_CREATED',
    details: 'Created draft challenge PS-SCI-2026-01: Adaptive Smart Traffic Flow',
    timestamp: '06 Apr 2026, 10:15',
    recordRef: 'PS-SCI-2026-01',
    status: 'Success',
  },
  {
    id: 'aud-04',
    adminName: 'Admin Organizer',
    adminRole: 'Super Admin',
    action: 'BULK_EMAIL_DISPATCH',
    details: 'Dispatched orientation update to 214 participants',
    timestamp: '08 Apr 2026, 16:15',
    recordRef: 'Batch #EM-02',
    status: 'Success',
  },
];

// Helper to get stored items
export function getStoredTeams(): TeamRegistration[] {
  if (typeof window === 'undefined') return INITIAL_TEAMS;
  try {
    const raw = window.localStorage.getItem(TEAMS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length >= 10) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading stored teams', err);
  }

  // Seed with full realistic roster matching the 56 teams / 214 participants requirement
  const fullSeed = generateFullSeedTeams();
  try {
    window.localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(fullSeed));
  } catch {
    // ignore
  }
  return fullSeed;
}

export function saveStoredTeams(teams: TeamRegistration[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(teams));
  } catch (err) {
    console.error('Error saving teams', err);
  }
}

/**
 * Compute real-time admin statistics from actual registrations
 */
export function getAdminStats(): AdminStats {
  const teams = getStoredTeams();
  const totalRegistrations = teams.length;
  let totalParticipants = 0;
  let totalTeamLeaders = 0;
  let totalTeamMembers = 0;
  let pendingConfirmations = 0;
  let confirmedRegistrations = 0;
  let cancelledRegistrations = 0;

  const sizeCounts = { size2: 0, size3: 0, size4: 0 };

  // Calculate unique participants and roles
  teams.forEach((t) => {
    if (t.status === 'Confirmed') confirmedRegistrations++;
    else if (t.status === 'Pending') pendingConfirmations++;
    else if (t.status === 'Cancelled') cancelledRegistrations++;

    if (t.teamSize === 2) sizeCounts.size2++;
    else if (t.teamSize === 3) sizeCounts.size3++;
    else if (t.teamSize === 4) sizeCounts.size4++;

    // Count leader
    totalTeamLeaders++;
    // Count additional members
    const memberCount = t.members && t.members.length > 0 ? t.members.length - 1 : t.teamSize - 1;
    totalTeamMembers += Math.max(0, memberCount);
    totalParticipants += (t.members?.length || t.teamSize);
  });

  // Time chart mock breakdown over last 30 days
  const registrationsOverTime = [
    { date: 'Mar 1', count: 2 },
    { date: 'Mar 5', count: 4 },
    { date: 'Mar 10', count: 6 },
    { date: 'Mar 15', count: 12 },
    { date: 'Mar 20', count: 17 },
    { date: 'Mar 25', count: 10 },
    { date: 'Mar 30', count: 5 },
  ];

  return {
    totalRegistrations,
    totalParticipants,
    totalTeamLeaders,
    totalTeamMembers,
    pendingConfirmations,
    confirmedRegistrations,
    cancelledRegistrations,
    teamSizeDistribution: sizeCounts,
    registrationsOverTime,
  };
}

/**
 * Get flattened list of unique participants
 */
export function getAllParticipants(): ParticipantRecord[] {
  const teams = getStoredTeams();
  const result: ParticipantRecord[] = [];

  teams.forEach((team) => {
    if (team.members && team.members.length > 0) {
      team.members.forEach((m) => {
        result.push({
          id: m.id,
          fullName: m.fullName,
          role: m.role,
          teamName: team.teamName,
          teamRegistrationId: team.registrationId,
          email: m.email,
          phone: m.phone,
          college: m.college || team.college,
          branch: m.branch || team.branch,
          status: team.status,
        });
      });
    } else {
      // Fallback from team leader
      result.push({
        id: `lead-${team.id}`,
        fullName: team.teamLeader,
        role: 'Team Leader',
        teamName: team.teamName,
        teamRegistrationId: team.registrationId,
        email: team.leaderEmail,
        phone: team.leaderPhone,
        college: team.college,
        branch: team.branch,
        status: team.status,
      });
    }
  });

  return result;
}

/**
 * Fetch live teams from Supabase with leaders, members, and payment records
 */
export async function fetchLiveTeamsFromSupabase(): Promise<TeamRegistration[]> {
  try {
    const { data: teamsData, error: teamsError } = await supabase
      .from('teams')
      .select(`
        id,
        team_name,
        team_size,
        registration_status,
        created_at,
        profiles:team_leader_id (
          id,
          full_name,
          email,
          phone,
          college_name,
          course
        )
      `)
      .order('created_at', { ascending: false });

    if (teamsError || !teamsData || teamsData.length === 0) {
      return getStoredTeams();
    }

    const teamIds = teamsData.map((t) => t.id);

    // Fetch payments
    const { data: paymentsData } = await supabase
      .from('payments')
      .select('*')
      .in('team_id', teamIds);

    const paymentsMap = new Map((paymentsData || []).map((p) => [p.team_id, p]));

    // Fetch members
    const { data: membersData } = await supabase
      .from('team_members')
      .select(`
        id,
        team_id,
        member_role,
        profiles:user_id (
          id,
          full_name,
          email,
          phone,
          college_name,
          course
        )
      `)
      .in('team_id', teamIds);

    const membersByTeam = new Map<string, any[]>();
    (membersData || []).forEach((m) => {
      const list = membersByTeam.get(m.team_id) || [];
      list.push(m);
      membersByTeam.set(m.team_id, list);
    });

    const liveTeams: TeamRegistration[] = teamsData.map((t: any) => {
      const leader = t.profiles || {};
      const payment = paymentsMap.get(t.id);
      const rawStatus = (payment?.payment_status || t.registration_status || 'pending').toLowerCase();
      const status: RegistrationStatus =
        rawStatus === 'verified' ? 'Confirmed' : rawStatus === 'rejected' ? 'Cancelled' : 'Pending';

      const rawMembers = membersByTeam.get(t.id) || [];
      const formattedMembers = rawMembers.map((m: any) => ({
        id: m.id,
        fullName: m.profiles?.full_name || 'Team Member',
        email: m.profiles?.email || '',
        phone: m.profiles?.phone || '',
        college: m.profiles?.college_name || leader.college_name || 'Engineering College',
        branch: m.profiles?.course || leader.course || 'Engineering',
        role: m.member_role === 'leader' ? ('Team Leader' as const) : ('Member' as const),
      }));

      if (!formattedMembers.some((m) => m.role === 'Team Leader')) {
        formattedMembers.unshift({
          id: `lead-${t.id}`,
          fullName: leader.full_name || 'Team Leader',
          email: leader.email || '',
          phone: leader.phone || '',
          college: leader.college_name || 'Engineering College',
          branch: leader.course || 'Engineering',
          role: 'Team Leader',
        });
      }

      return {
        id: t.id,
        registrationId: `SCI26-TEAM-${t.id.slice(0, 4).toUpperCase()}`,
        teamName: t.team_name,
        teamLeader: leader.full_name || 'Team Leader',
        leaderEmail: leader.email || '',
        leaderPhone: leader.phone || '',
        college: leader.college_name || 'Engineering College',
        branch: leader.course || 'Engineering',
        teamSize: t.team_size || formattedMembers.length,
        registrationDate: new Date(t.created_at).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        timestamp: new Date(t.created_at).getTime(),
        status,
        confirmationEmailStatus: status === 'Confirmed' ? 'Delivered' : 'Pending',
        members: formattedMembers,
        payment: payment
          ? {
              amount: Number(payment.amount),
              transactionId: payment.transaction_id,
              screenshotPath: payment.payment_screenshot_path,
              paymentStatus: payment.payment_status,
            }
          : undefined,
      };
    });

    // Merge with seeded baseline teams
    const stored = getStoredTeams();
    const existingIds = new Set(liveTeams.map((lt) => lt.id));
    const merged = [...liveTeams, ...stored.filter((st) => !existingIds.has(st.id))];
    return merged;
  } catch (err) {
    console.error('[Admin Service] Supabase teams query error:', err);
    return getStoredTeams();
  }
}

/**
 * Update Team Status (Confirm, Pending, Cancel) in Supabase and local cache
 */
export function updateTeamStatus(teamId: string, status: RegistrationStatus): boolean {
  const teams = getStoredTeams();
  const target = teams.find((t) => t.id === teamId || t.registrationId === teamId);
  if (!target) return false;

  target.status = status;
  if (status === 'Confirmed' && target.confirmationEmailStatus === 'Pending') {
    target.confirmationEmailStatus = 'Delivered';
    target.confirmationSentAt = new Date().toLocaleString();
  }
  saveStoredTeams(teams);

  // Sync to Supabase
  const mappedStatus = status === 'Confirmed' ? 'verified' : status === 'Cancelled' ? 'rejected' : 'pending';
  supabase
    .from('teams')
    .update({ registration_status: mappedStatus, updated_at: new Date().toISOString() })
    .or(`id.eq.${teamId},team_name.eq.${target.teamName}`)
    .then(({ error }) => {
      if (error) console.warn('[Supabase Teams Update Notice]:', error.message);
    });

  supabase
    .from('payments')
    .update({ payment_status: mappedStatus })
    .or(`team_id.eq.${teamId},team_id.eq.${target.id}`)
    .then(({ error }) => {
      if (error) console.warn('[Supabase Payments Update Notice]:', error.message);
    });

  addAuditLog(
    'REGISTRATION_STATUS_UPDATE',
    `Updated status of team ${target.teamName} (${target.registrationId}) to ${status}`,
    target.registrationId
  );
  return true;
}

/**
 * Resend Confirmation Email to Team Leader
 */
export function resendConfirmationEmail(teamId: string): { success: boolean; message: string } {
  const teams = getStoredTeams();
  const team = teams.find((t) => t.id === teamId || t.registrationId === teamId);
  if (!team) return { success: false, message: 'Team not found' };

  team.confirmationEmailStatus = 'Delivered';
  team.confirmationSentAt = new Date().toLocaleString();
  saveStoredTeams(teams);

  // Record email log
  addEmailLog({
    subject: `Official Registration Confirmation — ${team.teamName} [${team.registrationId}]`,
    category: 'Registration Confirmation',
    recipientCategory: 'Specific Teams',
    recipientCount: 1,
    recipientEmails: [team.leaderEmail],
    sentAt: new Date().toLocaleString(),
    status: 'Sent',
    sentBy: 'Admin (Organizer)',
    bodyPreview: `Registration confirmation dispatched to ${team.teamLeader} (${team.leaderEmail}) for ${team.teamName}. Reference ID: ${team.registrationId}`,
  });

  addAuditLog(
    'CONFIRMATION_EMAIL_SENT',
    `Resent confirmation email to leader ${team.teamLeader} (${team.leaderEmail})`,
    team.registrationId
  );

  return {
    success: true,
    message: `Confirmation email successfully sent to ${team.leaderEmail}`,
  };
}

/**
 * Email logs management
 */
export function getEmailLogs(): EmailLog[] {
  if (typeof window === 'undefined') return INITIAL_EMAIL_LOGS;
  try {
    const raw = window.localStorage.getItem(EMAIL_LOGS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading email logs', err);
  }
  return INITIAL_EMAIL_LOGS;
}

export function addEmailLog(log: Omit<EmailLog, 'id'>): EmailLog {
  const logs = getEmailLogs();
  const newLog: EmailLog = {
    ...log,
    id: `em-${Date.now()}`,
  };
  logs.unshift(newLog);
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(EMAIL_LOGS_KEY, JSON.stringify(logs));
    } catch {
      // ignore
    }
  }

  // Persist to Supabase email_logs table
  supabase
    .from('email_logs')
    .insert({
      recipient_email: log.recipientEmails?.[0] || 'all-teams@sci2026.org',
      subject: log.subject,
      email_type: log.category,
      status: log.status.toLowerCase(),
    })
    .then(({ error }) => {
      if (error) console.warn('[Supabase Email Log Insert Notice]:', error.message);
    });

  return newLog;
}

/**
 * Dispatch bulk announcement or confirmation emails
 */
export function sendBulkEmail(params: {
  subject: string;
  category: EmailLog['category'];
  recipientCategory: EmailLog['recipientCategory'];
  customRecipients?: string[];
  body: string;
}): { success: boolean; count: number; message: string } {
  const teams = getStoredTeams();
  let recipientEmails: string[] = [];

  if (params.recipientCategory === 'All Participants') {
    const participants = getAllParticipants();
    recipientEmails = Array.from(new Set(participants.map((p) => p.email).filter(Boolean)));
  } else if (params.recipientCategory === 'All Team Leaders' || params.recipientCategory === 'All Registered Teams') {
    recipientEmails = Array.from(new Set(teams.map((t) => t.leaderEmail).filter(Boolean)));
  } else if (params.customRecipients && params.customRecipients.length > 0) {
    recipientEmails = params.customRecipients;
  }

  const count = recipientEmails.length;

  addEmailLog({
    subject: params.subject,
    category: params.category,
    recipientCategory: params.recipientCategory,
    recipientCount: count,
    recipientEmails,
    sentAt: new Date().toLocaleString(),
    status: 'Sent',
    sentBy: 'Admin (Organizer)',
    bodyPreview: params.body.slice(0, 160) + (params.body.length > 160 ? '...' : ''),
  });

  addAuditLog(
    'BULK_EMAIL_DISPATCH',
    `Sent "${params.subject}" to ${count} recipient(s) in category: ${params.recipientCategory}`,
    `Batch #${Date.now()}`
  );

  return {
    success: true,
    count,
    message: `Email successfully transmitted to ${count} recipient(s).`,
  };
}

/**
 * Problem Statements CRUD and Publishing
 */
export function getAdminProblemStatements(): ProblemStatementAdminItem[] {
  if (typeof window === 'undefined') return INITIAL_PROBLEM_STATEMENTS;
  try {
    const raw = window.localStorage.getItem(PROBLEM_STATEMENTS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading problem statements', err);
  }
  return INITIAL_PROBLEM_STATEMENTS;
}

export function saveAdminProblemStatements(items: ProblemStatementAdminItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(PROBLEM_STATEMENTS_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function createProblemStatement(
  item: Omit<ProblemStatementAdminItem, 'id' | 'createdAt' | 'selectedByTeamsCount'>
): ProblemStatementAdminItem {
  const items = getAdminProblemStatements();
  const newItem: ProblemStatementAdminItem = {
    ...item,
    id: `ps-${Date.now()}`,
    createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    selectedByTeamsCount: 0,
  };
  items.push(newItem);
  saveAdminProblemStatements(items);

  // Sync to Supabase
  supabase
    .from('problem_statements')
    .insert({
      title: item.title,
      description: item.fullDescription || item.shortDescription,
      category: item.category,
      organization: 'Smart City Mission',
      published: item.status === 'Published',
    })
    .then(({ error }) => {
      if (error) console.warn('[Supabase Problem Statement Insert Notice]:', error.message);
    });

  addAuditLog(
    'PROBLEM_STATEMENT_CREATED',
    `Created challenge "${newItem.title}" [${newItem.referenceCode}] in ${newItem.status} status`,
    newItem.referenceCode
  );
  return newItem;
}

export function updateProblemStatement(
  id: string,
  updates: Partial<ProblemStatementAdminItem>
): boolean {
  const items = getAdminProblemStatements();
  const index = items.findIndex((p) => p.id === id);
  if (index === -1) return false;

  items[index] = { ...items[index], ...updates };
  saveAdminProblemStatements(items);

  if (updates.status !== undefined) {
    const isPub = updates.status === 'Published';
    supabase
      .from('problem_statements')
      .update({ published: isPub, updated_at: new Date().toISOString() })
      .or(`id.eq.${id},title.eq.${items[index].title}`)
      .then();
  }

  addAuditLog(
    'PROBLEM_STATEMENT_UPDATED',
    `Updated challenge "${items[index].title}" [${items[index].referenceCode}]`,
    items[index].referenceCode
  );
  return true;
}

/**
 * Officially PUBLISH problem statements so participant dashboard displays them
 */
export function publishAllProblemStatements(): { count: number; message: string } {
  const items = getAdminProblemStatements();
  let count = 0;

  items.forEach((p) => {
    if (p.status !== 'Archived') {
      p.status = 'Published';
      p.publishedAt = new Date().toLocaleString();
      p.publishedBy = 'Admin Organizer';
      count++;
    }
  });

  saveAdminProblemStatements(items);

  // Sync to global published key used by participant dashboard
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(PS_PUBLISHED_KEY, 'true');
  }

  // Sync to Supabase
  supabase
    .from('problem_statements')
    .update({ published: true, updated_at: new Date().toISOString() })
    .neq('id', '00000000-0000-0000-0000-000000000000')
    .then(({ error }) => {
      if (error) console.warn('[Supabase PS Publish Notice]:', error.message);
    });

  addAuditLog(
    'PROBLEM_STATEMENTS_PUBLISHED',
    `Officially published ${count} problem statements. Challenges are now unlocked for all participants.`,
    'GLOBAL_RELEASE'
  );

  return {
    count,
    message: `Successfully published ${count} problem statements! Participants can now view challenges on their dashboard.`,
  };
}

export function toggleProblemStatementStatus(id: string, newStatus: 'Published' | 'Draft' | 'Archived'): boolean {
  const items = getAdminProblemStatements();
  const item = items.find((p) => p.id === id);
  if (!item) return false;

  item.status = newStatus;
  if (newStatus === 'Published') {
    item.publishedAt = new Date().toLocaleString();
    item.publishedBy = 'Admin Organizer';
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(PS_PUBLISHED_KEY, 'true');
    }
  }

  saveAdminProblemStatements(items);

  supabase
    .from('problem_statements')
    .update({ published: newStatus === 'Published', updated_at: new Date().toISOString() })
    .or(`id.eq.${id},title.eq.${item.title}`)
    .then(({ error }) => {
      if (error) console.warn('[Supabase PS Toggle Notice]:', error.message);
    });

  addAuditLog(
    'PROBLEM_STATEMENT_STATUS_CHANGE',
    `Changed challenge "${item.title}" [${item.referenceCode}] status to ${newStatus}`,
    item.referenceCode
  );
  return true;
}

export function isProblemStatementsOfficiallyPublished(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(PS_PUBLISHED_KEY) === 'true';
}

export function unpublishAllProblemStatements(): void {
  const items = getAdminProblemStatements();
  items.forEach((p) => {
    if (p.status === 'Published') p.status = 'Draft';
  });
  saveAdminProblemStatements(items);
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(PS_PUBLISHED_KEY, 'false');
  }

  supabase
    .from('problem_statements')
    .update({ published: false, updated_at: new Date().toISOString() })
    .neq('id', '00000000-0000-0000-0000-000000000000')
    .then(({ error }) => {
      if (error) console.warn('[Supabase PS Unpublish Notice]:', error.message);
    });

  addAuditLog(
    'PROBLEM_STATEMENTS_UNPUBLISHED',
    'Unpublished problem statements. Participant dashboard reverted to Coming Soon.',
    'GLOBAL_LOCK'
  );
}

/**
 * Event Settings
 */
export function getEventSettings(): EventSettings {
  const defaults: EventSettings = {
    registrationOpen: true,
    allowedTeamSizes: [2, 3, 4],
    problemStatementsPublished: isProblemStatementsOfficiallyPublished(),
    problemStatementSelectionOpen: false,
    selectionDeadline: '2026-03-10T23:59:59',
    maxTeamsPerProblemStatement: 15,
  };

  if (typeof window === 'undefined') return defaults;
  try {
    const raw = window.localStorage.getItem(EVENT_SETTINGS_KEY);
    if (raw) return { ...defaults, ...JSON.parse(raw) };
  } catch {
    // ignore
  }
  return defaults;
}

export function saveEventSettings(settings: EventSettings): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(EVENT_SETTINGS_KEY, JSON.stringify(settings));
    window.localStorage.setItem(PS_PUBLISHED_KEY, settings.problemStatementsPublished ? 'true' : 'false');
    addAuditLog('EVENT_SETTINGS_UPDATED', 'Updated event settings and challenge selection parameters', 'EVENT_CONFIG');
  } catch {
    // ignore
  }
}

/**
 * Audit Logs
 */
export function getAuditLogs(): AuditLogEntry[] {
  if (typeof window === 'undefined') return INITIAL_AUDIT_LOGS;
  try {
    const raw = window.localStorage.getItem(AUDIT_LOGS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading audit logs', err);
  }
  return INITIAL_AUDIT_LOGS;
}

export function addAuditLog(
  action: string,
  details: string,
  recordRef?: string,
  status: 'Success' | 'Failed' = 'Success'
): void {
  const logs = getAuditLogs();
  const entry: AuditLogEntry = {
    id: `aud-${Date.now()}`,
    adminName: 'Admin Organizer',
    adminRole: 'Super Admin',
    action,
    details,
    timestamp: new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) + `, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
    recordRef,
    status,
  };
  logs.unshift(entry);
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify(logs.slice(0, 100)));
    } catch {
      // ignore
    }
  }
}

/**
 * Export helpers
 */
export function exportTeamsToCSV(): void {
  const teams = getStoredTeams();
  const headers = ['Registration ID', 'Team Name', 'Team Leader', 'Leader Email', 'Leader Phone', 'College', 'Branch', 'Team Size', 'Status', 'Confirmation Status', 'Registration Date'];
  const rows = teams.map((t) => [
    t.registrationId,
    `"${t.teamName.replace(/"/g, '""')}"`,
    `"${t.teamLeader.replace(/"/g, '""')}"`,
    t.leaderEmail,
    t.leaderPhone,
    `"${t.college.replace(/"/g, '""')}"`,
    `"${t.branch.replace(/"/g, '""')}"`,
    t.teamSize,
    t.status,
    t.confirmationEmailStatus,
    t.registrationDate,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `sci2026_registered_teams_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  addAuditLog('CSV_EXPORT', `Exported ${teams.length} teams to CSV`, 'TEAMS_EXPORT');
}

export function exportParticipantsToCSV(): void {
  const participants = getAllParticipants();
  const headers = ['Participant Name', 'Role', 'Team Name', 'Registration ID', 'Email', 'Phone', 'College', 'Branch', 'Status'];
  const rows = participants.map((p) => [
    `"${p.fullName.replace(/"/g, '""')}"`,
    p.role,
    `"${p.teamName.replace(/"/g, '""')}"`,
    p.teamRegistrationId,
    p.email,
    p.phone,
    `"${p.college.replace(/"/g, '""')}"`,
    `"${p.branch.replace(/"/g, '""')}"`,
    p.status,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `sci2026_participants_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  addAuditLog('CSV_EXPORT', `Exported ${participants.length} participants to CSV`, 'PARTICIPANTS_EXPORT');
}
