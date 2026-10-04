import React from 'react';
import { CheckCircle2, ChevronRight, HardDriveDownload, ShieldCheck, RotateCcw, Video, Clock, FileText } from 'lucide-react';
import { useForensicStore } from '../../services/ForensicContext';

export const CaseProgressPipeline: React.FC = () => {
  const { setActiveTab, language } = useForensicStore();

  const steps = [
    {
      id: 'acquisition',
      label: language === 'hi' ? 'अधिग्रहण' : 'Acquisition',
      sub: language === 'hi' ? 'बहु-विक्रेता' : 'Multi-Vendor',
      icon: HardDriveDownload,
      status: 'completed',
    },
    {
      id: 'acquisition',
      label: language === 'hi' ? 'सत्यापन' : 'Verification',
      sub: language === 'hi' ? 'SHA-256 बिटस्ट्रीम' : 'SHA-256 Bitstream',
      icon: ShieldCheck,
      status: 'completed',
    },
    {
      id: 'recovery',
      label: language === 'hi' ? 'पुनर्प्राप्ति' : 'Recovery',
      sub: language === 'hi' ? 'पार्टीशन कार्विंग' : 'Carve Partitions',
      icon: RotateCcw,
      status: 'completed',
    },
    {
      id: 'analysis',
      label: language === 'hi' ? 'विश्लेषण' : 'Analysis',
      sub: language === 'hi' ? 'फ़्रेम एवं गति' : 'Frame & Motion',
      icon: Video,
      status: 'in-progress',
    },
    {
      id: 'timeline',
      label: language === 'hi' ? 'पुनर्निर्माण' : 'Reconstruction',
      sub: language === 'hi' ? 'एकीकृत टाइमलाइन' : 'Unified Timeline',
      icon: Clock,
      status: 'in-progress',
    },
    {
      id: 'reports',
      label: language === 'hi' ? 'रिपोर्ट' : 'Report',
      sub: language === 'hi' ? 'न्यायिक पैकेज' : 'Judicial Package',
      icon: FileText,
      status: 'pending',
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            {language === 'hi' ? 'केस फोरेंसिक प्रगति पाइपलाइन' : 'Case Forensic Progress Pipeline'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'hi'
              ? 'मानकीकृत एंड-टू-एंड साक्ष्य जीवन चक्र (ISO/IEC 27037 दिशानिर्देशानुसार)'
              : 'Standardized end-to-end evidence lifecycle adhering to ISO/IEC 27037 guidelines'}
          </p>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded font-semibold self-start sm:self-auto">
          {language === 'hi' ? 'चरण 4 / 6: विश्लेषण प्रगति पर है' : 'Phase 4 of 6: Analysis in Progress'}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 sm:gap-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = step.status === 'completed';
          const isInProgress = step.status === 'in-progress';

          return (
            <button
              key={index}
              onClick={() => setActiveTab(step.id)}
              className={`p-3 rounded-lg border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-50/50 border-emerald-200 hover:bg-emerald-50'
                  : isInProgress
                  ? 'bg-blue-50/60 border-blue-300 ring-2 ring-blue-500/20 hover:bg-blue-50'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-7 h-7 rounded-md flex items-center justify-center ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isInProgress
                      ? 'bg-blue-600 text-white animate-pulse'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                {isInProgress && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-1 rounded">
                    {language === 'hi' ? 'सक्रिय' : 'Active'}
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">{step.label}</p>
                <p className="text-[10px] text-slate-500 truncate mt-0.5">{step.sub}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-400">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
