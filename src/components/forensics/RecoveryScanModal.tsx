import React from 'react';
import { Modal } from '../common/Modal';
import { RotateCcw, AlertTriangle, Cpu } from 'lucide-react';
import { useForensicStore } from '../../services/ForensicContext';

interface RecoveryScanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecoveryScanModal: React.FC<RecoveryScanModalProps> = ({ isOpen, onClose }) => {
  const {
    runRecoveryScan,
    isScanningRecovery,
    recoveryScanProgress,
    partitions,
    language,
    t,
  } = useForensicStore();

  const handleStartScan = () => {
    runRecoveryScan();
  };

  const getLocalizedPartitionCondition = (status: string) => {
    if (language !== 'hi') return status;
    if (status === 'Healthy') return 'सामान्य / स्वस्थ';
    if (status === 'Fragmented') return 'खंडित';
    return status;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        language === 'hi'
          ? 'साक्ष्य पुनर्प्राप्ति केंद्र — फोरेंसिक सेक्टर कार्विंग'
          : 'Evidence Recovery Center — Forensic Sector Carving'
      }
      subtitle={
        language === 'hi'
          ? 'DVR प्रोप्राइटरी फ़ाइल सिस्टम अंश पुनर्निर्माण'
          : 'DVR Proprietary Filesystem Fragment Reconstruction'
      }
      maxWidth="2xl"
    >
      <div className="space-y-4">
        {/* Strict Anti-Deception Notice */}
        <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg text-amber-950 text-xs">
          <div className="flex items-center gap-2 font-bold mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{t.protoRecoveryNoticeHeader}</span>
          </div>
          <p className="text-[11px] text-amber-900 leading-relaxed">
            {t.protoRecoveryNoticeText}
          </p>
        </div>

        {/* Target Storage Device Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">
              {language === 'hi' ? 'लक्षित डिस्क:' : 'Target Disk:'}
            </span>
            <span className="font-mono font-bold text-slate-900">DVR-HDD-01 (465.8 GB)</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">
              {language === 'hi' ? 'पहचाने गए विभाजन:' : 'Detected Partitions:'}
            </span>
            <span className="font-mono font-bold text-slate-900">
              {language === 'hi' ? '4 विभाजन' : '4 Partitions'}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">
              {language === 'hi' ? 'कार्विंग अंश:' : 'Carve Fragments:'}
            </span>
            <span className="font-mono font-bold text-emerald-700">
              {language === 'hi' ? '37 स्ट्रीम ब्लॉक' : '37 Stream Blocks'}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">
              {language === 'hi' ? 'पुनर्प्राप्ति स्थिति:' : 'Carve Status:'}
            </span>
            <span className="font-mono font-bold text-blue-700">
              {isScanningRecovery
                ? language === 'hi'
                  ? `${recoveryScanProgress}% स्कैनिंग जारी`
                  : `${recoveryScanProgress}% Scanning`
                : language === 'hi'
                ? '29 पुनर्प्राप्त / 8 दूषित'
                : '29 Recovered / 8 Corrupt'}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-slate-900 text-slate-200 p-4 rounded-lg border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-2 text-teal-400">
              <Cpu className="w-3.5 h-3.5" />
              <span>
                {isScanningRecovery
                  ? language === 'hi'
                    ? `LBA सेक्टर 0x004F9000 की स्कैनिंग ... [${recoveryScanProgress}%]`
                    : `Scanning LBA Sectors 0x004F9000 ... [${recoveryScanProgress}%]`
                  : language === 'hi'
                  ? 'फोरेंसिक कार्व इंजन: स्टैंडबाय / तैयार'
                  : 'Forensic Carve Engine: Standby / Ready'}
              </span>
            </span>
            <span className="text-slate-400 tabular-nums">{recoveryScanProgress}%</span>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-teal-500 h-2 transition-all duration-300 ease-out"
              style={{ width: `${recoveryScanProgress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
            <span>{language === 'hi' ? 'हस्ताक्षर पैटर्न: SPS/PPS [0x00 00 00 01 67]' : 'Signature Pattern: SPS/PPS [0x00 00 00 01 67]'}</span>
            <span>{language === 'hi' ? 'लक्षित कोडेक: H.264 / H.265 / MJPEG' : 'Target Codecs: H.264 / H.265 / MJPEG'}</span>
          </div>
        </div>

        {/* Partition Details Table */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            {language === 'hi'
              ? 'पहचाने गए ड्राइव विभाजन एवं कार्विंग संभाव्यता'
              : 'Identified Drive Partitions & Carve Feasibility'}
          </h4>
          <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2 px-3">{language === 'hi' ? 'विभाजन' : 'Partition'}</th>
                  <th className="py-2 px-3">{language === 'hi' ? 'फ़ाइल सिस्टम' : 'Filesystem'}</th>
                  <th className="py-2 px-3">{language === 'hi' ? 'आकार' : 'Allocated Size'}</th>
                  <th className="py-2 px-3">{language === 'hi' ? 'स्थिति' : 'Condition'}</th>
                  <th className="py-2 px-3 text-right">{language === 'hi' ? 'निकाली गई फ़ाइलें' : 'Carved Files'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {partitions.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-sans font-medium text-slate-900">{p.name}</td>
                    <td className="py-2 px-3 text-slate-600">{p.filesystem}</td>
                    <td className="py-2 px-3 text-slate-600">{p.size}</td>
                    <td className="py-2 px-3">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-sans font-medium ${
                          p.status === 'Healthy'
                            ? 'bg-emerald-100 text-emerald-800'
                            : p.status === 'Fragmented'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-200 text-slate-800'
                        }`}
                      >
                        {getLocalizedPartitionCondition(p.status)}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right font-bold text-slate-900">
                      {p.recoverableCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
          <p className="text-[11px] text-slate-500 font-sans">
            {t.workingCopyNotice}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-300"
            >
              {t.closeBtn}
            </button>
            <button
              onClick={handleStartScan}
              disabled={isScanningRecovery}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors disabled:opacity-60 cursor-pointer shadow-xs"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isScanningRecovery ? 'animate-spin' : ''}`} />
              <span>
                {isScanningRecovery
                  ? language === 'hi'
                    ? 'गहन कार्विंग जारी है...'
                    : 'Executing Deep Carve...'
                  : language === 'hi'
                  ? 'रिकवरी स्कैन सिमुलेशन शुरू करें'
                  : 'Run Recovery Scan Simulation'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
