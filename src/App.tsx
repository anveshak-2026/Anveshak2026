/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ForensicProvider, useForensicStore } from './services/ForensicContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { GuidedTourModal } from './components/common/GuidedTourModal';
import { FeatureExplainerModal } from './components/common/FeatureExplainerModal';
import { LoginView } from './pages/LoginView';
import { DashboardView } from './pages/DashboardView';
import { CaseManagementView } from './pages/CaseManagementView';
import { AcquisitionView } from './pages/AcquisitionView';
import { RecoveryView } from './pages/RecoveryView';
import { TimelineView } from './pages/TimelineView';
import { AnalysisView } from './pages/AnalysisView';
import { ConflictsAndGapsView } from './pages/ConflictsAndGapsView';
import { ChainOfCustodyView } from './pages/ChainOfCustodyView';
import { ReportsView } from './pages/ReportsView';
import { ActivityLogView } from './pages/ActivityLogView';
import { SettingsView } from './pages/SettingsView';
import { HelpView } from './pages/HelpView';

const MainLayout: React.FC = () => {
  const { isAuthenticated, activeTab, language, t } = useForensicStore();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <LoginView />;
  }

  const renderCurrentView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'cases':
        return <CaseManagementView />;
      case 'acquisition':
        return <AcquisitionView />;
      case 'recovery':
        return <RecoveryView />;
      case 'timeline':
        return <TimelineView />;
      case 'analysis':
        return <AnalysisView />;
      case 'conflicts':
        return <ConflictsAndGapsView />;
      case 'chain-of-custody':
        return <ChainOfCustodyView />;
      case 'reports':
        return <ReportsView />;
      case 'activity':
        return <ActivityLogView />;
      case 'settings':
        return <SettingsView />;
      case 'help':
        return <HelpView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900 font-sans selection:bg-teal-500 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {renderCurrentView()}
        </main>

        {/* Global Forensic Platform Footer */}
        <footer className="border-t border-slate-200 bg-white py-6 px-4 sm:px-8 mt-12 text-center text-xs text-slate-500 no-print">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-slate-900">ANVESHAK</span>
              <span>·</span>
              <span className="text-[11px] text-teal-800 font-medium">
                SIH26150 Multi-Vendor DVR/NVR Forensic Analysis
              </span>
            </div>

            <p className="italic text-slate-600 text-[11px]">
              {language === 'hi'
                ? '“असंगठित निगरानी डेटा से संरचित, ट्रैक करने योग्य फोरेंसिक साक्ष्य तक।”'
                : '“From fragmented surveillance data to structured, traceable forensic evidence.”'}
            </p>

            <p className="font-mono font-bold text-slate-800 text-[11px]">
              {language === 'hi'
                ? '“संरक्षित करें. पुनर्प्राप्त करें. पुनर्निर्माण करें. प्रमाणित करें.”'
                : '“Preserve. Recover. Reconstruct. Prove.”'}
            </p>
          </div>
        </footer>
      </div>

      {/* Global Modals for Tour and Explanations */}
      <GuidedTourModal />
      <FeatureExplainerModal />
    </div>
  );
};

export default function App() {
  return (
    <ForensicProvider>
      <MainLayout />
    </ForensicProvider>
  );
}
