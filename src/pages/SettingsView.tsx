import React from 'react';
import {
  Settings,
  Lock,
  FileCheck,
  CheckCircle2,
  XCircle,
  Activity,
} from 'lucide-react';
import { useForensicStore } from '../services/ForensicContext';
import { UserRole } from '../types/forensics';

export const SettingsView: React.FC = () => {
  const { currentUser, setUserRole, language, t } = useForensicStore();

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

  const roles: {
    role: UserRole;
    description: string;
    permissions: {
      ingestEvidence: boolean;
      runCarveScan: boolean;
      editNotes: boolean;
      calibrateClock: boolean;
      sealFinalReport: boolean;
      userAdmin: boolean;
    };
  }[] = [
    {
      role: 'Investigator',
      description:
        language === 'hi'
          ? 'भौतिक साक्ष्य जब्ती, समसामयिक अवलोकनों और अदालत में प्रस्तुति के लिए जिम्मेदार मुख्य केस संचालक।'
          : 'Lead case handler responsible for physical evidence intake, contemporaneous observations, and court submission.',
      permissions: {
        ingestEvidence: true,
        runCarveScan: true,
        editNotes: true,
        calibrateClock: true,
        sealFinalReport: true,
        userAdmin: false,
      },
    },
    {
      role: 'Forensic Analyst',
      description:
        language === 'hi'
          ? 'डीप सेक्टर कार्विंग, बिटस्ट्रीम सत्यापन और कंटेनर अनपैकिंग निष्पादित करने वाले तकनीकी प्रयोगशाला विशेषज्ञ।'
          : 'Technical laboratory specialist executing deep sector carving, bitstream verification, and container unpacking.',
      permissions: {
        ingestEvidence: true,
        runCarveScan: true,
        editNotes: true,
        calibrateClock: true,
        sealFinalReport: false,
        userAdmin: false,
      },
    },
    {
      role: 'Reviewer',
      description:
        language === 'hi'
          ? 'अभिरक्षा श्रृंखला सील और रिपोर्ट तटस्थता को मान्य करने वाले स्वतंत्र न्यायिक या पर्यवेक्षी समीक्षक।'
          : 'Independent judicial or supervisory reviewer validating chain-of-custody seals and report neutrality.',
      permissions: {
        ingestEvidence: false,
        runCarveScan: false,
        editNotes: false,
        calibrateClock: false,
        sealFinalReport: false,
        userAdmin: false,
      },
    },
    {
      role: 'Administrator',
      description:
        language === 'hi'
          ? 'हार्डवेयर राइट-ब्लॉकर ब्रिज, क्रिप्टोग्राफिक कुंजियों और उपयोगकर्ता पहुंच विशेषाधिकारों का प्रबंधन करने वाले सिस्टम कस्टोडियन।'
          : 'System custodian managing hardware write-blocker bridges, cryptographic keys, and user access privileges.',
      permissions: {
        ingestEvidence: true,
        runCarveScan: true,
        editNotes: true,
        calibrateClock: true,
        sealFinalReport: true,
        userAdmin: true,
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-teal-700" />
            <h2 className="text-base font-bold uppercase tracking-wider text-slate-900">
              {t.settingsTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t.settingsSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-2.5 py-1 bg-slate-900 text-teal-300 rounded">
            {language === 'hi' ? 'सक्रिय भूमिका:' : 'Active Role:'} {getLocalizedRole(currentUser.role)}
          </span>
        </div>
      </div>

      {/* Role Switcher Grid */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            {t.switchActiveRoleTitle}
          </h3>
          <p className="text-xs text-slate-500">
            {t.switchActiveRoleSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {roles.map((r) => {
            const isSelected = currentUser.role === r.role;
            return (
              <button
                key={r.role}
                onClick={() => setUserRole(r.role)}
                className={`p-4 rounded-lg border text-left transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-slate-900">{getLocalizedRole(r.role)}</span>
                    {isSelected && (
                      <span className="text-[10px] font-mono font-bold bg-teal-600 text-white px-1.5 py-0.5 rounded">
                        {language === 'hi' ? 'सक्रिय' : 'Active'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{r.description}</p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-200/80 text-[11px] font-mono text-teal-800 font-semibold">
                  {isSelected
                    ? (language === 'hi' ? '✓ अनुमतियां लागू हैं' : '✓ Permissions Applied')
                    : (language === 'hi' ? 'बदलने के लिए क्लिक करें' : 'Click to Switch')}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Role Permissions Matrix */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            {t.rolePermissionsTitle}
          </h3>
          <span className="text-[11px] font-mono text-slate-500">
            {t.rolePermissionsSubtitle}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">{t.colRole}</th>
                <th className="py-2.5 px-3">{t.colIngest}</th>
                <th className="py-2.5 px-3">{t.colCarve}</th>
                <th className="py-2.5 px-3">{t.colNotes}</th>
                <th className="py-2.5 px-3">{t.colCalibrate}</th>
                <th className="py-2.5 px-3">{t.colSealReport}</th>
                <th className="py-2.5 px-3">{t.colAdmin}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {roles.map((r) => (
                <tr
                  key={r.role}
                  className={`hover:bg-slate-50 ${
                    currentUser.role === r.role ? 'bg-teal-50/40 font-semibold' : ''
                  }`}
                >
                  <td className="py-2.5 px-3 font-sans font-bold text-slate-900">{getLocalizedRole(r.role)}</td>
                  <td className="py-2.5 px-3">
                    {r.permissions.ingestEvidence ? (
                      <span className="text-emerald-700 flex items-center gap-1 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {t.permissionGranted}
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1 font-sans">
                        <XCircle className="w-3.5 h-3.5" /> {t.permissionRestricted}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    {r.permissions.runCarveScan ? (
                      <span className="text-emerald-700 flex items-center gap-1 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {t.permissionGranted}
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1 font-sans">
                        <XCircle className="w-3.5 h-3.5" /> {t.permissionRestricted}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    {r.permissions.editNotes ? (
                      <span className="text-emerald-700 flex items-center gap-1 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {t.permissionGranted}
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1 font-sans">
                        <XCircle className="w-3.5 h-3.5" /> {t.permissionRestricted}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    {r.permissions.calibrateClock ? (
                      <span className="text-emerald-700 flex items-center gap-1 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {t.permissionGranted}
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1 font-sans">
                        <XCircle className="w-3.5 h-3.5" /> {t.permissionRestricted}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    {r.permissions.sealFinalReport ? (
                      <span className="text-emerald-700 flex items-center gap-1 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {t.permissionGranted}
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1 font-sans">
                        <XCircle className="w-3.5 h-3.5" /> {t.permissionRestricted}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    {r.permissions.userAdmin ? (
                      <span className="text-emerald-700 flex items-center gap-1 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {t.permissionGranted}
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1 font-sans">
                        <XCircle className="w-3.5 h-3.5" /> {t.permissionRestricted}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-1.5 text-xs">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <Lock className="w-4 h-4 text-teal-700" />
            <span>{t.secArchPkiTitle}</span>
          </div>
          <p className="text-slate-600 leading-snug">
            {t.secArchPkiDesc}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-1.5 text-xs">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <FileCheck className="w-4 h-4 text-teal-700" />
            <span>{t.secArchHashTitle}</span>
          </div>
          <p className="text-slate-600 leading-snug">
            {t.secArchHashDesc}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-1.5 text-xs">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <Activity className="w-4 h-4 text-teal-700" />
            <span>{t.secArchAuditTitle}</span>
          </div>
          <p className="text-slate-600 leading-snug">
            {t.secArchAuditDesc}
          </p>
        </div>
      </div>
    </div>
  );
};
