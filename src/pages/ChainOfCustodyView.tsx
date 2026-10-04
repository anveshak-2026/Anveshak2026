import React, { useState } from 'react';
import {
  Link2,
  Download,
  PlusCircle,
  HelpCircle,
} from 'lucide-react';
import { useForensicStore } from '../services/ForensicContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { EvidenceClassification } from '../types/forensics';
import { Modal } from '../components/common/Modal';

export const ChainOfCustodyView: React.FC = () => {
  const {
    chainOfCustody,
    investigatorNotes,
    addInvestigatorNote,
    evidenceSources,
    currentCase,
    openExplainer,
    language,
    t,
  } = useForensicStore();

  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string>(
    evidenceSources[0]?.id || 'EV-001'
  );
  const [noteCategory, setNoteCategory] = useState<
    'Observation' | 'Integrity Check' | 'Hypothesis' | 'Discrepancy' | 'Formal Notation'
  >('Observation');
  const [classificationTag, setClassificationTag] = useState<EvidenceClassification>('SUPPORTED');
  const [noteContent, setNoteContent] = useState('');
  const [exported, setExported] = useState(false);

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    addInvestigatorNote({
      evidenceId: selectedEvidenceId,
      category: noteCategory,
      note: noteContent,
      classificationTag,
    });

    setNoteContent('');
    setNoteModalOpen(false);
  };

  const handleExportCoC = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(
        JSON.stringify(
          {
            caseId: currentCase.id,
            caseName: currentCase.name,
            exportedAt: new Date().toISOString(),
            chainOfCustodyLedger: chainOfCustody,
            investigatorNotes,
          },
          null,
          2
        )
      );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${currentCase.id}_Chain_of_Custody_Ledger.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  const handleExplainChain = () => {
    openExplainer({
      title: language === 'hi' ? 'कस्टडी श्रृंखला क्या है?' : 'What is the Chain of Custody?',
      subtitle: 'ISO/IEC 27037 Legal Admissibility Doctrine',
      whatItIs: language === 'hi'
        ? 'साक्ष्य पर की गई प्रत्येक कार्रवाई (आयात, हैश, रिकवरी, विश्लेषण, रिपोर्ट) का अपरिवर्तनीय कालानुक्रमिक रिकॉर्ड।'
        : 'An unbroken, chronological ledger documenting every custodial handover, cryptographic verification, and investigative note.',
      whatInvestigatorDoes: language === 'hi'
        ? 'सत्यापन विवरणों की समीक्षा करें, समसामयिक नोट जोड़ें और अदालत के लिए CoC रिकॉर्ड निर्यात करें।'
        : 'Inspect logged actions, append contemporaneous observations, and export the signed ledger for judicial disclosure.',
      whatHappensNext: language === 'hi'
        ? 'कस्टडी श्रृंखला साक्ष्य की कानूनी प्रामाणिकता को अंतिम रिपोर्ट में पुष्ट करती है।'
        : 'The complete cryptographic audit log is embedded into Section 10 of the official forensic report.',
      nextStepTab: 'reports',
      nextStepLabel: language === 'hi' ? 'अगला चरण: फोरेंसिक रिपोर्ट देखें' : 'Next Step: View Forensic Reports',
    });
  };

  const getLocalizedCustodyAction = (action: string) => {
    if (language !== 'hi') return action;
    if (action.includes('Evidence Source Ingested') || action.includes('Imported')) return 'साक्ष्य आयात किया गया';
    if (action.includes('SHA-256') || action.includes('Hash Generated')) return 'SHA-256 हैश उत्पन्न किया गया';
    if (action.includes('Integrity') || action.includes('Verified')) return 'अखंडता सत्यापित की गई';
    if (action.includes('Working Copy')) return 'कार्य प्रतिलिपि बनाई गई';
    if (action.includes('Analysis')) return 'विश्लेषण प्रारंभ हुआ';
    if (action.includes('Report')) return 'रिपोर्ट तैयार की गई';
    return action;
  };

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

  const getLocalizedStatus = (st: string) => {
    if (language !== 'hi') return st;
    if (st === 'Verified') return 'सत्यापित';
    if (st === 'Sealed') return 'सील';
    return st;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Link2 className="w-5 h-5 text-teal-700" />
            <h2 className="text-base font-bold uppercase tracking-wider text-slate-900">
              {t.chainTitle}
            </h2>
            <button
              onClick={handleExplainChain}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t.howItWorks}</span>
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            {t.chainExplanation}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setNoteModalOpen(true)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.btnRecordNote}</span>
          </button>
          <button
            onClick={handleExportCoC}
            className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>{exported ? (language === 'hi' ? 'डाउनलोड संपन्न!' : 'Ledger Downloaded!') : t.exportChain}</span>
          </button>
        </div>
      </div>

      {/* Custody Ledger Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            {language === 'hi'
              ? `कस्टडी श्रृंखला रिकॉर्ड (${chainOfCustody.length} प्रविष्टियां)`
              : `Immutable Custodial Action Ledger (${chainOfCustody.length} Entries)`}
          </h3>
          <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
            {t.cryptographicSequenceVerified}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">{t.tblCustodyAction}</th>
                <th className="py-2.5 px-3">{t.tblCustodyUser}</th>
                <th className="py-2.5 px-3">{t.tblCustodyTime}</th>
                <th className="py-2.5 px-3">{t.tblCustodyEvidenceId}</th>
                <th className="py-2.5 px-3">{t.tblCustodyHash}</th>
                <th className="py-2.5 px-3">{t.tblCustodyStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {chainOfCustody.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">
                    {getLocalizedCustodyAction(entry.action)}
                  </td>
                  <td className="py-2.5 px-3 font-sans text-slate-700">
                    <span className="font-medium text-slate-900">{entry.user}</span>
                    <span className="text-[10px] text-slate-500 block font-mono">
                      ({getLocalizedRole(entry.role)})
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{entry.timestamp}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{entry.evidenceId}</td>
                  <td className="py-2.5 px-3 text-slate-500 truncate max-w-[140px]" title={entry.sha256Hash}>
                    {entry.sha256Hash.substring(0, 16)}...
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                        entry.status === 'Verified' || entry.status === 'Sealed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {getLocalizedStatus(entry.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chronological Investigator Notes Section */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {t.contemporaneousNotesTitle} ({investigatorNotes.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'hi'
                ? 'फुटेज समीक्षा के दौरान वास्तविक समय में दर्ज किए गए सभी साक्ष्य अवलोकन।'
                : 'All evidentiary observations recorded in real-time during footage review.'}
            </p>
          </div>

          <button
            onClick={() => setNoteModalOpen(true)}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 font-mono cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{t.btnRecordNote}</span>
          </button>
        </div>

        <div className="space-y-3">
          {investigatorNotes.map((n) => (
            <div
              key={n.id}
              className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1.5 border-b border-slate-200/80">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-300">
                    {n.evidenceId}
                  </span>
                  <span className="font-semibold text-slate-700 font-sans">{n.category}</span>
                  <StatusBadge status={n.classificationTag} size="sm" />
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  <span>{n.author}</span> · <span>{n.timestamp}</span>
                </div>
              </div>

              <p className="text-slate-800 font-medium leading-relaxed font-sans">{n.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Note Modal */}
      <Modal
        isOpen={noteModalOpen}
        onClose={() => setNoteModalOpen(false)}
        title={t.modalAddNoteTitle}
        subtitle={t.modalAddNoteSubtitle}
        maxWidth="md"
      >
        <form onSubmit={handleCreateNote} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              {language === 'hi' ? 'साक्ष्य स्रोत या कैमरा फ़ीड चुनें:' : 'Evidence Source or Camera Channel:'}
            </label>
            <select
              value={selectedEvidenceId}
              onChange={(e) => setSelectedEvidenceId(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded bg-white text-xs"
            >
              {evidenceSources.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.id} — {ev.deviceOrFileName} ({ev.vendor})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">{t.lblNoteCategory}:</label>
            <select
              value={noteCategory}
              onChange={(e) => setNoteCategory(e.target.value as any)}
              className="w-full p-2 border border-slate-300 rounded bg-white text-xs"
            >
              <option value="Observation">{language === 'hi' ? 'अवलोकन' : 'Observation'}</option>
              <option value="Integrity Check">{language === 'hi' ? 'अखंडता जांच' : 'Integrity Check'}</option>
              <option value="Hypothesis">{language === 'hi' ? 'परिकल्पना' : 'Hypothesis'}</option>
              <option value="Discrepancy">{language === 'hi' ? 'विसंगति' : 'Discrepancy'}</option>
              <option value="Formal Notation">{language === 'hi' ? 'औपचारिक टिप्पणी' : 'Formal Notation'}</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">{t.lblClassificationTag}:</label>
            <select
              value={classificationTag}
              onChange={(e) => setClassificationTag(e.target.value as EvidenceClassification)}
              className="w-full p-2 border border-slate-300 rounded bg-white text-xs"
            >
              <option value="CONFIRMED">{language === 'hi' ? 'पुष्ट साक्ष्य' : 'CONFIRMED'}</option>
              <option value="SUPPORTED">{language === 'hi' ? 'समर्थित साक्ष्य' : 'SUPPORTED'}</option>
              <option value="INFERENCE">{language === 'hi' ? 'विश्लेषणात्मक निष्कर्ष' : 'INFERENCE'}</option>
              <option value="UNKNOWN">{language === 'hi' ? 'अज्ञात' : 'UNKNOWN'}</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">{t.lblNoteContent}:</label>
            <textarea
              rows={3}
              required
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'वस्तुनिष्ठ फोरेंसिक भाषा का उपयोग करके समसामयिक अवलोकन दर्ज करें...'
                  : 'Record contemporaneous observation using neutral non-prejudicial terminology...'
              }
              className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-teal-500 focus:outline-hidden"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setNoteModalOpen(false)}
              className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded text-xs"
            >
              {t.cancelBtn}
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded text-xs cursor-pointer shadow-xs"
            >
              {t.modalAddNoteSubmit}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
