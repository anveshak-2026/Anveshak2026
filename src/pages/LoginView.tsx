import React, { useState } from 'react';
import { ShieldCheck, Lock, User, ArrowRight, Sparkles, Building, Globe, CheckCircle2, UserPlus, LogIn } from 'lucide-react';
import { useForensicStore } from '../services/ForensicContext';
import { UserRole } from '../types/forensics';

export const LoginView: React.FC = () => {
  const { login, signUp, signUpSuccessMessage, clearSignUpMessage, language, setLanguage, t } = useForensicStore();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Login form state
  const [investigatorId, setInvestigatorId] = useState('INV-IND-8419');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  // Signup form state
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [organization, setOrganization] = useState('State Cyber Forensic Division (Surveillance Unit)');
  const [signupRole, setSignupRole] = useState<UserRole>('Investigator');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupError, setSignupError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(investigatorId);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    if (signupPassword !== confirmPassword) {
      setSignupError(language === 'hi' ? 'पासवर्ड मेल नहीं खा रहे हैं।' : 'Passwords do not match.');
      return;
    }

    if (!fullName.trim() || !signupEmail.trim()) {
      setSignupError(language === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें।' : 'Please fill all required fields.');
      return;
    }

    const success = signUp({
      name: fullName,
      email: signupEmail,
      organization,
      role: signupRole,
    });

    if (success) {
      setAuthMode('login');
      setInvestigatorId(signupEmail);
    }
  };

  const handleContinueDemo = () => {
    login('INV-IND-8419');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background forensic grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Language Switcher in top right of login screen */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700 text-xs text-slate-300">
        <Globe className="w-3.5 h-3.5 text-teal-400" />
        <button
          onClick={() => setLanguage('en')}
          className={`px-2 py-0.5 rounded-full transition-colors ${
            language === 'en' ? 'bg-teal-600 text-white font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          English
        </button>
        <span className="text-slate-600">|</span>
        <button
          onClick={() => setLanguage('hi')}
          className={`px-2 py-0.5 rounded-full transition-colors ${
            language === 'hi' ? 'bg-teal-600 text-white font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          हिंदी
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        {/* Emblem */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 text-teal-400 font-mono text-2xl font-bold mb-3 shadow-lg">
          AN
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
          ANVESHAK
        </h1>
        <p className="text-xs uppercase tracking-widest text-teal-400 font-mono font-semibold mt-1">
          {language === 'hi'
            ? 'डिजिटल निगरानी साक्ष्य फोरेंसिक एवं पुनर्निर्माण'
            : 'Digital Surveillance Evidence Forensics'}
        </p>
        <p className="text-xs text-slate-400 mt-1 italic font-serif">
          {language === 'hi'
            ? '“संरक्षित करें. पुनर्प्राप्त करें. पुनर्निर्माण करें. प्रमाणित करें.”'
            : '“Preserve. Recover. Reconstruct. Prove.”'}
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-white py-8 px-6 shadow-xl rounded-xl sm:px-10 border border-slate-200">
          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-slate-200 mb-5">
            <button
              onClick={() => {
                setAuthMode('login');
                clearSignUpMessage();
              }}
              className={`flex-1 pb-3 text-xs font-bold text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                authMode === 'login'
                  ? 'border-teal-600 text-teal-800'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t.login}</span>
            </button>
            <button
              onClick={() => {
                setAuthMode('signup');
                clearSignUpMessage();
              }}
              className={`flex-1 pb-3 text-xs font-bold text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                authMode === 'signup'
                  ? 'border-teal-600 text-teal-800'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{t.signUp}</span>
            </button>
          </div>

          {/* Success message banner after registration */}
          {signUpSuccessMessage && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 rounded-lg flex items-center gap-2 text-xs text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{signUpSuccessMessage}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {authMode === 'login' && (
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  {language === 'hi' ? 'जांचकर्ता आईडी / ईमेल' : 'Investigator ID / Email'}
                </label>
                <div className="mt-1 relative rounded-md shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={investigatorId}
                    onChange={(e) => setInvestigatorId(e.target.value)}
                    placeholder="e.g. INV-IND-8419 or officer@cyberforensics.gov.in"
                    className="block w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md text-xs text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  {language === 'hi' ? 'पासवर्ड / डिजिटल टोकन' : 'Password / Digital Token'}
                </label>
                <div className="mt-1 relative rounded-md shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md text-xs text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-slate-600">
                    {language === 'hi' ? 'सत्र याद रखें' : 'Remember session'}
                  </span>
                </label>
                <span className="text-[11px] text-teal-700 hover:underline cursor-pointer">
                  {language === 'hi' ? 'स्मार्टकार्ड / PKI टोकन' : 'SmartCard / PKI Token'}
                </span>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-md shadow-xs text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-teal-500 cursor-pointer"
              >
                <span>{language === 'hi' ? 'लॉग इन करें एवं कार्यक्षेत्र में जाएं' : 'Login to Forensic Workspace'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleContinueDemo}
                className="w-full py-2.5 px-4 bg-teal-50 border border-teal-200 text-teal-900 hover:bg-teal-100 text-xs font-bold rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>{language === 'hi' ? 'डेमो मोड में जारी रखें' : 'Continue in Demo Mode'}</span>
              </button>
            </form>
          )}

          {/* SIGN UP FORM */}
          {authMode === 'signup' && (
            <form className="space-y-3" onSubmit={handleSignupSubmit}>
              {signupError && (
                <div className="p-2 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded">
                  {signupError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase">
                  {language === 'hi' ? 'पूरा नाम' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Insp. Rajesh Sharma"
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase">
                  {language === 'hi' ? 'ईमेल / जांचकर्ता आईडी' : 'Email / Investigator ID'}
                </label>
                <input
                  type="text"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="investigator@cyberforensics.gov.in"
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase">
                  {language === 'hi' ? 'संगठन / विभाग' : 'Organization / Division'}
                </label>
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase">
                  {language === 'hi' ? 'भूमिका / पद' : 'Role / Designation'}
                </label>
                <select
                  value={signupRole}
                  onChange={(e) => setSignupRole(e.target.value as UserRole)}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden bg-white"
                >
                  <option value="Investigator">{language === 'hi' ? 'जांच अधिकारी' : 'Investigator'}</option>
                  <option value="Forensic Analyst">{language === 'hi' ? 'फोरेंसिक विश्लेषक' : 'Forensic Analyst'}</option>
                  <option value="Reviewer">{language === 'hi' ? 'समीक्षक / न्यायिक' : 'Reviewer / Judicial'}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase">
                    {language === 'hi' ? 'पासवर्ड' : 'Password'}
                  </label>
                  <input
                    type="password"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase">
                    {language === 'hi' ? 'पुष्टि करें' : 'Confirm'}
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-bold transition-colors cursor-pointer"
              >
                {language === 'hi' ? 'खाता बनाएं' : 'Create Investigator Account'}
              </button>
            </form>
          )}

          <div className="mt-5 pt-3 border-t border-slate-100 text-center">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">
              {language === 'hi'
                ? 'प्रोटोटाइप / प्रदर्शन वातावरण (SIH26150)'
                : 'Prototype / Demonstration Environment'}
            </span>
            <p className="text-[10px] text-slate-500 mt-1">
              Smart India Hackathon 2026 · Problem Statement SIH26150
            </p>
          </div>
        </div>

        {/* Bottom Trust Guarantee */}
        <div className="mt-4 text-center text-slate-400 text-xs flex items-center justify-center gap-1.5 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
          <span>ISO/IEC 27037 Standardized Digital Evidence Framework</span>
        </div>
      </div>
    </div>
  );
};
