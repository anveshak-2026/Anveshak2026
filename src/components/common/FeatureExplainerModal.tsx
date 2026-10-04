import React from 'react';
import { HelpCircle, ArrowRight, CheckCircle2, UserCheck, X } from 'lucide-react';
import { useForensicStore } from '../../services/ForensicContext';

export const FeatureExplainerModal: React.FC = () => {
  const { activeExplainer, closeExplainer, setActiveTab, language } = useForensicStore();

  if (!activeExplainer) return null;

  const handleNextStep = () => {
    if (activeExplainer.nextStepTab) {
      setActiveTab(activeExplainer.nextStepTab);
    }
    closeExplainer();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          onClick={closeExplainer}
        />

        <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-lg border border-slate-200">
          {/* Header */}
          <div className="flex items-start justify-between px-6 py-4 bg-slate-900 text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500 text-slate-950 flex items-center justify-center font-bold">
                <HelpCircle className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight text-white">{activeExplainer.title}</h3>
                {activeExplainer.subtitle && (
                  <p className="text-[11px] text-teal-300 font-mono mt-0.5">{activeExplainer.subtitle}</p>
                )}
              </div>
            </div>
            <button
              onClick={closeExplainer}
              className="text-slate-400 hover:text-white p-1 rounded-md"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 3 Clear Self-Explaining Sections */}
          <div className="p-6 space-y-4 text-xs">
            {/* 1. What is this? */}
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                {language === 'hi' ? '1. यह क्या है?' : '1. What is this feature?'}
              </span>
              <p className="text-slate-800 leading-relaxed font-medium">
                {activeExplainer.whatItIs}
              </p>
            </div>

            {/* 2. What investigator needs to do */}
            <div className="bg-teal-50/60 p-3.5 rounded-lg border border-teal-200 space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-800 block">
                {language === 'hi' ? '2. जांचकर्ता को क्या करना है?' : '2. What the investigator needs to do'}
              </span>
              <p className="text-teal-950 leading-relaxed font-medium">
                {activeExplainer.whatInvestigatorDoes}
              </p>
            </div>

            {/* 3. What happens after clicking button */}
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                {language === 'hi' ? '3. बटन दबाने पर क्या होता है?' : '3. What happens after clicking the button'}
              </span>
              <p className="text-slate-800 leading-relaxed">
                {activeExplainer.whatHappensNext}
              </p>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="flex items-center justify-between px-6 py-3.5 bg-slate-50 border-t border-slate-200">
            <button
              onClick={closeExplainer}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-md font-medium"
            >
              {language === 'hi' ? 'बंद करें' : 'Close'}
            </button>

            {activeExplainer.nextStepTab && (
              <button
                onClick={handleNextStep}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <span>{activeExplainer.nextStepLabel || (language === 'hi' ? 'अगला चरण देखें' : 'Proceed to Next Step')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
