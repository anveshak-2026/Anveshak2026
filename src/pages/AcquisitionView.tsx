import React, { useState } from 'react';
import {
  HardDriveDownload,
  Plus,
  Lock,
  ArrowRight,
  AlertTriangle,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';
import { useForensicStore } from '../services/ForensicContext';
import { EvidenceSource, SourceType, VendorType } from '../types/forensics';
import { StatusBadge } from '../components/common/StatusBadge';
import { Modal } from '../components/common/Modal';
import { IntegrityVerificationModal } from '../components/forensics/IntegrityVerificationModal';

export const AcquisitionView: React.FC = () => {
  const {
    evidenceSources,
    importEvidenceSource,
    verifyAllEvidence,
    openExplainer,
    setActiveTab,
    language,
    t,
  } = useForensicStore();

  const [importModalOpen, setImportModalOpen] = useState(false);
  const [selectedForVerify, setSelectedForVerify] = useState<EvidenceSource | null>(null);

  // Import form state
  const [sourceType, setSourceType] = useState<SourceType>('DVR Export');
  const [vendor, setVendor] = useState<VendorType>('Hikvision');
  const [fileName, setFileName] = useState('HIK_DS7216_RAW_CH05-08.mp4');
  const [fileSize, setFileSize] = useState('18.4 GB');
  const [format, setFormat] = useState('MP4 / H.264');
  const [channelCount, setChannelCount] = useState(4);
  const [notes, setNotes] = useState(
    language === 'hi'
      ? 'घटनास्थल पर लगे DVR से राइट-ब्लॉक्ड फोरेंसिक ब्रिज के माध्यम से अधिग्रहित।'
      : 'Acquired via write-blocked forensic bridge from onsite DVR unit.'
  );

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    importEvidenceSource({
      sourceType,
      vendor,
      deviceOrFileName: fileName,
      fileSize,
      format,
      channelCount,
      notes,
    });
    setImportModalOpen(false);
  };

  const handleExplainAcquisition = () => {
    openExplainer({
      title: language === 'hi' ? 'साक्ष्य अधिग्रहण कैसे काम करता है?' : 'How Evidence Acquisition Works',
      subtitle: 'Standardized Ingestion · ISO/IEC 27037',
      whatItIs: language === 'hi'
        ? 'विभिन्न निर्माताओं (Hikvision, Dahua, CP Plus, Axis) के DVR/NVR से प्राप्त वीडियो साक्ष्य को एक सुरक्षित वर्किंग कॉपी में व्यवस्थित करता है।'
        : 'Imports and structures surveillance evidence obtained from diverse DVR/NVR hardware while isolating original physical media.',
      whatInvestigatorDoes: language === 'hi'
        ? 'साक्ष्य का स्रोत प्रकार और हार्डवेयर वेंडर चुनकर इनपुट दें और हैश उत्पन्न करें।'
        : 'Select the storage source type, identify the hardware vendor, and generate a verified SHA-256 cryptographic digest.',
      whatHappensNext: language === 'hi'
        ? 'मूल साक्ष्य लॉक हो जाता है और विश्लेषण के लिए बिट-स्ट्रीम वर्किंग कॉपी उपलब्ध होती है।'
        : 'The original disk remains write-blocked. A bitstream working copy is mounted for analysis and recovery.',
      nextStepTab: 'recovery',
      nextStepLabel: language === 'hi' ? 'अगला चरण: साक्ष्य पुनर्प्राप्ति' : 'Next Step: Proceed to Recovery',
    });
  };

  const getLocalizedSourceType = (st: string) => {
    if (language !== 'hi') return st;
    switch (st) {
      case 'DVR Export':
        return 'DVR निर्यात';
      case 'NVR Export':
        return 'NVR निर्यात';
      case 'HDD Image':
        return 'HDD डिस्क इमेज';
      case 'Video File':
        return 'वीडियो फ़ाइल';
      case 'USB Evidence':
        return 'USB साक्ष्य';
      case 'Network Camera Export':
        return 'नेटवर्क कैमरा निर्यात';
      default:
        return st;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Self-Explanation */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <HardDriveDownload className="w-5 h-5 text-teal-700" />
            <h2 className="text-base font-bold uppercase tracking-wider text-slate-900">
              {t.acquisitionTitle}
            </h2>
            <button
              onClick={handleExplainAcquisition}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t.howItWorks}</span>
            </button>
          </div>
          <p className="text-xs text-slate-600 mt-1 font-medium max-w-3xl">
            {t.acquisitionExplanation}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => verifyAllEvidence()}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>{t.btnVerifyAllHashes}</span>
          </button>
          <button
            onClick={() => setImportModalOpen(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t.btnIngestSource}</span>
          </button>
        </div>
      </div>

      {/* Step-by-Step Acquisition Flow */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold font-mono uppercase tracking-wider">
            <Lock className="w-4 h-4 text-teal-400" />
            <span>
              {language === 'hi'
                ? 'मानकीकृत 6-चरणीय साक्ष्य अधिग्रहण प्रवाह'
                : 'Standardized 6-Step Evidence Ingestion Flow'}
            </span>
          </div>
          <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
            ISO/IEC 27037 Standard
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          <div className="p-3 bg-slate-800 rounded border border-slate-700">
            <span className="text-[10px] font-mono text-teal-400 font-bold block">
              {language === 'hi' ? 'चरण 1' : 'STEP 1'}
            </span>
            <p className="font-bold text-slate-100 mt-1">
              {language === 'hi' ? 'स्रोत का चयन' : 'Select Source'}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">DVR / NVR / HDD / USB</p>
          </div>

          <div className="p-3 bg-slate-800 rounded border border-slate-700">
            <span className="text-[10px] font-mono text-teal-400 font-bold block">
              {language === 'hi' ? 'चरण 2' : 'STEP 2'}
            </span>
            <p className="font-bold text-slate-100 mt-1">
              {language === 'hi' ? 'वेंडर पहचान' : 'Select Vendor'}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">Hikvision, Dahua, CP Plus</p>
          </div>

          <div className="p-3 bg-slate-800 rounded border border-slate-700">
            <span className="text-[10px] font-mono text-teal-400 font-bold block">
              {language === 'hi' ? 'चरण 3' : 'STEP 3'}
            </span>
            <p className="font-bold text-slate-100 mt-1">
              {language === 'hi' ? 'साक्ष्य आयात' : 'Import Evidence'}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {language === 'hi' ? 'मेटाडेटा एवं कोडेक निष्कर्षण' : 'Extract metadata & specs'}
            </p>
          </div>

          <div className="p-3 bg-slate-800 rounded border border-slate-700">
            <span className="text-[10px] font-mono text-teal-400 font-bold block">
              {language === 'hi' ? 'चरण 4' : 'STEP 4'}
            </span>
            <p className="font-bold text-slate-100 mt-1">
              {language === 'hi' ? 'हैश निर्माण' : 'Generate Hash'}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">SHA-256 Bitstream</p>
          </div>

          <div className="p-3 bg-slate-800 rounded border border-slate-700">
            <span className="text-[10px] font-mono text-teal-400 font-bold block">
              {language === 'hi' ? 'चरण 5' : 'STEP 5'}
            </span>
            <p className="font-bold text-slate-100 mt-1">
              {language === 'hi' ? 'बिटस्ट्रीम सत्यापन' : 'Verify Bitstream'}
            </p>
            <p className="text-[10px] text-emerald-400 mt-0.5">
              {language === 'hi' ? '100% सटीक मिलान' : '100% Bitstream Match'}
            </p>
          </div>

          <div className="p-3 bg-teal-950/80 rounded border border-teal-700">
            <span className="text-[10px] font-mono text-teal-300 font-bold block">
              {language === 'hi' ? 'चरण 6' : 'STEP 6'}
            </span>
            <p className="font-bold text-teal-100 mt-1">
              {language === 'hi' ? 'कार्य प्रतिलिपि' : 'Working Copy'}
            </p>
            <p className="text-[10px] text-teal-300 mt-0.5">
              {language === 'hi' ? 'मूल लॉक; प्रतिलिपि में कार्य' : 'Original write-blocked'}
            </p>
          </div>
        </div>

        {/* Explicit Warning Callout */}
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center justify-between text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <p>{t.workingCopyNotice}</p>
          </div>
          <button
            onClick={() => setActiveTab('recovery')}
            className="hidden sm:flex items-center gap-1 font-bold text-teal-300 hover:text-teal-200 cursor-pointer"
          >
            <span>{t.nextStep}: {t.navRecovery}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Primary Evidence Sources Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            {language === 'hi'
              ? `आयातित साक्ष्य सूची (${evidenceSources.length} स्रोत)`
              : `Acquired Surveillance Evidence Inventory (${evidenceSources.length} Feeds)`}
          </h3>
          <span className="text-[11px] font-mono text-slate-500">
            {language === 'hi' ? 'अखंडता जांचने के लिए सत्यापित करें पर क्लिक करें' : 'Click "Verify" to compare SHA-256 bitstream'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">{t.tblEvidenceId}</th>
                <th className="py-2.5 px-3">{t.tblSourceType}</th>
                <th className="py-2.5 px-3">{t.tblVendor}</th>
                <th className="py-2.5 px-3">{t.tblFileName}</th>
                <th className="py-2.5 px-3">{t.tblFileSize}</th>
                <th className="py-2.5 px-3">{t.tblHash}</th>
                <th className="py-2.5 px-3">{t.tblIntegrity}</th>
                <th className="py-2.5 px-3 text-right">{t.tblAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {evidenceSources.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-slate-900">{ev.id}</td>
                  <td className="py-2.5 px-3 font-sans text-slate-700">
                    {getLocalizedSourceType(ev.sourceType)}
                  </td>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-800">
                    <span className="px-2 py-0.5 bg-slate-100 rounded border border-slate-200">
                      {ev.vendor}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-900 font-semibold truncate max-w-[180px]">
                    {ev.deviceOrFileName}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">{ev.fileSize}</td>
                  <td className="py-2.5 px-3 text-slate-500 truncate max-w-[140px]" title={ev.originalSha256}>
                    {ev.originalSha256.substring(0, 16)}...
                  </td>
                  <td className="py-2.5 px-3">
                    <StatusBadge status={ev.integrityStatus} size="sm" />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => setSelectedForVerify(ev)}
                      className="px-2.5 py-1 text-[11px] font-sans font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded border border-teal-200 transition-colors cursor-pointer"
                    >
                      {t.btnVerifyIntegrity}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vendor & Format Detection Module */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {t.vendorDetectionTitle}
            </h3>
            <p className="text-xs text-slate-500">
              {t.vendorDetectionSubtitle}
            </p>
          </div>
          <span className="text-[11px] font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 font-semibold">
            {language === 'hi' ? 'मानक सामान्यीकरण' : 'Standard Normalizer'}
          </span>
        </div>

        <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2 px-3">{t.tblEvidenceStream}</th>
                <th className="py-2 px-3">{t.tblDetectedVendor}</th>
                <th className="py-2 px-3">{t.tblNativeFormat}</th>
                <th className="py-2 px-3">{t.tblMetadataIndex}</th>
                <th className="py-2 px-3">{t.tblStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              <tr className="hover:bg-slate-50">
                <td className="py-2 px-3 font-bold text-slate-900">CAM01_EXPORT</td>
                <td className="py-2 px-3 font-sans font-medium text-slate-800">Hikvision</td>
                <td className="py-2 px-3 text-slate-700">MP4 (HIK-FS Header)</td>
                <td className="py-2 px-3 text-emerald-700 font-sans">
                  {language === 'hi' ? 'उपलब्ध (I-फ़्रेम तालिका अक्षुण्ण)' : 'Available (I-frame table intact)'}
                </td>
                <td className="py-2 px-3 font-sans font-bold text-emerald-800">
                  {t.statusDetected}
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2 px-3 font-bold text-slate-900">CAM02_EXPORT</td>
                <td className="py-2 px-3 font-sans font-medium text-slate-800">Dahua</td>
                <td className="py-2 px-3 text-slate-700">DAV (DHFS Proprietary)</td>
                <td className="py-2 px-3 text-amber-700 font-sans">
                  {language === 'hi' ? 'आंशिक (ट्रेलर इंडेक्स अनुपलब्ध)' : 'Partial (Missing trailer index)'}
                </td>
                <td className="py-2 px-3 font-sans font-bold text-emerald-800">
                  {t.statusDetected}
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2 px-3 font-bold text-slate-900">CAM03_EXPORT</td>
                <td className="py-2 px-3 font-sans font-medium text-slate-800">CP Plus</td>
                <td className="py-2 px-3 text-slate-700">AVI / RAW Cluster Carve</td>
                <td className="py-2 px-3 text-emerald-700 font-sans">
                  {language === 'hi' ? 'उपलब्ध (टाइमकोड अंतर्निहित)' : 'Available (Timecode embedded)'}
                </td>
                <td className="py-2 px-3 font-sans font-bold text-emerald-800">
                  {t.statusDetected}
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2 px-3 font-bold text-slate-900">CAM04_STREAM</td>
                <td className="py-2 px-3 font-sans font-medium text-slate-800">Axis</td>
                <td className="py-2 px-3 text-slate-700">MKV / H.265 RTSP Dump</td>
                <td className="py-2 px-3 text-emerald-700 font-sans">
                  {language === 'hi' ? 'उपलब्ध (NTP सिंक्रनाइज़्ड)' : 'Available (NTP synchronized)'}
                </td>
                <td className="py-2 px-3 font-sans font-bold text-emerald-800">
                  {t.statusDetected}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Ingest Modal */}
      <Modal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        title={t.modalIngestTitle}
        subtitle={t.modalIngestSubtitle}
        maxWidth="md"
      >
        <form onSubmit={handleImportSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">{t.lblSourceType}:</label>
            <select
              value={sourceType}
              onChange={(e) => setSourceType(e.target.value as SourceType)}
              className="w-full p-2 border border-slate-300 rounded text-xs bg-white"
            >
              <option value="DVR Export">{language === 'hi' ? 'DVR निर्यात' : 'DVR Export'}</option>
              <option value="NVR Export">{language === 'hi' ? 'NVR निर्यात' : 'NVR Export'}</option>
              <option value="HDD Image">{language === 'hi' ? 'HDD डिस्क इमेज (E01 / RAW)' : 'HDD Image (E01 / RAW)'}</option>
              <option value="Video File">{language === 'hi' ? 'वीडियो फ़ाइल' : 'Video File'}</option>
              <option value="USB Evidence">{language === 'hi' ? 'USB साक्ष्य' : 'USB Evidence'}</option>
              <option value="Network Camera Export">{language === 'hi' ? 'नेटवर्क कैमरा निर्यात' : 'Network Camera Export'}</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">{t.lblDetectedVendor}:</label>
            <select
              value={vendor}
              onChange={(e) => setVendor(e.target.value as VendorType)}
              className="w-full p-2 border border-slate-300 rounded text-xs bg-white"
            >
              <option value="Hikvision">Hikvision</option>
              <option value="Dahua">Dahua</option>
              <option value="CP Plus">CP Plus</option>
              <option value="Axis">Axis</option>
              <option value="Generic DVR/NVR">{language === 'hi' ? 'सामान्य DVR/NVR' : 'Generic DVR/NVR'}</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">{t.lblFileName}:</label>
            <input
              type="text"
              required
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded text-xs font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">{t.lblFileSize}:</label>
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">{t.lblVideoFormat}:</label>
              <input
                type="text"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">{t.lblChannelCount}:</label>
            <input
              type="number"
              min={1}
              max={64}
              value={channelCount}
              onChange={(e) => setChannelCount(Number(e.target.value))}
              className="w-full p-2 border border-slate-300 rounded text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">{t.lblAcquisitionNotes}:</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setImportModalOpen(false)}
              className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded text-xs"
            >
              {t.cancelBtn}
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded text-xs cursor-pointer shadow-xs"
            >
              {t.modalIngestSubmit}
            </button>
          </div>
        </form>
      </Modal>

      {/* Verification Modal */}
      {selectedForVerify && (
        <IntegrityVerificationModal
          isOpen={true}
          onClose={() => setSelectedForVerify(null)}
          selectedEvidence={selectedForVerify}
        />
      )}
    </div>
  );
};
