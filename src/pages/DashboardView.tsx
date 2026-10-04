import React, { useState } from 'react';
import {
  HardDrive,
  Camera,
  FolderOpen,
  ShieldCheck,
  AlertTriangle,
  Radio,
  Clock,
  ArrowRight,
  FileText,
  RotateCcw,
  Scale,
  Sparkles,
  HelpCircle,
  Link2,
  CheckCircle2,
  Compass,
  Info,
} from 'lucide-react';
import { useForensicStore } from '../services/ForensicContext';
import { StatCard } from '../components/common/StatCard';
import { IntegrityVerificationModal } from '../components/forensics/IntegrityVerificationModal';
import { RecoveryScanModal } from '../components/forensics/RecoveryScanModal';
import { EvidenceClassificationMatrix } from '../components/forensics/EvidenceClassificationMatrix';

export const DashboardView: React.FC = () => {
  const {
    currentCase,
    activityLog,
    setActiveTab,
    openExplainer,
    setIsTourOpen,
    setTourStep,
    language,
    t,
  } = useForensicStore();

  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [recoveryModalOpen, setRecoveryModalOpen] = useState(false);

  const handleExplainWorkflowStage = (stageName: string, tabId: string) => {
    switch (stageName) {
      case 'acquire':
        openExplainer({
          title: language === 'hi' ? 'चरण 1: साक्ष्य अधिग्रहण' : 'Step 1: Evidence Acquisition',
          subtitle: 'Multi-Vendor Ingestion & Preservation',
          whatItIs: language === 'hi'
            ? 'विभिन्न DVR/NVR (Hikvision, Dahua, CP Plus, Axis) से प्राप्त वीडियो को मानकीकृत कंटेनर में सुरक्षित आयात करता है।'
            : 'Standardizes and imports raw video files or physical disk images from diverse CCTV manufacturers.',
          whatInvestigatorDoes: language === 'hi'
            ? 'साक्ष्य का स्रोत प्रकार और वेंडर चुनकर वर्किंग कॉपी तैयार करें।'
            : 'Select the surveillance vendor hardware and ingest the file into a read-only working copy workspace.',
          whatHappensNext: language === 'hi'
            ? 'मूल साक्ष्य लॉक हो जाता है और विश्लेषण के लिए बिट-स्ट्रीम वर्किंग कॉपी बन जाती है।'
            : 'The original evidence is preserved under hardware write-blocking while an isolated bitstream duplicate is created for analysis.',
          nextStepTab: 'acquisition',
          nextStepLabel: language === 'hi' ? 'साक्ष्य अधिग्रहण खोलें' : 'Open Evidence Acquisition',
        });
        break;
      case 'verify':
        openExplainer({
          title: language === 'hi' ? 'चरण 2: अखंडता सत्यापन' : 'Step 2: Verify Integrity',
          subtitle: 'Cryptographic SHA-256 Bitstream Hash',
          whatItIs: language === 'hi'
            ? 'ANVESHAK एक क्रिप्टोग्राफिक SHA-256 हैश बनाता है ताकि जांचकर्ता यह जांच सके कि वर्किंग साक्ष्य में कोई बदलाव तो नहीं हुआ।'
            : 'ANVESHAK generates a cryptographic hash so the investigator can check whether the working evidence has changed.',
          whatInvestigatorDoes: language === 'hi'
            ? 'सत्यापन बटन पर क्लिक करें और जब्ती वाउचर के हैश से मिलान करें।'
            : 'Click "Verify Integrity" to run real-time bitstream SHA-256 calculation and compare against the seizure voucher.',
          whatHappensNext: language === 'hi'
            ? 'सत्यापन की स्थिति VERIFIED के रूप में कस्टडी श्रृंखला में दर्ज हो जाती है।'
            : 'Verification status is sealed into the immutable chain of custody ledger.',
          nextStepTab: 'acquisition',
          nextStepLabel: language === 'hi' ? 'अखंडता सत्यापन देखें' : 'View Integrity Verification',
        });
        break;
      case 'recover':
        openExplainer({
          title: language === 'hi' ? 'चरण 3: साक्ष्य पुनर्प्राप्ति' : 'Step 3: Recover Fragmented Evidence',
          subtitle: 'DVR Raw Sector Carving & Parsing',
          whatItIs: language === 'hi'
            ? 'DVR हार्ड ड्राइव के हटाए गए या अधूरे सेक्टरों से वीडियो डेटा की पहचान और पुनर्प्राप्ति करता है।'
            : 'Scans unallocated partitions to locate orphaned NAL video stream units before they are overwritten.',
          whatInvestigatorDoes: language === 'hi'
            ? 'रिकवरी स्कैन चलाकर उपलब्ध वीडियो फ़्रेमों को पहचानें।'
            : 'Execute the recovery scan simulation to discover carved H.264/H.265 video stream blocks.',
          whatHappensNext: language === 'hi'
            ? 'पुनर्प्राप्त फ़ाइलें विश्लेषण सूची में जुड़ जाती हैं।'
            : 'Recovered fragments are re-indexed with SPS/PPS headers and added to the evidence catalog.',
          nextStepTab: 'recovery',
          nextStepLabel: language === 'hi' ? 'पुनर्प्राप्ति केंद्र खोलें' : 'Open Recovery Center',
        });
        break;
      case 'analyze':
        openExplainer({
          title: language === 'hi' ? 'चरण 4: साक्ष्य विश्लेषण' : 'Step 4: Evidence Analysis',
          subtitle: 'Frame Inspection & Neutral Terminology',
          whatItIs: language === 'hi'
            ? 'वस्तुनिष्ठ फोरेंसिक भाषा (जैसे व्यक्ति जैसी आकृति) में फ़्रेम-दर-फ़्रेम फुटेज की समीक्षा।'
            : 'Detailed video examination using standardized neutral terminology to prevent premature bias.',
          whatInvestigatorDoes: language === 'hi'
            ? 'फ़्रेम आगे-पीछे करके महत्वपूर्ण घटनाओं पर जांचकर्ता नोट दर्ज करें।'
            : 'Step through frames, observe luminescence shifts, and record contemporaneous notes.',
          whatHappensNext: language === 'hi'
            ? 'आपकी टिप्पणियां और वर्गीकरण सीधे केस रिपोर्ट में शामिल हो जाते हैं।'
            : 'Observations are tagged (CONFIRMED, INFERENCE, UNKNOWN) and added to the official judicial dossier.',
          nextStepTab: 'analysis',
          nextStepLabel: language === 'hi' ? 'विश्लेषण वर्कस्पेस खोलें' : 'Open Analysis Workspace',
        });
        break;
      case 'reconstruct':
        openExplainer({
          title: language === 'hi' ? 'चरण 5: टाइमलाइन पुनर्निर्माण' : 'Step 5: Reconstruct Unified Timeline',
          subtitle: 'Multi-Camera Synchronization',
          whatItIs: language === 'hi'
            ? 'विभिन्न कैमरों की घटनाओं को एक सामान्य टाइमलाइन पर जोड़ता है ताकि घटनाओं का क्रम स्पष्ट हो।'
            : 'Aligns disparate surveillance feeds onto a unified chronology with hardware clock offset compensation.',
          whatInvestigatorDoes: language === 'hi'
            ? 'टाइमलाइन स्लाइडर को आगे-पीछे चलाकर सभी कैमरों की घटनाओं को एक साथ देखें।'
            : 'Scrub across the multi-camera playhead to inspect synchronized events across CAM 01 through CAM 05.',
          whatHappensNext: language === 'hi'
            ? 'घड़ी का अंतर (+137 सेकंड) सुधर जाता है और साक्ष्य का क्रम स्थापित होता है।'
            : 'Identified hardware clock offsets are reconciled without modifying raw timestamps.',
          nextStepTab: 'timeline',
          nextStepLabel: language === 'hi' ? 'एकीकृत टाइमलाइन खोलें' : 'Open Unified Timeline',
        });
        break;
      case 'report':
        openExplainer({
          title: language === 'hi' ? 'चरण 6: न्यायिक रिपोर्ट' : 'Step 6: Generate Forensic Report',
          subtitle: '12-Section Evidentiary Dossier',
          whatItIs: language === 'hi'
            ? 'अदालत में प्रस्तुत करने योग्य 12-चरणीय व्यापक फोरेंसिक रिपोर्ट पैकेज।'
            : 'A court-admissible 12-section standardized dossier detailing all evidence, hashes, notes, and custody steps.',
          whatInvestigatorDoes: language === 'hi'
            ? 'रिपोर्ट का पूर्वावलोकन करें और PDF या प्रिंट के रूप में निर्यात करें।'
            : 'Review findings and export the signed digital certificate as a PDF or JSON ledger.',
          whatHappensNext: language === 'hi'
            ? 'अदालती कार्रवाई के लिए डिजिटल रूप से सील किया गया दस्तावेज़ तैयार हो जाता है।'
            : 'The official certified dossier is generated with complete chain of custody for judicial disclosure.',
          nextStepTab: 'reports',
          nextStepLabel: language === 'hi' ? 'फोरेंसिक रिपोर्ट खोलें' : 'Open Forensic Reports',
        });
        break;
      default:
        setActiveTab(tabId);
    }
  };

  const getLocalizedCaseStatus = (statusStr: string) => {
    if (language !== 'hi') return statusStr;
    if (statusStr === 'Analysis in Progress') return 'विश्लेषण प्रगति पर है';
    if (statusStr === 'Report Generated') return 'रिपोर्ट तैयार की गई';
    return statusStr;
  };

  const getLocalizedActivityAction = (action: string) => {
    if (language !== 'hi') return action;
    if (action.includes('Evidence Source Ingested')) return 'साक्ष्य स्रोत आयात किया गया';
    if (action.includes('SHA-256 Bitstream Hash Generated')) return 'SHA-256 हैश उत्पन्न किया गया';
    if (action.includes('Integrity Verification Check Executed')) return 'अखंडता सत्यापन संपन्न';
    if (action.includes('Automated Clock Offset Calibrated')) return 'घड़ी का अंतर कैलिब्रेट किया गया';
    if (action.includes('Investigator Contemporaneous Note Logged')) return 'जांचकर्ता समसामयिक नोट दर्ज';
    if (action.includes('Footage Gap Radar Triggered')) return 'फुटेज अंतराल रडार सक्रिय';
    if (action.includes('12-Section Evidentiary Dossier Sealed')) return '12-चरणीय न्यायिक डॉसियर सील';
    return action;
  };

  const getLocalizedActivityResult = (res: string) => {
    if (language !== 'hi') return res;
    if (res === 'Verified') return 'सत्यापित';
    if (res === 'Success') return 'सफल';
    if (res === 'Complete') return 'पूर्ण';
    if (res === 'Flagged') return 'चिह्नित';
    return res;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner communicating ANVESHAK's purpose */}
      <div className="bg-slate-900 text-white rounded-xl p-5 sm:p-6 border border-slate-800 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-teal-400 font-mono text-xs font-bold tracking-widest uppercase">
                SIH26150 Multi-Vendor CCTV Forensics
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                {t.workingCopyIsolated}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {t.welcomeTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {t.welcomeSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setTourStep(1);
                setIsTourOpen(true);
              }}
              className="px-3.5 py-2 text-xs font-bold rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{t.guidedTourBtn}</span>
            </button>
            <button
              onClick={() => setActiveTab('help')}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-teal-400" />
              <span>{t.howItWorks}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Case Overview Bar */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-slate-900 text-teal-300 px-2.5 py-0.5 rounded">
                {language === 'hi' ? `केस आईडी: ${currentCase.id}` : `Case ID: ${currentCase.id}`}
              </span>
              <span className="text-sm font-bold text-slate-900">{currentCase.name}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {t.leadInvestigatorLabel}: <strong>{currentCase.investigator}</strong> · {t.seizingUnitLabel}: {currentCase.organization}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-3 py-1 rounded bg-teal-50 border border-teal-200 text-teal-800">
              {t.status}: {getLocalizedCaseStatus(currentCase.status)}
            </span>
            <button
              onClick={() => setActiveTab('cases')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2 py-1 rounded hover:bg-slate-100 cursor-pointer"
            >
              {t.switchCase}
            </button>
          </div>
        </div>

        {/* Six Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
          <StatCard
            label={t.evidenceSources}
            value={currentCase.evidenceSourceCount}
            subtext="Hikvision, Dahua, CP Plus"
            icon={<HardDrive className="w-4 h-4" />}
            variant="default"
            onClick={() => setActiveTab('acquisition')}
          />
          <StatCard
            label={t.camerasDetected}
            value={currentCase.cameraCount}
            subtext="CAM 01 – CAM 12"
            icon={<Camera className="w-4 h-4" />}
            variant="info"
            onClick={() => setActiveTab('timeline')}
          />
          <StatCard
            label={t.recoveredFiles}
            value="29"
            subtext={language === 'hi' ? 'पुनर्प्राप्त वीडियो अंश' : 'Carved stream fragments'}
            icon={<RotateCcw className="w-4 h-4" />}
            variant="success"
            onClick={() => setRecoveryModalOpen(true)}
          />
          <StatCard
            label={t.evidenceIntegrity}
            value={currentCase.integrityVerified ? (language === 'hi' ? 'सत्यापित' : 'Verified') : (language === 'hi' ? 'लंबित' : 'Pending')}
            subtext="SHA-256 Bitstream Match"
            icon={<ShieldCheck className="w-4 h-4" />}
            variant="success"
            onClick={() => setVerifyModalOpen(true)}
          />
          <StatCard
            label={t.timelineConflicts}
            value={currentCase.conflictCount}
            subtext={language === 'hi' ? 'घड़ी अंतर पहचाना गया' : 'Clock offsets detected'}
            icon={<AlertTriangle className="w-4 h-4" />}
            variant="warning"
            onClick={() => setActiveTab('conflicts')}
          />
          <StatCard
            label={t.footageGaps}
            value={currentCase.gapCount}
            subtext={language === 'hi' ? 'अनुपलब्ध फुटेज अंतराल' : 'Missing stream windows'}
            icon={<Radio className="w-4 h-4" />}
            variant="danger"
            onClick={() => setActiveTab('conflicts')}
          />
        </div>
      </div>

      {/* Self-Explaining Interactive Workflow Pipeline */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                {t.workflowTitle}
              </h2>
              <span className="text-[10px] bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded font-mono font-bold">
                {language === 'hi' ? 'स्व-व्याख्यात्मक' : 'Self-Explaining'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.workflowSubtitle}
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded">
            {language === 'hi' ? 'चरण 4 / 6 सक्रिय' : 'Stage 4 of 6 Active'}
          </span>
        </div>

        {/* 6 Clickable Stages */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 sm:gap-3 pt-1">
          {[
            {
              id: 'acquire',
              label: t.stepAcquire,
              sub: language === 'hi' ? 'मल्टी-वेंडर अधिग्रहण' : 'Multi-Vendor Ingest',
              icon: HardDrive,
              done: true,
            },
            {
              id: 'verify',
              label: t.stepVerify,
              sub: 'SHA-256 Bitstream',
              icon: ShieldCheck,
              done: true,
            },
            {
              id: 'recover',
              label: t.stepRecover,
              sub: language === 'hi' ? 'सेक्टर कार्विंग' : 'Sector Carving',
              icon: RotateCcw,
              done: true,
            },
            {
              id: 'analyze',
              label: t.stepAnalyze,
              sub: language === 'hi' ? 'तटस्थ निरीक्षण' : 'Neutral Inspection',
              icon: Clock,
              done: false,
              active: true,
            },
            {
              id: 'reconstruct',
              label: t.stepReconstruct,
              sub: language === 'hi' ? 'समय बहाव संरेखण' : 'Clock Drift Sync',
              icon: AlertTriangle,
              done: false,
            },
            {
              id: 'report',
              label: t.stepReport,
              sub: language === 'hi' ? '12-चरणीय डॉसियर' : '12-Section Dossier',
              icon: FileText,
              done: false,
            },
          ].map((stg) => {
            const Icon = stg.icon;
            return (
              <button
                key={stg.id}
                onClick={() => handleExplainWorkflowStage(stg.id, stg.id)}
                className={`p-3 rounded-lg border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                  stg.done
                    ? 'bg-emerald-50/50 border-emerald-200 hover:bg-emerald-50'
                    : stg.active
                    ? 'bg-blue-50/60 border-blue-300 ring-2 ring-blue-500/20 hover:bg-blue-50'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-7 h-7 rounded-md flex items-center justify-center ${
                      stg.done
                        ? 'bg-emerald-600 text-white'
                        : stg.active
                        ? 'bg-blue-600 text-white animate-pulse'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  {stg.done && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {stg.active && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-1 rounded">
                      {language === 'hi' ? 'सक्रिय' : 'Active'}
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">{stg.label}</p>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">{stg.sub}</p>
                </div>

                <div className="mt-2 pt-1 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-teal-800 font-semibold">
                  <span>{t.whatIsThis}</span>
                  <Info className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Prominent Evidence Classification Principle: Evidence ≠ Inference ≠ Unknown */}
      <EvidenceClassificationMatrix />

      {/* Grid: Recent Activity & Quick Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity List (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              {t.recentActivityTitle}
            </h3>
            <button
              onClick={() => setActiveTab('activity')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
            >
              <span>{t.viewFullLedger}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {activityLog.slice(0, 6).map((log) => (
              <div key={log.id} className="py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <div>
                    <span className="font-semibold text-slate-900">{getLocalizedActivityAction(log.action)}</span>
                    <span className="text-slate-400 mx-1.5">·</span>
                    <span className="font-mono text-slate-500 text-[11px]">{log.evidenceId}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-mono text-[11px]">{log.timestamp.substring(11)}</span>
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                      log.result === 'Verified' || log.result === 'Success'
                        ? 'bg-emerald-100 text-emerald-800'
                        : log.result === 'Flagged'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {getLocalizedActivityResult(log.result)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Self-Explaining Action Launcher (1 col) */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
            {t.forensicActionsTitle}
          </h3>

          <div className="space-y-2 text-xs">
            <button
              onClick={() => setActiveTab('acquisition')}
              className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer"
            >
              <div>
                <p className="font-bold text-slate-900">{t.navEvidence}</p>
                <p className="text-[11px] text-slate-500">
                  {language === 'hi' ? 'राइट-ब्लॉक्ड वर्किंग कॉपी आयात करें' : 'Ingest into write-blocked working copy'}
                </p>
              </div>
              <HardDrive className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer"
            >
              <div>
                <p className="font-bold text-slate-900">{t.navTimeline}</p>
                <p className="text-[11px] text-slate-500">
                  {language === 'hi' ? 'विभिन्न कैमरों का समय सिंक करें' : 'Synchronize 12 camera feeds across 3 vendors'}
                </p>
              </div>
              <Clock className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveTab('conflicts')}
              className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer"
            >
              <div>
                <p className="font-bold text-slate-900">{t.navConflicts}</p>
                <p className="text-[11px] text-slate-500">
                  {language === 'hi' ? 'घड़ी के बेमेल समय व अंतराल देखें' : 'Inspect +137s clock offset on CAM 02'}
                </p>
              </div>
              <Scale className="w-4 h-4 text-amber-600" />
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer"
            >
              <div>
                <p className="font-bold text-slate-900">{t.navReports}</p>
                <p className="text-[11px] text-slate-500">
                  {language === 'hi' ? 'अदालती 12-चरणीय रिपोर्ट तैयार करें' : '12-section judicial report with CoC'}
                </p>
              </div>
              <FileText className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* WHY ANVESHAK? Section */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div>
          <span className="text-[10px] font-mono uppercase font-bold text-teal-800 tracking-widest">
            SIH26150 Core Architecture
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            {t.whyAnveshakTitle}
          </h2>
          <p className="text-xs text-slate-600">
            {t.whyAnveshakSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-md bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {t.whyMultiVendorTitle}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.whyMultiVendorDesc}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-md bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {t.whyConflictEngineTitle}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.whyConflictEngineDesc}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-md bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {t.whyGapRadarTitle}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.whyGapRadarDesc}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-xs">
              04
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {t.whyClassificationTitle}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.whyClassificationDesc}
            </p>
          </div>
        </div>

        {/* Chain of Custody Card */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-slate-900 text-teal-300 flex items-center justify-center font-mono font-bold text-xs shrink-0">
              CoC
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                {t.whyChainOfCustodyTitle}
              </h4>
              <p className="text-xs text-slate-600">
                {t.whyChainOfCustodyDesc}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('chain-of-custody')}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300 shrink-0 self-start sm:self-auto cursor-pointer"
          >
            {t.chainTitle}
          </button>
        </div>
      </div>

      {/* Responsible AI Section */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            {t.responsibleAiTitle}
          </h3>
        </div>
        <p className="text-xs text-slate-700 font-semibold italic">
          {t.responsibleAiQuote}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="font-bold text-slate-900 block mb-0.5">{t.responsibleAiRule1Title}</span>
            <p className="text-slate-600 text-[11px] leading-snug">
              {t.responsibleAiRule1Desc}
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="font-bold text-slate-900 block mb-0.5">{t.responsibleAiRule2Title}</span>
            <p className="text-slate-600 text-[11px] leading-snug">
              {t.responsibleAiRule2Desc}
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="font-bold text-slate-900 block mb-0.5">{t.responsibleAiRule3Title}</span>
            <p className="text-slate-600 text-[11px] leading-snug">
              {t.responsibleAiRule3Desc}
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="font-bold text-slate-900 block mb-0.5">{t.responsibleAiRule4Title}</span>
            <p className="text-slate-600 text-[11px] leading-snug">
              {t.responsibleAiRule4Desc}
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="font-bold text-slate-900 block mb-0.5">{t.responsibleAiRule5Title}</span>
            <p className="text-slate-600 text-[11px] leading-snug">
              {t.responsibleAiRule5Desc}
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="font-bold text-slate-900 block mb-0.5">{t.responsibleAiRule6Title}</span>
            <p className="text-slate-600 text-[11px] leading-snug">
              {t.responsibleAiRule6Desc}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Forensic Mission Callout */}
      <div className="text-center py-4 border-t border-slate-200 space-y-1">
        <p className="text-xs font-mono font-bold text-slate-900">
          ANVESHAK · {t.brandSubtitle}
        </p>
        <p className="text-xs text-slate-600 italic">
          {t.footerQuote}
        </p>
        <p className="text-[11px] text-teal-800 font-mono font-semibold">
          {t.tagline}
        </p>
      </div>

      {/* Modals */}
      <IntegrityVerificationModal
        isOpen={verifyModalOpen}
        onClose={() => setVerifyModalOpen(false)}
      />
      <RecoveryScanModal
        isOpen={recoveryModalOpen}
        onClose={() => setRecoveryModalOpen(false)}
      />
    </div>
  );
};
