import React, { useState } from 'react';
import { Scale } from 'lucide-react';
import { useForensicStore } from '../../services/ForensicContext';
import { ConflictItem } from '../../types/forensics';
import { Modal } from '../common/Modal';

export const ConflictEngineView: React.FC = () => {
  const { conflicts, resolveConflict, language, t } = useForensicStore();
  const [selectedConflict, setSelectedConflict] = useState<ConflictItem | null>(null);
  const [reviewNote, setReviewNote] = useState('');

  const handleOpenReview = (conflict: ConflictItem) => {
    setSelectedConflict(conflict);
    setReviewNote(conflict.investigatorNotes || '');
  };

  const handleSaveResolution = () => {
    if (!selectedConflict) return;
    resolveConflict(selectedConflict.id, reviewNote);
    setSelectedConflict(null);
  };

  const getLocalizedSeverity = (sev: string) => {
    if (language !== 'hi') return sev;
    if (sev === 'High') return t.severityHigh;
    if (sev === 'Medium') return t.severityMedium;
    if (sev === 'Low') return t.severityLow;
    return sev;
  };

  const getLocalizedConflictType = (type: string) => {
    if (language !== 'hi') return type;
    if (type.includes('Hardware Clock Offset')) return 'हार्डवेयर घड़ी का समय अंतर';
    if (type.includes('Timezone Divergence')) return 'समय क्षेत्र विसंगति (UTC/IST)';
    if (type.includes('Frame Rate Cadence Drop')) return 'फ़्रेम दर में गिरावट';
    return type;
  };

  return (
    <div className="space-y-4">
      {/* Principle Banner */}
      <div className="bg-amber-50/80 border border-amber-300 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Scale className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs">
            <h4 className="font-bold text-amber-950 text-sm">
              {t.conflictDoctrineTitle}
            </h4>
            <p className="text-amber-900 mt-1 leading-relaxed">
              {t.conflictDoctrineDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Conflict Items Grid */}
      <div className="grid grid-cols-1 gap-3">
        {conflicts.map((conf) => (
          <div
            key={conf.id}
            className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs hover:border-slate-300 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold bg-slate-900 text-teal-300 px-2 py-0.5 rounded">
                  {conf.id}
                </span>
                <span className="text-sm font-bold text-slate-900">{getLocalizedConflictType(conf.conflictType)}</span>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    conf.severity === 'High'
                      ? 'bg-rose-100 text-rose-800'
                      : conf.severity === 'Medium'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {t.severityLabel}: {getLocalizedSeverity(conf.severity)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2.5 py-1 rounded font-medium ${
                    conf.status === 'Investigator Verified'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-900 font-semibold'
                  }`}
                >
                  {conf.status === 'Investigator Verified'
                    ? (language === 'hi' ? 'जांचकर्ता द्वारा सत्यापित' : 'Investigator Verified')
                    : (language === 'hi' ? 'समीक्षा लंबित' : 'Pending Review')}
                </span>
                <button
                  onClick={() => handleOpenReview(conf)}
                  className="px-3 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300 transition-colors cursor-pointer"
                >
                  {t.btnReviewFinding}
                </button>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="md:col-span-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  {language === 'hi' ? 'पहचाने गए असंगत विवरण' : 'Surfaced Inconsistency Description'}
                </span>
                <p className="text-slate-800 font-medium leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100">
                  {conf.description}
                </p>
                <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                  <span>{t.affectedSourcesLabel}</span>
                  <span className="font-bold text-slate-800">{conf.affectedSources.join(' ↔ ')}</span>
                  <span>· {language === 'hi' ? 'पहचाना गया:' : 'Detected:'} {conf.detectedAt}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  {t.suggestedActionLabel}
                </span>
                <div className="bg-amber-50/50 p-2.5 rounded border border-amber-200 text-amber-950 text-[11px] leading-relaxed">
                  <p>{t.suggestedActionText}</p>
                </div>
                {conf.investigatorNotes && (
                  <div className="mt-2 text-[11px] text-slate-600 bg-slate-50 p-2 rounded">
                    <strong className="block text-[10px] uppercase text-slate-400">
                      {language === 'hi' ? 'जांचकर्ता समीक्षा नोट:' : 'Investigator Note:'}
                    </strong>
                    {conf.investigatorNotes}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {selectedConflict && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedConflict(null)}
          title={t.btnReviewFindingModalTitle}
          subtitle={`Conflict ID: ${selectedConflict.id} · ${getLocalizedConflictType(selectedConflict.conflictType)}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold mb-1">
                {language === 'hi' ? 'पहचाना गया विसंगति विवरण' : 'Detected Finding'}
              </span>
              <p className="text-slate-800 font-medium">{selectedConflict.description}</p>
              <div className="mt-2 font-mono text-[11px] text-slate-500">
                {t.affectedSourcesLabel} <strong>{selectedConflict.affectedSources.join(' and ')}</strong>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {language === 'hi' ? 'जांचकर्ता का समसामयिक सत्यापन नोट दर्ज करें:' : 'Investigator Attestation & Note:'}
              </label>
              <textarea
                rows={3}
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder={
                  language === 'hi'
                    ? 'जांचकर्ता सत्यापन निष्कर्ष दर्ज करें (उदा. भौतिक DVR घड़ी निरीक्षण द्वारा +137s ऑफसेट की पुष्टि की गई)...'
                    : 'Record investigator verification findings...'
                }
                className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-teal-500 focus:outline-hidden"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedConflict(null)}
                className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded"
              >
                {t.cancelBtn}
              </button>
              <button
                type="button"
                onClick={handleSaveResolution}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded cursor-pointer shadow-xs"
              >
                {t.btnSaveResolution}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
