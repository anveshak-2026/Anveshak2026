import React from 'react';
import { Video } from 'lucide-react';
import { VideoPlayerSimulation } from '../components/forensics/VideoPlayerSimulation';
import { EvidenceClassificationMatrix } from '../components/forensics/EvidenceClassificationMatrix';
import { useForensicStore } from '../services/ForensicContext';

export const AnalysisView: React.FC = () => {
  const { t } = useForensicStore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-teal-700" />
            <h2 className="text-base font-bold uppercase tracking-wider text-slate-900">
              {t.analysisTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t.analysisSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium px-2.5 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded">
            {t.neutralTerminologyEnforced}
          </span>
        </div>
      </div>

      {/* Main Video Analysis Player Simulation */}
      <VideoPlayerSimulation />

      {/* Classification Matrix Reminder */}
      <EvidenceClassificationMatrix />
    </div>
  );
};
