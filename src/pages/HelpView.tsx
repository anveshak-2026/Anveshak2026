import React from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HardDriveDownload,
  RotateCcw,
  Clock,
  AlertTriangle,
  FileText,
  Lock,
  Compass,
} from 'lucide-react';
import { useForensicStore } from '../services/ForensicContext';

export const HelpView: React.FC = () => {
  const { setIsTourOpen, setTourStep, setActiveTab, language, t } = useForensicStore();

  const workflowStages = [
    {
      title: language === 'hi' ? '1. साक्ष्य अधिग्रहण' : '1. Acquire Evidence',
      desc:
        language === 'hi'
          ? 'विभिन्न DVR/NVR से साक्ष्य आयात किया जाता है और मूल स्रोत को राइट-ब्लॉक किया जाता है।'
          : 'Import footage from multiple DVR/NVR vendors while isolating original media in a write-blocked state.',
      icon: HardDriveDownload,
      tab: 'acquisition',
    },
    {
      title: language === 'hi' ? '2. कार्य प्रतिलिपि संरक्षण' : '2. Preserve Working Copy',
      desc:
        language === 'hi'
          ? 'मूल साक्ष्य को अपरिवर्तित रखकर केवल बिट-स्ट्रीम कार्य प्रतिलिपि पर कार्य किया जाता है।'
          : 'Original physical media is preserved unmodified. Analysis executes strictly on an isolated working copy.',
      icon: Lock,
      tab: 'acquisition',
    },
    {
      title: language === 'hi' ? '3. अखंडता सत्यापन (SHA-256)' : '3. Verify Integrity (SHA-256)',
      desc:
        language === 'hi'
          ? 'क्रिप्टोग्राफिक हैश से यह प्रमाणित होता है कि साक्ष्य में कोई भी बदलाव नहीं हुआ है।'
          : 'Cryptographic SHA-256 hashing verifies that no bytes have been modified post-seizure.',
      icon: ShieldCheck,
      tab: 'acquisition',
    },
    {
      title: language === 'hi' ? '4. खंडित वीडियो पुनर्प्राप्ति' : '4. Recover Fragmented Video',
      desc:
        language === 'hi'
          ? 'DVR के अनएलोकेटेड सेक्टरों से हटाए गए या अधूरे वीडियो फ्रेम को निकाला जाता है।'
          : 'Parses unallocated sectors to reconstruct fragmented H.264/H.265 stream blocks prior to circular overwrite.',
      icon: RotateCcw,
      tab: 'recovery',
    },
    {
      title: language === 'hi' ? '5. साक्ष्य विश्लेषण एवं सहसंबंध' : '5. Analyze & Correlate',
      desc:
        language === 'hi'
          ? 'तटस्थ भाषा (जैसे व्यक्ति जैसी आकृति) में फ्रेम-दर-फ्रेम निरीक्षण और टिप्पणियां दर्ज की जाती हैं।'
          : 'Frame inspection using neutral forensic terminology with contemporaneous investigator notation.',
      icon: Clock,
      tab: 'analysis',
    },
    {
      title: language === 'hi' ? '6. एकीकृत समयरेखा पुनर्निर्माण' : '6. Reconstruct Unified Timeline',
      desc:
        language === 'hi'
          ? 'विभिन्न कैमरों की घटनाओं को एक सामान्य समय-रेखा पर सिंक कर घड़ी के बहाव को सुधारा जाता है।'
          : 'Synchronizes multiple camera feeds into a single timeline and reconciles clock offsets without bias.',
      icon: AlertTriangle,
      tab: 'timeline',
    },
    {
      title: language === 'hi' ? '7. न्यायिक रिपोर्ट निर्माण' : '7. Generate Judicial Report',
      desc:
        language === 'hi'
          ? 'अदालत में पेश करने योग्य 12-चरणीय व्यापक फोरेंसिक साक्ष्य डॉसियर तैयार किया जाता है।'
          : 'Compiles complete 12-section evidentiary report adhering to ISO/IEC 27037 disclosure guidelines.',
      icon: FileText,
      tab: 'reports',
    },
  ];

  const whatItDoes = [
    language === 'hi'
      ? 'विभिन्न DVR/NVR वेंडरों (Hikvision, Dahua, CP Plus, Axis) के साक्ष्य का मानकीकरण करता है।'
      : 'Standardizes evidence workflow across diverse DVR/NVR vendors.',
    language === 'hi'
      ? 'मूल साक्ष्य की सुरक्षा के लिए राइट-ब्लॉक्ड वर्किंग कॉपी मॉडल लागू करता है।'
      : 'Enforces write-blocked working copy isolation to protect original physical evidence.',
    language === 'hi'
      ? 'SHA-256 क्रिप्टोग्राफिक हैशिंग से साक्ष्य की पूर्ण अखंडता प्रमाणित करता है।'
      : 'Verifies evidence integrity using cryptographic SHA-256 bit-stream hashing.',
    language === 'hi'
      ? 'अनएलोकेटेड सेक्टरों से खंडित NAL वीडियो स्ट्रीम्स की पुनर्प्राप्ति को व्यवस्थित करता है।'
      : 'Organizes recovered and carved stream fragments from unallocated sectors.',
    language === 'hi'
      ? 'सभी कैमरों के लिए एक एकीकृत, सिंक की गई समयरेखा का पुनर्निर्माण करता है।'
      : 'Reconstructs a single synchronized surveillance timeline across multiple cameras.',
    language === 'hi'
      ? 'हार्डवेयर घड़ी के अंतर (जैसे +137 सेकंड) और टाइमस्टैम्प विरोधाभास का पता लगाता है।'
      : 'Detects potential timestamp conflicts and hardware clock drift.',
    language === 'hi'
      ? 'गायब या अनुपलब्ध निगरानी अंतरालों को वस्तुनिष्ठ तकनीकी कारणों से रेखांकित करता है।'
      : 'Highlights missing footage intervals with objective technical classifications.',
    language === 'hi'
      ? 'अदालत के लिए अपरिवर्तनीय डिजिटल अभिरक्षा श्रृंखला बनाए रखता है।'
      : 'Maintains tamper-evident chain of custody for court admissibility.',
    language === 'hi'
      ? '12-चरणीय संरचित एवं निष्पक्ष न्यायिक फोरेंसिक रिपोर्ट तैयार करता है।'
      : 'Generates structured 12-section judicial forensic reports with export capability.',
  ];

  const whatItDoesNot = [
    language === 'hi'
      ? 'मूल साक्ष्य फ़ाइलों या ड्राइव में कभी कोई बदलाव नहीं करता।'
      : 'Does NOT modify original evidence under any circumstances.',
    language === 'hi'
      ? 'गायब या नष्ट हुए फुटेज के स्थान पर मनगढ़ंत वीडियो फ्रेम नहीं बनाता।'
      : 'Does NOT fabricate missing footage or synthesize artificial frames.',
    language === 'hi'
      ? 'चेहरे की धुंधली छवियों से किसी व्यक्ति की स्वचालित संदिग्ध के रूप में पहचान नहीं करता।'
      : 'Does NOT automatically identify suspects or run automated facial convictions.',
    language === 'hi'
      ? 'गायब फुटेज को स्वतः जानबूझकर की गई छेड़छाड़ घोषित नहीं करता।'
      : 'Does NOT declare deliberate tampering from missing surveillance intervals.',
    language === 'hi'
      ? 'दो बेमेल घड़ियों में से बिना जांच के यह तय नहीं करता कि कौन सा समय सच है।'
      : 'Does NOT automatically decide which conflicting device clock is correct.',
    language === 'hi'
      ? 'मानव फोरेंसिक जांचकर्ता के विवेक और फैसले का स्थान नहीं लेता।'
      : 'Does NOT replace human forensic investigators or legal judgment.',
    language === 'hi'
      ? 'प्रोटोटाइप सिमुलेशन को आधिकारिक सरकारी फोरेंसिक लैब प्रमाणीकरण का दावा नहीं करता।'
      : 'Does NOT claim official forensic laboratory certification in this prototype environment.',
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-teal-400 font-mono text-xs font-bold tracking-widest uppercase">
              SIH26150 Self-Explaining Guide
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            {t.helpTitle}
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            {t.helpSubtitle}
          </p>
        </div>

        <button
          onClick={() => {
            setTourStep(1);
            setIsTourOpen(true);
          }}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-xs self-start md:self-auto shrink-0"
        >
          <Compass className="w-4 h-4" />
          <span>{t.guidedTourBtn}</span>
        </button>
      </div>

      {/* WHAT IS ANVESHAK? Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-teal-700" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            {t.helpWhatIsTitle}
          </h2>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
          {t.helpWhatIsDesc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">
              {language === 'hi' ? 'समस्या कथन' : 'Problem Statement'}
            </span>
            <p className="text-slate-600 leading-snug font-sans text-[11px]">
              SIH26150: Development of a Multi-Vendor DVR/NVR Forensic Analysis Tool for Standardized Acquisition, Recovery, and Analysis of Surveillance Evidence.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">
              {language === 'hi' ? 'मुख्य लक्ष्य' : 'Core Objective'}
            </span>
            <p className="text-slate-600 leading-snug font-sans text-[11px]">
              {language === 'hi'
                ? 'निगरानी फुटेज की अखंडता बनाए रखना, स्वामित्व वाले DVR फॉर्मेट को सामान्य करना, और अदालत के लिए 12-चरणीय न्यायिक रिपोर्ट तैयार करना।'
                : 'Preserve surveillance integrity, normalize proprietary formats, synchronize drifting clocks, and deliver 12-section court reports.'}
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">
              {language === 'hi' ? 'मानक अनुपालन' : 'Standards Compliance'}
            </span>
            <p className="text-slate-600 leading-snug font-sans text-[11px]">
              ISO/IEC 27037 (Digital Evidence Handling), Indian Evidence Act / BSA electronic evidence guidelines, and judicial neutrality principles.
            </p>
          </div>
        </div>
      </div>

      {/* Complete Workflow Steps: 7 Stages */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            {t.helpWorkflowHeader}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'hi'
              ? 'जांचकर्ता के लिए शुरू से अंत तक का संरचित 7-चरणीय फोरेंसिक कार्यप्रवाह:'
              : 'The end-to-end evidence lifecycle from physical seizure to judicial disclosure:'}
          </p>
        </div>

        <div className="space-y-3">
          {workflowStages.map((stg, i) => {
            const Icon = stg.icon;
            return (
              <div
                key={i}
                className="p-4 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-teal-400 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{stg.title}</h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed font-sans">{stg.desc}</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab(stg.tab)}
                  className="px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded border border-teal-200 flex items-center gap-1 shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  <span>{language === 'hi' ? 'मॉड्यूल खोलें' : 'Open Module'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Side-by-Side: What ANVESHAK Does vs What It Does NOT Do */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WHAT IT DOES */}
        <div className="bg-white rounded-lg border border-emerald-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-emerald-100">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-950">
              {t.helpWhatDoesTitle}
            </h3>
          </div>

          <ul className="space-y-2.5 text-xs">
            {whatItDoes.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-700 font-sans">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* WHAT IT DOES NOT DO */}
        <div className="bg-white rounded-lg border border-rose-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-rose-100">
            <XCircle className="w-5 h-5 text-rose-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-rose-950">
              {t.helpWhatDoesNotTitle}
            </h3>
          </div>

          <ul className="space-y-2.5 text-xs">
            {whatItDoesNot.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-700 font-sans">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
