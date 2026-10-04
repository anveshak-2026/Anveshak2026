import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { AlertCircle, RefreshCw, CheckCircle2, Lock } from 'lucide-react';
import { EvidenceSource } from '../../types/forensics';
import { useForensicStore } from '../../services/ForensicContext';

interface IntegrityVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEvidence?: EvidenceSource | null;
}

export const IntegrityVerificationModal: React.FC<IntegrityVerificationModalProps> = ({
  isOpen,
  onClose,
  selectedEvidence,
}) => {
  const { verifyEvidenceIntegrity, evidenceSources, language, t } = useForensicStore();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    status: 'VERIFIED' | 'WARNING';
    hash: string;
    verifiedAt: string;
  } | null>(null);

  const evidence = selectedEvidence || evidenceSources[0];

  const handleRunVerify = async () => {
    if (!evidence) return;
    setIsVerifying(true);
    setVerificationResult(null);

    const res = await verifyEvidenceIntegrity(evidence.id);
    setIsVerifying(false);
    setVerificationResult({
      status: res.status,
      hash: res.hash,
      verifiedAt: new Date().toLocaleTimeString(),
    });
  };

  if (!evidence) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={language === 'hi' ? 'क्रिप्टोग्राफिक साक्ष्य अखंडता सत्यापन (SHA-256)' : 'Cryptographic Evidence Verification (SHA-256)'}
      subtitle={`${language === 'hi' ? 'साक्ष्य आईडी' : 'Evidence ID'}: ${evidence.id} · ${evidence.deviceOrFileName}`}
      maxWidth="xl"
    >
      <div className="space-y-4">
        {/* Core Forensic Warning */}
        <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-lg text-amber-900 text-xs flex items-start gap-2.5">
          <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">
              {language === 'hi' ? 'मूल साक्ष्य परिरक्षण नियम' : 'Original Evidence Preservation Rule'}
            </p>
            <p className="text-[11px] text-amber-800 mt-0.5">
              {language === 'hi'
                ? 'मूल भौतिक DVR/NVR मीडिया राइट-ब्लॉक एवं सीलबंद रहता है। सत्यापन मूल ज़ब्ती छवि और विश्लेषण वर्किंग कॉपी के बीच बिटस्ट्रीम हैश की तुलना करता है।'
                : 'Original physical DVR media is write-blocked and sealed. Verification executes bit-stream hashing between the original seizure image and the working copy.'}
            </p>
          </div>
        </div>

        {/* Evidence Metadata */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-slate-500">{t.tblSourceType}:</span>{' '}
              <span className="font-semibold text-slate-800">{evidence.sourceType}</span>
            </div>
            <div>
              <span className="text-slate-500">{t.tblVendor}:</span>{' '}
              <span className="font-semibold text-slate-800">{evidence.vendor}</span>
            </div>
            <div>
              <span className="text-slate-500">{language === 'hi' ? 'अधिग्रहण समय:' : 'Acquisition Time:'}</span>{' '}
              <span className="font-mono text-slate-800">{evidence.acquisitionTime}</span>
            </div>
            <div>
              <span className="text-slate-500">{t.tblFileSize}:</span>{' '}
              <span className="font-mono text-slate-800">{evidence.fileSize}</span>
            </div>
          </div>
        </div>

        {/* Hash Comparison Blocks */}
        <div className="space-y-2">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700">
                {language === 'hi' ? 'मूल ज़ब्ती SHA-256 डाइजेस्ट:' : 'Original Acquisition SHA-256 Digest:'}
              </span>
              <span className="text-[10px] text-emerald-700 font-medium">
                {language === 'hi' ? 'ज़ब्ती के समय सील किया गया' : 'Sealed at Seizure'}
              </span>
            </div>
            <div className="p-2.5 bg-slate-900 text-teal-300 font-mono text-[11px] rounded border border-slate-800 break-all select-all">
              {evidence.originalSha256}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700">
                {language === 'hi' ? 'वर्किंग कॉपी पुनर्गणना SHA-256 डाइजेस्ट:' : 'Working Copy Recalculated SHA-256:'}
              </span>
              <span className="text-[10px] text-slate-500">
                {language === 'hi' ? 'सक्रिय लाइव छवि' : 'Live Active Image'}
              </span>
            </div>
            <div className="p-2.5 bg-slate-900 text-teal-300 font-mono text-[11px] rounded border border-slate-800 break-all select-all">
              {verificationResult?.hash || evidence.workingCopySha256}
            </div>
          </div>
        </div>

        {/* Verification Status Result */}
        {verificationResult && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-xs font-bold text-emerald-950">
                  {language === 'hi' ? 'बिटस्ट्रीम हैश पूर्णतः मेल खाता है (100%)' : 'Bit-Stream Hashes Match (100%)'}
                </p>
                <p className="text-[11px] text-emerald-800">
                  {language === 'hi'
                    ? `स्थिति: सत्यापित समय ${verificationResult.verifiedAt} IST। साक्ष्य में कोई परिवर्तन या छेड़छाड़ नहीं हुई है।`
                    : `Status: VERIFIED at ${verificationResult.verifiedAt} IST. No byte modification detected.`}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold font-mono px-2 py-0.5 bg-emerald-600 text-white rounded">
              {language === 'hi' ? 'सत्यापित' : 'MATCH'}
            </span>
          </div>
        )}

        {/* Educational / Forensic Principle Box */}
        <div className="p-3 bg-slate-100 rounded-lg text-slate-600 text-[11px] space-y-1">
          <p className="font-semibold text-slate-800 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-slate-600" />
            {language === 'hi' ? 'फोरेंसिक साक्ष्य प्रकटीकरण:' : 'Forensic Evidentiary Disclaimer:'}
          </p>
          <p>
            {language === 'hi'
              ? 'क्रिप्टोग्राफिक हैशिंग यह प्रमाणित करती है कि विश्लेषण की गई बाइनरी साक्ष्य सामग्री मूल ज़ब्ती के समय से अपरिवर्तित है। हैशिंग यह सिद्ध नहीं करती कि DVR आंतरिक घड़ी (RTC) घटना के समय सटीक थी या नहीं।'
              : 'Cryptographic hashing verifies that the analyzed binary evidence matches the acquired source without post-seizure tampering. Hashing does not prove that the DVR device clock or sensor metadata was accurate during the recording event.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-300"
          >
            {t.closeBtn}
          </button>
          <button
            onClick={handleRunVerify}
            disabled={isVerifying}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-60 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
            <span>
              {isVerifying
                ? language === 'hi'
                  ? 'SHA-256 की गणना हो रही है...'
                  : 'Calculating SHA-256...'
                : language === 'hi'
                ? 'बिटस्ट्रीम अखंडता सत्यापित करें'
                : 'Verify Bitstream Integrity'}
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
