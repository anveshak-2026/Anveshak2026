import React from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  HardDriveDownload,
  RotateCcw,
  Clock,
  Video,
  AlertTriangle,
  Link2,
  FileText,
  ScrollText,
  Settings,
  HelpCircle,
  X,
  Radio,
  Globe,
  LogOut,
} from 'lucide-react';
import { useForensicStore } from '../../services/ForensicContext';

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const {
    activeTab,
    setActiveTab,
    currentCase,
    conflicts,
    gaps,
    evidenceSources,
    currentUser,
    logout,
    language,
    setLanguage,
    t,
  } = useForensicStore();

  const navItems = [
    {
      id: 'dashboard',
      label: t.navDashboard,
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'cases',
      label: t.navCases,
      icon: FolderKanban,
      badge: null,
    },
    {
      id: 'acquisition',
      label: t.navEvidence,
      icon: HardDriveDownload,
      badge: evidenceSources.length,
    },
    {
      id: 'recovery',
      label: t.navRecovery,
      icon: RotateCcw,
      badge: language === 'hi' ? '29 अंश' : '29 Rec.',
    },
    {
      id: 'timeline',
      label: t.navTimeline,
      icon: Clock,
      badge: null,
    },
    {
      id: 'analysis',
      label: t.navAnalysis,
      icon: Video,
      badge: null,
    },
    {
      id: 'conflicts',
      label: t.navConflicts,
      icon: AlertTriangle,
      badge: conflicts.length + gaps.length,
      badgeColor: 'amber',
    },
    {
      id: 'chain-of-custody',
      label: t.navChainOfCustody,
      icon: Link2,
      badge: language === 'hi' ? 'सील' : 'Secured',
      badgeColor: 'emerald',
    },
    {
      id: 'reports',
      label: t.navReports,
      icon: FileText,
      badge: null,
    },
    {
      id: 'activity',
      label: t.navActivity,
      icon: ScrollText,
      badge: null,
    },
    {
      id: 'settings',
      label: t.navSettings,
      icon: Settings,
      badge: null,
    },
    {
      id: 'help',
      label: t.navHelp,
      icon: HelpCircle,
      badge: null,
    },
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    onCloseMobile();
  };

  const getLocalizedRole = (role: string) => {
    if (language !== 'hi') return role;
    switch (role) {
      case 'Investigator':
        return 'जांच अधिकारी';
      case 'Forensic Analyst':
        return 'फोरेंसिक विश्लेषक';
      case 'Reviewer':
        return 'समीक्षक / न्यायिक';
      case 'Administrator':
        return 'सिस्टम प्रशासक';
      default:
        return role;
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300 border-r border-slate-800">
      {/* Brand & Subtitle */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-teal-400 font-mono text-base font-bold tracking-wider">
              ANVESHAK
            </span>
            <span className="text-[9px] font-mono bg-teal-950 text-teal-300 border border-teal-800 px-1.5 py-0.5 rounded font-bold">
              SIH26150
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            {language === 'hi' ? 'मल्टी-वेंडर DVR/NVR फोरेंसिक्स' : 'Multi-Vendor DVR/NVR Forensics'}
          </p>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="md:hidden text-slate-400 hover:text-white p-1 rounded-md"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Active Case Card in Sidebar */}
      <div className="px-3 pt-3 pb-2 border-b border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center justify-between text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
          <span>{t.activeCase}</span>
          <span className="inline-flex items-center text-teal-400 gap-1 font-sans">
            <Radio className="w-2.5 h-2.5 animate-pulse" /> {language === 'hi' ? 'सक्रिय' : 'Live'}
          </span>
        </div>
        <p className="text-xs font-mono font-semibold text-white mt-1 truncate">
          {currentCase.id}
        </p>
        <p className="text-[11px] text-slate-400 truncate">{currentCase.name}</p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                isActive
                  ? 'bg-teal-600 text-white shadow-xs font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-white' : 'text-slate-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge !== null && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded shrink-0 ${
                    item.badgeColor === 'amber'
                      ? 'bg-amber-900/60 text-amber-300 border border-amber-700/60'
                      : item.badgeColor === 'emerald'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section: Language Selector, User Profile & Logout */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/70 space-y-2.5 text-xs">
        {/* Language selector toggle */}
        <div className="flex items-center justify-between bg-slate-900 px-2.5 py-1.5 rounded border border-slate-800">
          <span className="flex items-center gap-1.5 text-slate-400 text-[11px]">
            <Globe className="w-3.5 h-3.5 text-teal-400" />
            <span>{t.selectLanguage}</span>
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 text-[10px] font-bold rounded cursor-pointer ${
                language === 'en' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
            <span className="text-slate-600 text-[10px]">/</span>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-1.5 py-0.5 text-[10px] font-bold rounded cursor-pointer ${
                language === 'hi' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>

        {/* User Profile Mini */}
        <div className="flex items-center justify-between pt-1">
          <div
            onClick={() => handleSelectTab('settings')}
            className="flex items-center gap-2 truncate cursor-pointer hover:opacity-80"
          >
            <div className="w-6 h-6 rounded-full bg-teal-900 text-teal-200 flex items-center justify-center font-bold text-[10px] shrink-0">
              {currentUser.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="truncate">
              <p className="text-[11px] font-bold text-slate-200 truncate">{currentUser.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{getLocalizedRole(currentUser.role)}</p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            title={t.logout}
            className="text-slate-400 hover:text-rose-400 p-1.5 rounded hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-900">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
