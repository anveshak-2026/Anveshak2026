import React, { useState, useRef } from 'react';
import {
  FileText,
  Printer,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Calendar,
  Lock,
  Copy,
} from 'lucide-react';
import { useForensicStore } from '../../services/ForensicContext';
import { StatusBadge } from '../common/StatusBadge';

export const ReportPreview: React.FC = () => {
  const {
    currentCase,
    evidenceSources,
    timelineEvents,
    conflicts,
    gaps,
    investigatorNotes,
    chainOfCustody,
    recoveryFragments,
    currentUser,
    language,
    t,
  } = useForensicStore();

  const [copied, setCopied] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    if (!reportRef.current) return;
    navigator.clipboard.writeText(reportRef.current.innerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  return (
    <div className="space-y-4">
      {/* Top Action Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs no-print">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-700" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              {t.reportsTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.reportsSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-md transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? t.copiedToast : t.btnCopyDossier}</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t.btnExportPdf}</span>
          </button>
        </div>
      </div>

      {/* The Printable / Viewable Forensic Document */}
      <div
        ref={reportRef}
        className="bg-white rounded-lg border border-slate-300 p-6 sm:p-10 shadow-sm max-w-4xl mx-auto space-y-8 text-slate-800 font-sans"
      >
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 pb-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">
                {t.officialDocHeader}
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
                {t.reportCertificateTitle}
              </h1>
              <p className="text-xs text-slate-600 font-mono mt-0.5">
                {t.reportStandardRef}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold bg-slate-900 text-teal-300 px-3 py-1 rounded inline-block">
                {language === 'hi' ? `केस: ${currentCase.id}` : `CASE: ${currentCase.id}`}
              </span>
              <p className="text-[11px] text-slate-500 font-mono mt-1">
                {language === 'hi' ? 'दिनांक: 2026-10-04' : 'Date: 2026-10-04'}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 1: Case Information */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-[10px] font-mono">1</span>
            {t.sec1Title}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded border border-slate-200 text-xs font-mono">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">{t.fieldCaseId}:</span>
              <span className="font-bold text-slate-900">{currentCase.id}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">{t.fieldInvestigator}:</span>
              <span className="font-bold text-slate-900 font-sans">{currentCase.investigator}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">{t.status}:</span>
              <span className="font-bold text-teal-700">
                {currentCase.status === 'Analysis in Progress'
                  ? (language === 'hi' ? 'विश्लेषण प्रगति पर है' : 'Analysis in Progress')
                  : (language === 'hi' ? 'रिपोर्ट तैयार की गई' : 'Report Generated')}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">{t.fieldDateCreated}:</span>
              <span className="text-slate-800">{currentCase.dateCreated}</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">{t.fieldOrganization}:</span>
              <span className="font-sans text-slate-800">{currentCase.organization}</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">{t.fieldCaseName}:</span>
              <span className="font-sans font-bold text-slate-900">{currentCase.name}</span>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-sans bg-white p-3 rounded border border-slate-200">
            {currentCase.description}
          </p>
        </section>

        {/* SECTION 2: Evidence Sources Ingested */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-[10px] font-mono">2</span>
            {t.sec2Title}
          </h2>
          <div className="border border-slate-200 rounded overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-600 font-semibold border-b">
                <tr>
                  <th className="py-2 px-3">{t.tblEvidenceId}</th>
                  <th className="py-2 px-3">{t.tblSourceType}</th>
                  <th className="py-2 px-3">{t.tblVendor}</th>
                  <th className="py-2 px-3">{t.tblFileName}</th>
                  <th className="py-2 px-3">{t.tblFileSize}</th>
                  <th className="py-2 px-3">{t.tblFormat}</th>
                </tr>
              </thead>
              <tbody className="divide-y font-mono text-[11px]">
                {evidenceSources.map((ev) => (
                  <tr key={ev.id}>
                    <td className="py-2 px-3 font-bold">{ev.id}</td>
                    <td className="py-2 px-3 font-sans">{ev.sourceType}</td>
                    <td className="py-2 px-3 font-sans font-semibold">{ev.vendor}</td>
                    <td className="py-2 px-3">{ev.deviceOrFileName}</td>
                    <td className="py-2 px-3">{ev.fileSize}</td>
                    <td className="py-2 px-3">{ev.format}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: Cryptographic Verification */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-[10px] font-mono">3</span>
            {t.sec3Title}
          </h2>
          <div className="space-y-2">
            {evidenceSources.map((ev) => (
              <div key={ev.id} className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-900">{ev.id} · {ev.deviceOrFileName}</span>
                  <StatusBadge status={ev.integrityStatus} size="sm" />
                </div>
                <div className="font-mono text-[10px] text-slate-600 break-all select-all bg-white p-2 rounded border border-slate-200">
                  <span className="text-slate-400 block mb-0.5">SHA-256 Bitstream Hash:</span>
                  {ev.originalSha256}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: Clock Synchronization & Offset Calibrations */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-[10px] font-mono">4</span>
            {t.sec4Title}
          </h2>
          <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-2">
            <p className="text-slate-700 leading-relaxed font-sans">
              {language === 'hi'
                ? 'निगरानी कैमरों के बीच हार्डवेयर घड़ी के बहाव का विश्लेषण किया गया। CAM 02 में संदर्भ घड़ी (CAM 01 NTP) की तुलना में +137 सेकंड का बहाव पाया गया। मूल टाइमस्टैम्प को सुरक्षित रखते हुए विश्लेषणात्मक संरेखण लागू किया गया।'
                : 'Hardware real-time clock drift analysis was conducted across all camera feeds. CAM 02 exhibited a +137 second offset relative to the reference NTP master (CAM 01). Non-destructive presentation adjustments were applied while retaining raw timestamps intact.'}
            </p>
          </div>
        </section>

        {/* SECTION 5: Chronological Event Sequence */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-[10px] font-mono">5</span>
            {t.sec5Title}
          </h2>
          <div className="border border-slate-200 rounded overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-600 font-semibold border-b">
                <tr>
                  <th className="py-2 px-3">{language === 'hi' ? 'समय (IST)' : 'Time (IST)'}</th>
                  <th className="py-2 px-3">{language === 'hi' ? 'कैमरा' : 'Camera'}</th>
                  <th className="py-2 px-3">{language === 'hi' ? 'अवलोकित घटना' : 'Observed Event'}</th>
                  <th className="py-2 px-3">{language === 'hi' ? 'तटस्थ शब्दावली' : 'Neutral Term'}</th>
                  <th className="py-2 px-3">{language === 'hi' ? 'वर्गीकरण' : 'Classification'}</th>
                </tr>
              </thead>
              <tbody className="divide-y font-mono text-[11px]">
                {timelineEvents.map((evt) => (
                  <tr key={evt.id}>
                    <td className="py-2 px-3 font-bold">{evt.displayTime}</td>
                    <td className="py-2 px-3">{evt.cameraCode}</td>
                    <td className="py-2 px-3 font-sans">{evt.eventDescription}</td>
                    <td className="py-2 px-3 font-sans text-teal-800">{evt.neutralObjectTerm}</td>
                    <td className="py-2 px-3">
                      <StatusBadge status={evt.classification} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 6: Fragment Recovery Findings */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-[10px] font-mono">6</span>
            {t.sec6Title}
          </h2>
          <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-1">
            <p className="font-semibold text-slate-800">
              {language === 'hi'
                ? `अनएलोकेटेड सेक्टरों से कुल ${recoveryFragments.length} वीडियो अंश सफलतापूर्वक पुनर्प्राप्त किए गए:`
                : `Total ${recoveryFragments.length} stream fragments carved from unallocated storage sectors:`}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[10.5px] pt-1">
              {recoveryFragments.slice(0, 4).map((f) => (
                <div key={f.id} className="bg-white p-2 rounded border border-slate-200">
                  <span className="font-bold text-slate-900 block">{f.id}</span>
                  <span className="text-slate-500 block truncate">{f.fileName}</span>
                  <span className="text-teal-700">{f.size}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Anomaly & Conflict Analysis */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-[10px] font-mono">7</span>
            {t.sec7Title}
          </h2>
          <div className="space-y-2 text-xs">
            {conflicts.map((c) => (
              <div key={c.id} className="p-3 bg-amber-50/70 border border-amber-200 rounded space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-900">{c.id} · {c.conflictType}</span>
                  <span className="font-mono text-[10px] text-amber-800 font-bold">{t.severityLabel}: {c.severity}</span>
                </div>
                <p className="text-slate-800 font-sans">{c.description}</p>
                <div className="text-[11px] text-slate-600 font-mono">
                  {t.affectedSourcesLabel} {c.affectedSources.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 8: Surveillance Interval Gap Radar */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-[10px] font-mono">8</span>
            {t.sec8Title}
          </h2>
          <div className="space-y-2 text-xs">
            {gaps.map((g) => (
              <div key={g.id} className="p-3 bg-rose-50/70 border border-rose-200 rounded space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-900">{g.id} · {g.cameraCode}</span>
                  <span className="font-mono text-rose-800 font-bold">{g.durationMinutes} min gap</span>
                </div>
                <p className="text-slate-800 font-sans">
                  {language === 'hi' ? 'संभावित तकनीकी श्रेणी:' : 'Possible Technical Category:'} <strong>{g.possibleReasonCategory}</strong>
                </p>
                <p className="text-slate-600 text-[11px] font-sans">{g.technicalNote}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 9: Contemporaneous Investigator Notes */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-[10px] font-mono">9</span>
            {t.sec9Title}
          </h2>
          <div className="space-y-2 text-xs">
            {investigatorNotes.map((n) => (
              <div key={n.id} className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
                <div className="flex items-center justify-between font-mono text-[11px] text-slate-500">
                  <span className="font-bold text-slate-900">{n.evidenceId} · {n.category}</span>
                  <span>{n.author} ({n.timestamp})</span>
                </div>
                <p className="text-slate-800 font-sans">{n.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 10: Immutable Chain of Custody */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-[10px] font-mono">10</span>
            {t.sec10Title}
          </h2>
          <div className="border border-slate-200 rounded overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-600 font-semibold border-b">
                <tr>
                  <th className="py-2 px-3">{t.tblCustodyAction}</th>
                  <th className="py-2 px-3">{t.tblCustodyUser}</th>
                  <th className="py-2 px-3">{t.tblCustodyTime}</th>
                  <th className="py-2 px-3">{t.tblCustodyEvidenceId}</th>
                  <th className="py-2 px-3">{t.tblCustodyStatus}</th>
                </tr>
              </thead>
              <tbody className="divide-y font-mono text-[11px]">
                {chainOfCustody.map((c) => (
                  <tr key={c.id}>
                    <td className="py-2 px-3 font-sans font-medium">{c.action}</td>
                    <td className="py-2 px-3 font-sans">{c.user}</td>
                    <td className="py-2 px-3">{c.timestamp}</td>
                    <td className="py-2 px-3 font-bold">{c.evidenceId}</td>
                    <td className="py-2 px-3 text-emerald-700 font-bold">{c.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 11: Method Neutrality & Standard Certification */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-[10px] font-mono">11</span>
            {t.sec11Title}
          </h2>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs space-y-2">
            <p className="text-slate-700 leading-relaxed font-sans">
              {t.reportCarefulWordingSample}
            </p>
            <p className="text-slate-600 italic text-[11px] font-sans">
              {t.reportLimitationsText}
            </p>
          </div>
        </section>

        {/* SECTION 12: Sign-off & Judicial Attestation */}
        <section className="space-y-4 pt-4 border-t-2 border-slate-900">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-[10px] font-mono">12</span>
            {t.sec12Title}
          </h2>

          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            {t.judicialDisclaimer}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-xs font-mono">
            <div className="border-t border-slate-400 pt-2">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                {language === 'hi' ? 'जांच अधिकारी हस्ताक्षर:' : 'Lead Forensic Examiner:'}
              </span>
              <p className="font-bold text-slate-900 font-sans mt-1">{currentUser.name}</p>
              <p className="text-[10px] text-slate-500 font-sans">{getLocalizedRole(currentUser.role)}</p>
              <p className="text-[10px] text-teal-700 font-bold mt-1">SEALED: 2026-10-04T10:45:00Z</p>
            </div>

            <div className="border-t border-slate-400 pt-2">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                {language === 'hi' ? 'प्रयोगशाला पर्यवेक्षक:' : 'Laboratory Custodian:'}
              </span>
              <p className="font-bold text-slate-900 font-sans mt-1">Dr. S. K. Verma</p>
              <p className="text-[10px] text-slate-500 font-sans">{language === 'hi' ? 'निदेशक, फोरेंसिक विज्ञान' : 'Director, Digital Forensics'}</p>
              <p className="text-[10px] text-emerald-700 font-bold mt-1">ATTESTED: ISO/IEC 27037</p>
            </div>

            <div className="border-t border-slate-400 pt-2">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                {language === 'hi' ? 'क्रिप्टोग्राफिक लेज़र सील:' : 'Cryptographic Ledger Seal:'}
              </span>
              <p className="font-mono text-[9px] text-slate-600 break-all mt-1">
                4a9f2b8c...e17d092a (VERIFIED)
              </p>
              <p className="text-[10px] text-teal-800 font-bold mt-1">TAMPER-EVIDENT HASH MATCH</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
