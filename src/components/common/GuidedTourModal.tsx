import React from 'react';
import {
  FolderKanban,
  HardDriveDownload,
  ShieldCheck,
  RotateCcw,
  Clock,
  AlertTriangle,
  FileText,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { useForensicStore } from '../../services/ForensicContext';

export const GuidedTourModal: React.FC = () => {
  const { isTourOpen, setIsTourOpen, tourStep, setTourStep, setActiveTab, t, language } = useForensicStore();

  if (!isTourOpen) return null;

  const tourSteps = [
    {
      step: 1,
      title: language === 'hi' ? 'चरण 1: केस बनाएं या खोलें' : 'Step 1: Create or Open a Case',
      sub: language === 'hi' ? 'सभी निगरानी साक्ष्यों को व्यवस्थित करने के लिए केस बनाएं।' : 'Create a case to organize all surveillance evidence.',
      icon: FolderKanban,
      tab: 'cases',
      description:
        language === 'hi'
          ? 'ANVESHAK में प्रत्येक जांच को एक अद्वितीय केस आईडी (जैसे ANV-2026-0042) के साथ अलग वर्कस्पेस में रखा जाता है ताकि विभिन्न जांचों का डेटा आपस में न मिले।'
          : 'In ANVESHAK, every investigation is isolated in its own workspace with a unique Case ID (e.g. ANV-2026-0042) ensuring strict multi-case forensic boundaries.',
      actionLabel: language === 'hi' ? 'केस प्रबंधन पर जाएं' : 'Open Case Management',
    },
    {
      step: 2,
      title: language === 'hi' ? 'चरण 2: साक्ष्य अधिग्रहण' : 'Step 2: Acquire Evidence',
      sub: language === 'hi' ? 'DVR/NVR या निगरानी फ़ाइलों से साक्ष्य आयात करें।' : 'Import exported DVR/NVR evidence or surveillance files.',
      icon: HardDriveDownload,
      tab: 'acquisition',
      description:
        language === 'hi'
          ? 'Hikvision, Dahua, CP Plus, Axis आदि से फुटेज को वर्किंग कॉपी में आयात किया जाता है। मूल साक्ष्य पर कभी कोई बदलाव नहीं किया जाता।'
          : 'Ingests multi-vendor footage (Hikvision, Dahua, CP Plus, Axis, generic). Original evidence remains write-blocked while an isolated working copy is generated.',
      actionLabel: language === 'hi' ? 'साक्ष्य अधिग्रहण पर जाएं' : 'Go to Evidence Acquisition',
    },
    {
      step: 3,
      title: language === 'hi' ? 'चरण 3: अखंडता सत्यापन' : 'Step 3: Verify Integrity',
      sub: language === 'hi' ? 'SHA-256 हैश बनाएं और सत्यापित करें।' : 'Generate and verify cryptographic SHA-256 hashes.',
      icon: ShieldCheck,
      tab: 'acquisition',
      description:
        language === 'hi'
          ? 'क्रिप्टोग्राफिक हैशिंग से यह प्रमाणित होता है कि जब्त किए जाने के बाद से साक्ष्य का एक भी बाइट नहीं बदला है।'
          : 'Bit-stream hashing checks whether the working evidence matches original acquisition data byte-for-byte, verifying post-seizure authenticity.',
      actionLabel: language === 'hi' ? 'हैश सत्यापन देखें' : 'View Hash Verification',
    },
    {
      step: 4,
      title: language === 'hi' ? 'चरण 4: साक्ष्य पुनर्प्राप्ति' : 'Step 4: Recover Evidence',
      sub: language === 'hi' ? 'प्रोटोटाइप रिकवरी से खंडित साक्ष्य की पहचान करें।' : 'Identify recoverable or fragmented evidence using the recovery workflow.',
      icon: RotateCcw,
      tab: 'recovery',
      description:
        language === 'hi'
          ? 'DVR के अनएलोकेटेड सेक्टरों से हटाए गए या अधूरे वीडियो फ्रेम (NAL स्ट्रीम्स) को पुनर्प्राप्त करने की प्रक्रिया को दर्शाता है।'
          : 'Demonstrates deep sector carving of unallocated DVR partitions to reconstruct fragmented H.264/H.265 byte streams before overwrite.',
      actionLabel: language === 'hi' ? 'पुनर्प्राप्ति केंद्र पर जाएं' : 'Go to Recovery Center',
    },
    {
      step: 5,
      title: language === 'hi' ? 'चरण 5: टाइमलाइन पुनर्निर्माण' : 'Step 5: Reconstruct Timeline',
      sub: language === 'hi' ? 'एकाधिक कैमरों की घटनाओं को एक सामान्य टाइमलाइन में जोड़ें।' : 'Combine events from multiple cameras into one synchronized timeline.',
      icon: Clock,
      tab: 'timeline',
      description:
        language === 'hi'
          ? 'CAM 01 से CAM 05 तक सभी कैमरों की घटनाओं को एक साथ समय पर सिंक करता है और हार्डवेयर घड़ी के बहाव (+137s) को ठीक करता है।'
          : 'Integrates feeds from CAM 01 through CAM 05 into a single horizontal chronological scrubber, compensating for hardware clock drift (+137s on CAM 02).',
      actionLabel: language === 'hi' ? 'टाइमलाइन पर जाएं' : 'Open Unified Timeline',
    },
    {
      step: 6,
      title: language === 'hi' ? 'चरण 6: विरोधाभास एवं अंतराल' : 'Step 6: Review Conflicts & Gaps',
      sub: language === 'hi' ? 'समय के अंतर और गायब फुटेज को पहचानें।' : 'Identify timestamp conflicts and missing surveillance intervals.',
      icon: AlertTriangle,
      tab: 'conflicts',
      description:
        language === 'hi'
          ? 'घड़ी के बेमेल समय को तटस्थ रूप से उजागर करता है और गायब फुटेज को बिना पूर्वाग्रह (जैसे बिजली गुल, डिस्क फॉल्ट) के श्रेणीबद्ध करता है।'
          : 'Surfaces timestamp inconsistencies without biased conclusions, and categorizes missing surveillance intervals (power loss, export cut) objectively.',
      actionLabel: language === 'hi' ? 'विरोधाभास समीक्षा पर जाएं' : 'Review Conflicts & Gaps',
    },
    {
      step: 7,
      title: language === 'hi' ? 'चरण 7: फोरेंसिक रिपोर्ट' : 'Step 7: Generate Report',
      sub: language === 'hi' ? 'अदालत में मान्य 12-चरणीय संरचित रिपोर्ट बनाएं।' : 'Create a structured forensic report with evidence and chain of custody.',
      icon: FileText,
      tab: 'reports',
      description:
        language === 'hi'
          ? 'ISO/IEC 27037 मानकों के अनुरूप साक्ष्य स्रोत, अखंडता हैश, टाइमलाइन, टिप्पणियां और कस्टडी श्रृंखला युक्त न्यायिक रिपोर्ट तैयार करता है।'
          : 'Compiles the full 12-section evidentiary judicial package complete with cryptographic hashes, contemporaneous notes, and audit trails.',
      actionLabel: language === 'hi' ? 'रिपोर्ट केंद्र पर जाएं' : 'Open Forensic Reports',
    },
  ];

  const current = tourSteps[tourStep - 1] || tourSteps[0];
  const Icon = current.icon;

  const handleNext = () => {
    if (tourStep < tourSteps.length) {
      setTourStep(tourStep + 1);
    } else {
      setIsTourOpen(false);
    }
  };

  const handlePrev = () => {
    if (tourStep > 1) {
      setTourStep(tourStep - 1);
    }
  };

  const handleNavigateToFeature = () => {
    setActiveTab(current.tab);
    setIsTourOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity"
          onClick={() => setIsTourOpen(false)}
        />

        <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-xl border border-slate-200">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-teal-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                AN
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">
                  {language === 'hi' ? 'ANVESHAK में आपका स्वागत है' : 'Welcome to ANVESHAK'}
                </h3>
                <p className="text-[11px] text-teal-300 font-mono">
                  {language === 'hi' ? 'जांचकर्ता त्वरित मार्गदर्शन टूर' : 'Investigator Guided Workflow Tour'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsTourOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-md"
              aria-label="Close Tour"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Dots */}
          <div className="px-6 pt-4 pb-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
              {language === 'hi' ? `चरण ${tourStep} / ${tourSteps.length}` : `Step ${tourStep} of ${tourSteps.length}`}
            </span>
            <div className="flex items-center gap-1.5">
              {tourSteps.map((s) => (
                <button
                  key={s.step}
                  onClick={() => setTourStep(s.step)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    s.step === tourStep
                      ? 'w-6 bg-teal-600'
                      : s.step < tourStep
                      ? 'bg-slate-400'
                      : 'bg-slate-200'
                  }`}
                  aria-label={`Jump to step ${s.step}`}
                />
              ))}
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shrink-0 shadow-xs">
                <Icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 leading-snug">{current.title}</h4>
                <p className="text-xs font-semibold text-teal-800">{current.sub}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200 font-medium">
              {current.description}
            </p>

            {/* Quick jump to feature */}
            <div className="pt-2">
              <button
                onClick={handleNavigateToFeature}
                className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors border border-slate-300"
              >
                <span>{current.actionLabel}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between px-6 py-3.5 bg-slate-50 border-t border-slate-200">
            <button
              onClick={() => setIsTourOpen(false)}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 px-2 py-1"
            >
              {language === 'hi' ? 'टूर छोड़ें' : 'Skip Tour'}
            </button>

            <div className="flex items-center gap-2">
              {tourStep > 1 && (
                <button
                  onClick={handlePrev}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 bg-white border border-slate-300 rounded-md flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'पिछला' : 'Previous'}</span>
                </button>
              )}

              <button
                onClick={handleNext}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md flex items-center gap-1 shadow-xs"
              >
                <span>
                  {tourStep === tourSteps.length
                    ? language === 'hi'
                      ? 'टूर समाप्त करें'
                      : 'Finish Tour'
                    : language === 'hi'
                    ? 'अगला चरण'
                    : 'Next Step'}
                </span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
