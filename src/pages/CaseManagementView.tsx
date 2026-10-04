import React, { useState } from 'react';
import {
  FolderKanban,
  Plus,
  Search,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  HardDriveDownload,
} from 'lucide-react';
import { useForensicStore } from '../services/ForensicContext';
import { Modal } from '../components/common/Modal';
import { CaseRecord } from '../types/forensics';

export const CaseManagementView: React.FC = () => {
  const { cases, currentCase, setCurrentCaseById, createCase, setActiveTab, openExplainer, language, t } = useForensicStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedCaseDetail, setSelectedCaseDetail] = useState<CaseRecord | null>(null);

  // Form state
  const [newCaseName, setNewCaseName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newOrg, setNewOrg] = useState(
    language === 'hi' ? 'राज्य साइबर फोरेंसिक प्रभाग (निगरानी इकाई)' : 'State Cyber Forensic Division (Surveillance Unit)'
  );

  const filteredCases = cases.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.investigator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaseName.trim()) return;

    createCase({
      name: newCaseName,
      description: newDescription,
      organization: newOrg,
    });

    setNewCaseName('');
    setNewDescription('');
    setCreateModalOpen(false);
  };

  const handleOpenCase = (caseId: string) => {
    setCurrentCaseById(caseId);
    setActiveTab('dashboard');
  };

  const handleExplainCases = () => {
    openExplainer({
      title: language === 'hi' ? 'केस प्रबंधन कैसे काम करता है?' : 'How Case Management Works',
      subtitle: 'Isolated Forensic Repositories',
      whatItIs: language === 'hi'
        ? 'प्रत्येक जांच को एक विशिष्ट केस आईडी (जैसे ANV-2026-0042) के साथ एक अलग सुरक्षित कार्यक्षेत्र में रखा जाता है ताकि विभिन्न मामलों का साक्ष्य डेटा आपस में न मिले।'
        : 'Organizes all surveillance evidence, camera feeds, recovery files, and audit records into an isolated judicial workspace.',
      whatInvestigatorDoes: language === 'hi'
        ? 'नया केस बनाएं या मौजूदा केस चुनकर उसका विवरण जांचें और सक्रिय कार्यक्षेत्र पर स्विच करें।'
        : 'Create a new forensic case or open an existing case to access its isolated working evidence.',
      whatHappensNext: language === 'hi'
        ? 'केस खुलते ही अगला चरण साक्ष्य स्रोत आयात करना होता है।'
        : 'Once the case is established, proceed to Step 2: Ingest and acquire surveillance evidence sources.',
      nextStepTab: 'acquisition',
      nextStepLabel: language === 'hi' ? 'अगला चरण: साक्ष्य जोड़ें' : 'Next Step: Add Evidence',
    });
  };

  const getLocalizedCaseStatus = (statusStr: string) => {
    if (language !== 'hi') return statusStr;
    if (statusStr === 'Analysis in Progress') return 'विश्लेषण प्रगति पर है';
    if (statusStr === 'Report Generated') return 'रिपोर्ट तैयार की गई';
    return statusStr;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-teal-700" />
            <h2 className="text-base font-bold uppercase tracking-wider text-slate-900">
              {t.casesTitle}
            </h2>
            <button
              onClick={handleExplainCases}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t.howItWorks}</span>
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t.casesSubtitle}
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t.btnCreateCase}</span>
        </button>
      </div>

      {/* "Next Step: Add Evidence" Notification Banner */}
      <div className="bg-teal-50 border border-teal-200 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-teal-600 text-white flex items-center justify-center shrink-0">
            <HardDriveDownload className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-teal-950 text-sm">
              {t.nextStepAddEvidenceTitle}
            </p>
            <p className="text-teal-800 text-[11px] mt-0.5">
              {language === 'hi'
                ? `सक्रिय केस ${currentCase.id} के लिए DVR/NVR स्रोत या वीडियो फ़ाइल आयात करें।`
                : `Active case ${currentCase.id} is ready for multi-vendor footage ingestion.`}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('acquisition')}
          className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-md flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-xs transition-colors shrink-0"
        >
          <span>{t.btnProceedAddEvidence}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchCasePlaceholder}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Case List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCases.map((c) => {
          const isActive = c.id === currentCase.id;

          return (
            <div
              key={c.id}
              className={`bg-white rounded-xl border p-5 shadow-xs transition-all flex flex-col justify-between ${
                isActive
                  ? 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold bg-slate-900 text-teal-300 px-2 py-0.5 rounded">
                    {c.id}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${
                      c.status === 'Analysis in Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : c.status === 'Report Generated'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {getLocalizedCaseStatus(c.status)}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{c.name}</h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {c.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500 font-mono">
                  <div className="flex items-center justify-between">
                    <span>{language === 'hi' ? 'जांच अधिकारी:' : 'Investigator:'}</span>
                    <span className="text-slate-800 font-sans font-medium">{c.investigator}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{language === 'hi' ? 'दिनांक:' : 'Date Created:'}</span>
                    <span className="text-slate-800">{c.dateCreated}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{language === 'hi' ? 'साक्ष्य स्रोत:' : 'Evidence Sources:'}</span>
                    <span className="text-slate-800 font-bold">
                      {c.evidenceSourceCount} {language === 'hi' ? 'स्रोत' : 'Feeds'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedCaseDetail(c)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded border border-slate-200 cursor-pointer"
                >
                  {t.btnViewDetails}
                </button>

                {isActive ? (
                  <span className="text-xs font-bold text-teal-700 flex items-center gap-1 font-sans">
                    <CheckCircle2 className="w-4 h-4" /> {t.activeWorkspaceLabel}
                  </span>
                ) : (
                  <button
                    onClick={() => handleOpenCase(c.id)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors cursor-pointer"
                  >
                    {t.btnOpenCase}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Create Case */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title={t.modalCreateCaseTitle}
        subtitle={language === 'hi' ? 'नया पृथक फोरेंसिक साक्ष्य रिपॉजिटरी बनाएं' : 'Isolate evidence and chain of custody for a new investigation'}
        maxWidth="md"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              {t.fieldCaseName}
            </label>
            <input
              type="text"
              required
              value={newCaseName}
              onChange={(e) => setNewCaseName(e.target.value)}
              placeholder={language === 'hi' ? 'उदा. गोदाम सुरक्षा घटना जांच 2026' : 'e.g. Warehouse North Perimeter Incident'}
              className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              {t.fieldOrganization}
            </label>
            <input
              type="text"
              required
              value={newOrg}
              onChange={(e) => setNewOrg(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              {t.fieldDescription}
            </label>
            <textarea
              rows={3}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder={language === 'hi' ? 'जब्ती का स्थान, जांच का उद्देश्य और परिस्थितियां...' : 'Incident location, reason for surveillance seizure, and investigative mandate...'}
              className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setCreateModalOpen(false)}
              className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded text-xs"
            >
              {t.cancelBtn}
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded text-xs cursor-pointer shadow-xs"
            >
              {t.modalCreateCaseSubmit}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: View Details */}
      {selectedCaseDetail && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedCaseDetail(null)}
          title={t.modalCaseDetailsTitle}
          subtitle={`Case: ${selectedCaseDetail.id} · ${selectedCaseDetail.name}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200 font-mono">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {t.fieldCaseId}
                </span>
                <span className="font-bold text-slate-900 text-sm">{selectedCaseDetail.id}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {t.status}
                </span>
                <span className="font-bold text-teal-700">{getLocalizedCaseStatus(selectedCaseDetail.status)}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {t.fieldInvestigator}
                </span>
                <span className="text-slate-800 font-sans font-medium">{selectedCaseDetail.investigator}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {t.fieldDateCreated}
                </span>
                <span className="text-slate-800">{selectedCaseDetail.dateCreated}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {t.fieldOrganization}
                </span>
                <span className="text-slate-800 font-sans">{selectedCaseDetail.organization}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                {t.fieldDescription}
              </h4>
              <p className="text-slate-600 bg-white p-3 rounded border border-slate-200 leading-relaxed font-medium">
                {selectedCaseDetail.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <span className="text-[11px] text-slate-500">
                {language === 'hi'
                  ? `${selectedCaseDetail.evidenceSourceCount} साक्ष्य फ़ीड और ${selectedCaseDetail.cameraCount} कैमरे जुड़े हैं`
                  : `Includes ${selectedCaseDetail.evidenceSourceCount} evidence feeds across ${selectedCaseDetail.cameraCount} surveillance cameras.`}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCaseDetail(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded border border-slate-300"
                >
                  {t.closeBtn}
                </button>
                {selectedCaseDetail.id !== currentCase.id && (
                  <button
                    onClick={() => {
                      handleOpenCase(selectedCaseDetail.id);
                      setSelectedCaseDetail(null);
                    }}
                    className="px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded shadow-xs cursor-pointer"
                  >
                    {t.btnSwitchWorkspace}
                  </button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
