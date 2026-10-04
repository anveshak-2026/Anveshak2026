import React, { useState } from 'react';
import { AlertTriangle, Radio, Scale, HelpCircle, FileText } from 'lucide-react';
import { ConflictEngineView } from '../components/forensics/ConflictEngineView';
import { GapRadarView } from '../components/forensics/GapRadarView';
import { EvidenceClassificationMatrix } from '../components/forensics/EvidenceClassificationMatrix';
import { useForensicStore } from '../services/ForensicContext';

export const ConflictsAndGapsView: React.FC = () => {
  const { conflicts, gaps, openExplainer, setActiveTab, language, t } = useForensicStore();
  const [selectedSubTab, setSelectedSubTab] = useState<'conflicts' | 'gaps'>('conflicts');

  const handleExplainConflictsGaps = () => {
    openExplainer({
      title: language === 'hi' ? 'विरोधाभास एवं अंतराल मॉड्यूल कैसे काम करता है?' : 'How Conflicts & Evidence Gaps Work',
      subtitle: 'Non-Prejudicial Forensic Anomaly Detection',
      whatItIs: language === 'hi'
        ? 'विभिन्न DVR कैमरों के बीच समय के अंतर (Clock drift) और छूटे हुए फुटेज अंतरालों (Missing intervals) को तटस्थ रूप से उजागर करता है।'
        : 'Detects inconsistencies between surveillance sources without automatically presuming which clock is true, and identifies missing video windows objectively.',
      whatInvestigatorDoes: language === 'hi'
        ? 'घड़ी के बेमेल समय की समीक्षा करें और अनुपलब्ध फुटेज के संभावित तकनीकी कारणों का आकलन करें।'
        : 'Review surfaced clock deltas (e.g. +137s between CAM 01 and CAM 02) and record investigative notes for gap intervals.',
      whatHappensNext: language === 'hi'
        ? 'सभी विरोधाभास और अंतरालों का विवरण 12-चरणीय अंतिम फोरेंसिक रिपोर्ट में स्वतः शामिल हो जाता है।'
        : 'Reconciled findings and objective gap classifications are compiled into Section 7 & 8 of the judicial forensic report.',
      nextStepTab: 'reports',
      nextStepLabel: language === 'hi' ? 'अगला चरण: फोरेंसिक रिपोर्ट बनाएं' : 'Next Step: Generate Forensic Report',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Self-Explanation */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold uppercase tracking-wider text-slate-900">
              {t.conflictsGapsTitle}
            </h2>
            <button
              onClick={handleExplainConflictsGaps}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t.howItWorks}</span>
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            {t.conflictsGapsSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sub-tab navigation */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs font-medium">
            <button
              onClick={() => setSelectedSubTab('conflicts')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                selectedSubTab === 'conflicts'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.conflictsTab} ({conflicts.length})</span>
            </button>

            <button
              onClick={() => setSelectedSubTab('gaps')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                selectedSubTab === 'gaps'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-rose-600" />
              <span>{t.gapsTab} ({gaps.length})</span>
            </button>
          </div>

          <button
            onClick={() => setActiveTab('reports')}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-teal-400" />
            <span>{t.nextStep}: {t.navReports}</span>
          </button>
        </div>
      </div>

      {/* Non-Prejudicial Notice Bar */}
      <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg text-xs text-amber-950 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
          <p className="font-medium">
            {selectedSubTab === 'conflicts' ? t.conflictRuleNotice : t.gapTamperingNotice}
          </p>
        </div>
      </div>

      {/* Render sub-view */}
      {selectedSubTab === 'conflicts' ? <ConflictEngineView /> : <GapRadarView />}

      {/* Evidence Classification Matrix */}
      <EvidenceClassificationMatrix />
    </div>
  );
};
