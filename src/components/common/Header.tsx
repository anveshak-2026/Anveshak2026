import React, { useState } from 'react';
import {
  FolderOpen,
  ChevronDown,
  RefreshCw,
  Bell,
  LogOut,
  Menu,
  Globe,
  Compass,
  Settings,
} from 'lucide-react';
import { useForensicStore } from '../../services/ForensicContext';
import { UserRole } from '../../types/forensics';

interface HeaderProps {
  onToggleMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileSidebar }) => {
  const {
    currentCase,
    cases,
    setCurrentCaseById,
    currentUser,
    setUserRole,
    logout,
    resetToDemoCase,
    setActiveTab,
    language,
    setLanguage,
    setIsTourOpen,
    setTourStep,
    t,
  } = useForensicStore();

  const [caseDropdownOpen, setCaseDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const roles: UserRole[] = ['Investigator', 'Forensic Analyst', 'Reviewer', 'Administrator'];

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

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16">
        {/* Zone 1: Mobile toggle + Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            onClick={() => setActiveTab('dashboard')}
            className="cursor-pointer flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-md bg-slate-900 text-teal-400 flex items-center justify-center font-bold tracking-wider text-sm shadow-xs border border-slate-800">
              AN
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 leading-none block">
                ANVESHAK
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-teal-700 hidden sm:block">
                {language === 'hi' ? 'डिजिटल निगरानी साक्ष्य फोरेंसिक' : 'Digital Surveillance Evidence Forensics'}
              </span>
            </div>
          </div>
        </div>

        {/* Zone 2: Contextual Case Switcher */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setCaseDropdownOpen(!caseDropdownOpen)}
              className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md border border-slate-200 transition-colors cursor-pointer"
            >
              <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-mono font-semibold text-slate-900">{currentCase.id}</span>
              <span className="text-slate-400">|</span>
              <span className="max-w-[200px] truncate">{currentCase.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {caseDropdownOpen && (
              <div
                className="absolute left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-slate-200 py-1.5 z-50"
                onClick={() => setCaseDropdownOpen(false)}
              >
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {language === 'hi' ? 'सक्रिय फोरेंसिक केस चुनें' : 'Select Active Forensic Case'}
                </div>
                {cases.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setCurrentCaseById(c.id);
                      setCaseDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex flex-col hover:bg-slate-50 cursor-pointer ${
                      c.id === currentCase.id ? 'bg-teal-50/70 border-l-2 border-teal-600' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono font-semibold text-slate-900">
                      <span>{c.id}</span>
                      <span className="text-[10px] text-slate-500 font-sans font-normal">
                        {c.dateCreated}
                      </span>
                    </div>
                    <span className="text-slate-600 truncate mt-0.5">{c.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Zone 3: Language Selector, Guided Tour, Demo Mode, Notifications, User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md border border-slate-200 text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-1" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 text-[11px] rounded transition-colors cursor-pointer ${
                language === 'en' ? 'bg-white font-bold text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <span className="text-slate-400 text-[10px]">/</span>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-1.5 py-0.5 text-[11px] rounded transition-colors cursor-pointer ${
                language === 'hi' ? 'bg-teal-600 font-bold text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* Guided Tour Trigger Button */}
          <button
            onClick={() => {
              setTourStep(1);
              setIsTourOpen(true);
            }}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-md transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-teal-600" />
            <span>{t.guidedTourBtn}</span>
          </button>

          {/* Reset Demo Button */}
          <button
            onClick={resetToDemoCase}
            title={language === 'hi' ? 'डेमो केस ANV-2026-0042 पर रीसेट करें' : 'Reset to SIH Demo Case ANV-2026-0042'}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-md transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden md:inline">{t.resetDemo}</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-900">
                    {language === 'hi' ? 'फोरेंसिक अलर्ट' : 'Forensic Alerts'}
                  </span>
                  <span className="text-[10px] text-teal-700 font-medium">
                    {language === 'hi' ? '2 आवश्यक' : '2 Urgent'}
                  </span>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="p-3 hover:bg-slate-50">
                    <p className="font-semibold text-amber-800">
                      {language === 'hi' ? 'टाइमलाइन विरोधाभास पहचाना गया' : 'Timeline Conflict Detected'}
                    </p>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      {language === 'hi'
                        ? 'CAM 01 बनाम CAM 02 में +137 सेकंड का अंतर पाया गया।'
                        : 'CAM 01 vs CAM 02 clock offset of +137s detected.'}
                    </p>
                  </div>
                  <div className="p-3 hover:bg-slate-50">
                    <p className="font-semibold text-rose-800">
                      {language === 'hi' ? 'साक्ष्य अंतराल (17 मिनट)' : 'Footage Gap Identified'}
                    </p>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      {language === 'hi'
                        ? 'CAM 02 पर 17 मिनट का अंतराल मिला, जांचकर्ता सत्यापन आवश्यक है।'
                        : '17-minute gap on CAM 02 requires operator verification.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Role Selector */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-1.5 rounded-md hover:bg-slate-100 text-slate-700 border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-slate-900 text-slate-100 flex items-center justify-center text-xs font-semibold">
                VR
              </div>
              <div className="text-left hidden xl:block">
                <div className="text-xs font-semibold text-slate-900 leading-tight">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {getLocalizedRole(currentUser.role)}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
            </button>

            {userMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50"
                onClick={() => setUserMenuOpen(false)}
              >
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500 font-mono">{currentUser.badgeNumber}</p>
                  <p className="text-[11px] text-slate-600 truncate mt-0.5">
                    {currentUser.organization}
                  </p>
                </div>

                <div className="px-4 py-2">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                    {language === 'hi' ? 'सक्रिय फोरेंसिक भूमिका' : 'Active Forensic Role'}
                  </label>
                  <div className="space-y-1">
                    {roles.map((r) => (
                      <button
                        key={r}
                        onClick={(e) => {
                          e.stopPropagation();
                          setUserRole(r);
                        }}
                        className={`w-full text-left px-2 py-1 text-xs rounded transition-colors flex items-center justify-between cursor-pointer ${
                          currentUser.role === r
                            ? 'bg-slate-900 text-white font-medium'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{getLocalizedRole(r)}</span>
                        {currentUser.role === r && (
                          <span className="text-[10px] text-teal-400">
                            {language === 'hi' ? 'सक्रिय' : 'Active'}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-1 mt-1">
                  <button
                    onClick={() => setActiveTab('settings')}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-500" />
                    <span>{t.navSettings}</span>
                  </button>
                  <button
                    onClick={() => logout()}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t.logout}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
