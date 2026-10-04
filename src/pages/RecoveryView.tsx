import React, { useState } from 'react';
import {
  RotateCcw,
  AlertTriangle,
  HelpCircle,
  FileText,
  Clock,
} from 'lucide-react';
import { useForensicStore } from '../services/ForensicContext';
import { RecoveryScanModal } from '../components/forensics/RecoveryScanModal';
import { RecoveryFragment } from '../types/forensics';
import { Modal } from '../components/common/Modal';

export const RecoveryView: React.FC = () => {
  const {
    partitions,
    recoveryFragments,
    openExplainer,
    setActiveTab,
    language,
    t,
  } = useForensicStore();

  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [inspectedFragment, setInspectedFragment] = useState<RecoveryFragment | null>(null);

  const handleExplainRecovery = () => {
    openExplainer({
      title: language === 'hi' ? 'साक्ष्य पुनर्प्राप्ति कैसे काम करती है?' : 'How Evidence Recovery Works',
      subtitle: 'Sector Carving & NAL Byte Stream Re-indexing',
      whatItIs: language === 'hi'
        ? 'आयातित साक्ष्य स्रोत से संभावित रूप से पुनर्प्राप्त करने योग्य, खंडित या अनुपलब्ध निगरानी वीडियो की पहचान करता है।'
        : 'Identifies potentially recoverable, fragmented or unavailable surveillance files from unallocated DVR slack before circular overwrite completes.',
      whatInvestigatorDoes: language === 'hi'
        ? 'रिकवरी स्कैन चलाएं ताकि अनएलोकेटेड सेक्टरों से वीडियो NAL फ़्रेम निकाले जा सकें।'
        : 'Click "Run Recovery Scan" to parse proprietary partition tables and carve orphaned H.264/H.265 byte sequences.',
      whatHappensNext: language === 'hi'
        ? 'पुनर्प्राप्त फ़ाइलें टाइमलाइन और विश्लेषण के लिए तैयार हो जाती हैं।'
        : 'Carved video blocks are re-indexed with SPS/PPS headers and forwarded to the timeline reconstruction engine.',
      nextStepTab: 'timeline',
      nextStepLabel: language === 'hi' ? 'अगला चरण: टाइमलाइन पुनर्निर्माण' : 'Next Step: Reconstruct Timeline',
    });
  };

  const getLocalizedPartitionStatus = (status: string) => {
    if (language !== 'hi') return status;
    if (status === 'Healthy') return 'सामान्य / स्वस्थ';
    if (status === 'Fragmented') return 'खंडित';
    return status;
  };

  const getLocalizedCarveStatus = (status: string) => {
    if (language !== 'hi') return status;
    if (status === 'Recovered') return 'पुनर्प्राप्त';
    if (status === 'Corrupted' || status === 'Unrecoverable') return 'अप्राप्य / दूषित';
    if (status === 'Partial Carve' || status === 'Partial') return 'आंशिक';
    return status;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-teal-700" />
            <h2 className="text-base font-bold uppercase tracking-wider text-slate-900">
              {t.recoveryTitle}
            </h2>
            <button
              onClick={handleExplainRecovery}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t.howItWorks}</span>
            </button>
          </div>
          <p className="text-xs text-slate-600 mt-1 font-medium max-w-3xl">
            {t.recoveryExplanation}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('timeline')}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-slate-600" />
            <span>{t.nextStep}: {t.navTimeline}</span>
          </button>

          <button
            onClick={() => setScanModalOpen(true)}
            className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.runRecoveryScan}</span>
          </button>
        </div>
      </div>

      {/* Mandatory Prototype Simulation Notice */}
      <div className="p-4 bg-amber-50 border border-amber-300 rounded-lg text-amber-950 text-xs space-y-1">
        <div className="flex items-center gap-2 font-bold text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{t.protoRecoveryNoticeHeader}</span>
        </div>
        <p className="text-[11px] text-amber-900 leading-relaxed">
          {t.protoRecoveryNoticeText}
        </p>
      </div>

      {/* Target Storage Device & Partition Carve Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
              {t.recoverySourceLabel}
            </span>
            <h3 className="text-sm font-bold text-slate-900">DVR-HDD-01 (CP Plus Orange DVR)</h3>
            <p className="text-xs text-slate-500 font-mono">
              Seagate Surveillance 500GB Physical Dump (EV-003)
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs flex-wrap">
            <span className="px-2.5 py-1 bg-slate-100 rounded text-slate-700 font-semibold">
              {language === 'hi' ? 'पहचाने गए: 4 विभाजन' : 'Detected: 4 Partitions'}
            </span>
            <span className="px-2.5 py-1 bg-teal-100 text-teal-800 rounded font-semibold">
              {language === 'hi' ? '37 पुनर्प्राप्ति योग्य अंश' : '37 Recoverable Fragments'}
            </span>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded font-bold">
              {language === 'hi' ? '29 पुनर्प्राप्त' : '29 Recovered'}
            </span>
            <span className="px-2.5 py-1 bg-rose-100 text-rose-800 rounded font-bold">
              {language === 'hi' ? '8 अप्राप्य' : '8 Unrecoverable'}
            </span>
          </div>
        </div>

        {/* 4 Partition Rows */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {partitions.map((part) => (
            <div
              key={part.id}
              className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] font-bold text-slate-500">
                    {part.id.toUpperCase()}
                  </span>
                  <span
                    className={`text-[9px] font-mono px-1 py-0.2 rounded font-bold ${
                      part.status === 'Healthy'
                        ? 'bg-emerald-100 text-emerald-800'
                        : part.status === 'Fragmented'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-200 text-slate-800'
                    }`}
                  >
                    {getLocalizedPartitionStatus(part.status)}
                  </span>
                </div>
                <p className="font-bold text-slate-900 line-clamp-1">{part.name}</p>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">{part.filesystem}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between font-mono text-[11px]">
                <span className="text-slate-500">{part.size}</span>
                <span className="font-bold text-slate-800">
                  {part.recoverableCount} {language === 'hi' ? 'फ़ाइलें निकाली गईं' : 'Files Carved'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carved Video Fragment Inventory Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {language === 'hi'
                ? `पुनर्प्राप्त वीडियो अंश सूची (${recoveryFragments.length} फ़ाइलें)`
                : `Recovered Surveillance Stream Fragments (${recoveryFragments.length} Items)`}
            </h3>
            <p className="text-[11px] text-slate-500">
              {language === 'hi'
                ? 'रिकवरी स्कैन संपन्न। विश्लेषण के लिए 29 साक्ष्य अंशों की पहचान की गई।'
                : 'Recovery scan completed. 29 sample evidence fragments were identified for analysis.'}
            </p>
          </div>
          <button
            onClick={() => setScanModalOpen(true)}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 font-mono cursor-pointer"
          >
            <span>{language === 'hi' ? 'अनएलोकेटेड क्लस्टर स्कैन करें' : 'Scan unallocated clusters'}</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">{t.tblFragmentId}</th>
                <th className="py-2.5 px-3">{t.tblCarvedFileName}</th>
                <th className="py-2.5 px-3">{t.tblEstimatedTime}</th>
                <th className="py-2.5 px-3">{t.tblCarvedSize}</th>
                <th className="py-2.5 px-3">{t.tblCodecHeader}</th>
                <th className="py-2.5 px-3">{t.tblCarveStatus}</th>
                <th className="py-2.5 px-3 text-right">{t.tblAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {recoveryFragments.map((frag) => (
                <tr key={frag.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-slate-900">{frag.id}</td>
                  <td className="py-2.5 px-3 font-sans text-slate-800 font-semibold">{frag.fileName}</td>
                  <td className="py-2.5 px-3 text-slate-600">{frag.estimatedTimestamp}</td>
                  <td className="py-2.5 px-3 text-slate-600">{frag.size}</td>
                  <td className="py-2.5 px-3 text-teal-700 font-bold">{frag.codec}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded font-sans text-[10px] font-bold ${
                        frag.status === 'Recovered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : frag.status === 'Corrupted' || frag.status === 'Unrecoverable'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {getLocalizedCarveStatus(frag.status)}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => setInspectedFragment(frag)}
                      className="px-2.5 py-1 text-[11px] font-sans font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded border border-slate-300 transition-colors cursor-pointer"
                    >
                      {t.tblInspect}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Carve Fragment Detail Modal */}
      {inspectedFragment && (
        <Modal
          isOpen={true}
          onClose={() => setInspectedFragment(null)}
          title={language === 'hi' ? 'पुनर्प्राप्त फ़ाइल अंश विवरण' : 'Carved Video Fragment Inspection'}
          subtitle={`Fragment ID: ${inspectedFragment.id} · ${inspectedFragment.fileName}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200 font-mono">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {language === 'hi' ? 'अनुमानित समय' : 'Estimated Time'}
                </span>
                <span className="font-bold text-slate-900">{inspectedFragment.estimatedTimestamp}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {language === 'hi' ? 'साक्ष्य स्थिति' : 'Carve Status'}
                </span>
                <span className="font-bold text-emerald-700">{getLocalizedCarveStatus(inspectedFragment.status)}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {language === 'hi' ? 'कोडेक प्रारूप' : 'Codec / Container'}
                </span>
                <span className="font-bold text-teal-800">{inspectedFragment.codec}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {language === 'hi' ? 'फ़ाइल आकार' : 'Carved Size'}
                </span>
                <span className="text-slate-800">{inspectedFragment.size}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {language === 'hi' ? 'क्षेत्र सेक्टर पता' : 'LBA Sector Cluster'}
                </span>
                <span className="text-slate-800 break-all">{inspectedFragment.sectorRange}</span>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded text-blue-900 space-y-1">
              <span className="font-bold block">
                {language === 'hi' ? 'NAL स्ट्रीम विनिर्देश:' : 'NAL Stream Parsing Specs:'}
              </span>
              <p className="text-[11px] leading-relaxed">
                {language === 'hi'
                  ? 'SPS (0x67) और PPS (0x68) हेडर को अनएलोकेटेड क्लस्टर से सफलतापूर्वक निकाला गया है। आई-फ़्रेम इंडेक्स को फिर से संगठित कर प्लेबैक और समयरेखा संरेखण के लिए तैयार कर दिया गया है।'
                  : 'SPS (0x67) and PPS (0x68) parameter sets were successfully extracted from unallocated cluster boundaries. Keyframe cadence re-indexed for playback and timeline alignment.'}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                onClick={() => setInspectedFragment(null)}
                className="px-4 py-1.5 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 rounded font-semibold"
              >
                {t.closeBtn}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Recovery Scan Simulator Modal */}
      <RecoveryScanModal
        isOpen={scanModalOpen}
        onClose={() => setScanModalOpen(false)}
      />
    </div>
  );
};
