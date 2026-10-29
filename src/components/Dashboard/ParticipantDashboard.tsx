import React, { useState, useEffect } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar } from './DashboardSidebar';
import { WelcomeBanner } from './cards/WelcomeBanner';
import { TeamOverviewCard } from './cards/TeamOverviewCard';
import { TeamMembersCard } from './cards/TeamMembersCard';
import { ProblemStatementComingSoonCard } from './cards/ProblemStatementComingSoonCard';
import { AnnouncementsCard } from './cards/AnnouncementsCard';
import { EditTeamDetailsCard } from './cards/EditTeamDetailsCard';
import { NeedHelpCard } from './cards/NeedHelpCard';
import { ProblemStatementsView } from './views/ProblemStatementsView';
import { TeamDetailsView } from './views/TeamDetailsView';
import { AnnouncementsView } from './views/AnnouncementsView';
import { ProfileSecurityView } from './views/ProfileSecurityView';
import { ChangePasswordModal } from './modals/ChangePasswordModal';
import { ModalTabType } from '../Modals/HackathonModal';
import { DashboardViewType, TeamProfile, Announcement } from './types';
import {
  getTeamProfile,
  fetchLiveTeamProfile,
  fetchLiveAnnouncements,
  updateTeamProfile,
  getAnnouncements,
} from './dashboardService';
import { logoutTeam } from '../Auth/authService';

interface ParticipantDashboardProps {
  onNavigateHome: () => void;
  onNavigateLogin: () => void;
  onOpenModal: (tab: ModalTabType) => void;
}

export const ParticipantDashboard: React.FC<ParticipantDashboardProps> = ({
  onNavigateHome,
  onNavigateLogin,
  onOpenModal,
}) => {
  const [activeView, setActiveView] = useState<DashboardViewType>('dashboard');
  const [teamProfile, setTeamProfile] = useState<TeamProfile>(() => getTeamProfile());
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => getAnnouncements());
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Sync profile data on mount and reset scroll
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTeamProfile(getTeamProfile());
    setAnnouncements(getAnnouncements());

    // Asynchronously fetch live data from Supabase
    fetchLiveTeamProfile().then((live) => {
      if (live) setTeamProfile(live);
    });
    fetchLiveAnnouncements().then((liveAnn) => {
      if (liveAnn && liveAnn.length > 0) setAnnouncements(liveAnn);
    });
  }, [activeView]);

  const handleLogout = () => {
    logoutTeam();
    onNavigateLogin();
  };

  const handleSaveTeamDetails = async (updates: Partial<TeamProfile>) => {
    const res = await updateTeamProfile(updates);
    if (res.success && res.profile) {
      setTeamProfile(res.profile);
    }
    return res;
  };

  const handleEditDetailsClick = () => {
    // Scroll smoothly to Edit Team Details card or switch view
    const editCard = document.getElementById('edit-team-details-section');
    if (editCard) {
      editCard.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveView('team-details');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#070A0F] text-white flex flex-col overflow-x-hidden">
      {/* 1. Background Overlay: Translucent so 3D City Environment remains subtly visible */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none bg-gradient-to-br from-[#070A0F]/95 via-[#070A0F]/85 to-[#070A0F]/90 z-0"
      />
      <div
        aria-hidden="true"
        className="fixed -top-40 -right-40 w-[600px] h-[600px] bg-[#C6FF35]/[0.025] rounded-full blur-[140px] pointer-events-none z-0"
      />

      {/* 2. Top Navigation Bar */}
      <DashboardHeader
        teamProfile={teamProfile}
        unreadCount={announcements.filter((a) => a.unread).length}
        onOpenModal={onOpenModal}
        onNavigateHome={onNavigateHome}
        onNavigateView={(view) => setActiveView(view)}
        onLogout={handleLogout}
      />

      {/* 3. Main Dashboard Frame: Sidebar + Dynamic Main Area */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row">
        {/* Left Sidebar */}
        <DashboardSidebar
          activeView={activeView}
          unreadAnnouncements={announcements.filter((a) => a.unread).length}
          onSelectView={(view) => {
            setActiveView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onLogout={handleLogout}
        />

        {/* Right Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-[1700px] w-full min-w-0">
          {activeView === 'dashboard' && (
            <div className="space-y-6 sm:space-y-7 animate-in fade-in duration-200">
              {/* Welcome Section */}
              <WelcomeBanner teamProfile={teamProfile} />

              {/* Row 1: Team Overview Card (Left) + Team Members Card (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7">
                <div className="lg:col-span-7">
                  <TeamOverviewCard
                    teamProfile={teamProfile}
                    onEditClick={handleEditDetailsClick}
                  />
                </div>
                <div className="lg:col-span-5">
                  <TeamMembersCard
                    members={teamProfile.members}
                    onManageClick={() => setActiveView('team-details')}
                  />
                </div>
              </div>

              {/* Row 2: Problem Statement Selection (COMING SOON) + Announcements */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7">
                <div className="lg:col-span-7">
                  <ProblemStatementComingSoonCard
                    onViewGuidelines={() => onOpenModal('overview')}
                    onExploreMore={() => setActiveView('problem-statements')}
                  />
                </div>
                <div className="lg:col-span-5">
                  <AnnouncementsCard
                    announcements={announcements}
                    onViewAllClick={() => setActiveView('announcements')}
                    onSelectAnnouncement={() => setActiveView('announcements')}
                  />
                </div>
              </div>

              {/* Row 3: Edit Team Details Card + Need Help? Card */}
              <div
                id="edit-team-details-section"
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7"
              >
                <div className="lg:col-span-8">
                  <EditTeamDetailsCard
                    teamProfile={teamProfile}
                    onSave={handleSaveTeamDetails}
                    onChangePasswordClick={() => setIsPasswordModalOpen(true)}
                  />
                </div>
                <div className="lg:col-span-4">
                  <NeedHelpCard
                    onViewFaq={() => onOpenModal('faq')}
                    onContactUs={() => onOpenModal('contact')}
                  />
                </div>
              </div>
            </div>
          )}

          {/* DEDICATED VIEW: PROBLEM STATEMENTS (COMING SOON) */}
          {activeView === 'problem-statements' && (
            <ProblemStatementsView
              onBackToDashboard={() => setActiveView('dashboard')}
              onNavigateToAnnouncements={() => setActiveView('announcements')}
            />
          )}

          {/* DEDICATED VIEW: TEAM DETAILS */}
          {activeView === 'team-details' && (
            <TeamDetailsView
              teamProfile={teamProfile}
              onBackToDashboard={() => setActiveView('dashboard')}
              onEditDetails={handleEditDetailsClick}
            />
          )}

          {/* DEDICATED VIEW: ANNOUNCEMENTS */}
          {activeView === 'announcements' && (
            <AnnouncementsView
              announcements={announcements}
              onBackToDashboard={() => setActiveView('dashboard')}
            />
          )}

          {/* DEDICATED VIEW: PROFILE & SECURITY */}
          {activeView === 'profile-security' && (
            <ProfileSecurityView
              teamProfile={teamProfile}
              onBackToDashboard={() => setActiveView('dashboard')}
              onChangePasswordClick={() => setIsPasswordModalOpen(true)}
              onLogout={handleLogout}
            />
          )}
        </main>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
};
