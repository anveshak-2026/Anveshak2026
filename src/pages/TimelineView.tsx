import React from 'react';
import { Clock, HelpCircle, AlertTriangle } from 'lucide-react';
import { UnifiedTimeline } from '../components/forensics/UnifiedTimeline';
import { useForensicStore } from '../services/ForensicContext';

export const TimelineView: React.FC = () => {
  const { openExplainer, setActiveTab, language, t } = useForensicStore();

  const handleExplainTimeline = () => {
    openExplainer({
      title: language === 'hi' ? 'एकीकृत समयरेखा कैसे काम करती है?' : 'How Unified Timeline Reconstruction Works',
      subtitle: 'Multi-Camera Synchronization & RTC Calibration',
      whatItIs: language === 'hi'
        ? 'विभिन्न कैमरों की घटनाओं को एक सामान्य समयरेखा में जोड़ता है ताकि जांचकर्ता घटनाओं के सही क्रम को समझ सकें।'
        : 'Combines asynchronous surveillance feeds from CAM 01 through CAM 05 into a single synchronized chronological timeline.',
      whatInvestigatorDoes: language === 'hi'
        ? 'स्लाइडर को चलाएं, घटनाओं का क्रम देखें और हार्डवेयर घड़ी के अंतर (+137 सेकंड) की जांच करें।'
        : 'Scrub across timestamps, inspect event markers, and toggle hardware RTC clock calibrations to align disparate camera clocks.',
      whatHappensNext: language === 'hi'
        ? 'घड़ी के बेमेल समय और गायब फुटेज को अगले चरण (विरोधाभास एवं अंतराल) में जांचा जाता है।'
        : 'Surfaced timestamp offsets and missing footage windows are analyzed in the Conflicts & Gaps module.',
      nextStepTab: 'conflicts',
      nextStepLabel: language === 'hi' ? 'अगला चरण: विरोधाभास एवं अंतराल देखें' : 'Next Step: Review Conflicts & Gaps',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-teal-700" />
            <h2 className="text-base font-bold uppercase tracking-wider text-slate-900">
              {t.timelineTitle}
            </h2>
            <button
              onClick={handleExplainTimeline}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t.howItWorks}</span>
            </button>
          </div>
          <p className="text-xs text-slate-600 mt-1 font-medium max-w-3xl">
            {t.timelineExplanation}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('conflicts')}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.nextStep}: {t.navConflicts}</span>
          </button>
        </div>
      </div>

      {/* Unified Timeline Main Scrubber */}
      <UnifiedTimeline />

      {/* Forensic Synchronicity Principles Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            {t.correlatedNotice}
          </h3>
          <span className="text-[11px] font-mono font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            ISO/IEC 27037
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">
              {t.temporalRule1Title}
            </span>
            <p className="text-slate-600 text-[11px] leading-snug">
              {t.temporalRule1Desc}
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">
              {t.temporalRule2Title}
            </span>
            <p className="text-slate-600 text-[11px] leading-snug">
              {t.temporalRule2Desc}
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">
              {t.temporalRule3Title}
            </span>
            <p className="text-slate-600 text-[11px] leading-snug">
              {t.temporalRule3Desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
