import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Camera,
  Layers,
  FileText,
  Activity,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';
import { useForensicStore } from '../../services/ForensicContext';
import { StatusBadge } from '../common/StatusBadge';
import { EvidenceClassification } from '../../types/forensics';

export const VideoPlayerSimulation: React.FC = () => {
  const { cameras, timelineEvents, addInvestigatorNote, language, t } = useForensicStore();
  const [selectedCamId, setSelectedCamId] = useState<string>('cam-03');
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<
    'video' | 'metadata' | 'events' | 'motion' | 'objects' | 'audio' | 'correlation'
  >('video');

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [currentFrame, setCurrentFrame] = useState<number>(1420);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState<boolean>(true);

  // New Note state
  const [noteText, setNoteText] = useState('');
  const [noteTag, setNoteTag] = useState<EvidenceClassification>('SUPPORTED');
  const [noteSaved, setNoteSaved] = useState(false);

  const selectedCam = cameras.find((c) => c.id === selectedCamId) || cameras[0];
  const camEvents = timelineEvents.filter((e) => e.cameraCode === selectedCam.code);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    addInvestigatorNote({
      evidenceId: `${selectedCam.code} (${selectedCam.name})`,
      category: 'Observation',
      note: noteText,
      classificationTag: noteTag,
    });

    setNoteText('');
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2500);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
      {/* Top Camera Selector Strip */}
      <div className="p-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-teal-700" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
            {t.feedInspectionLabel}
          </span>
          <div className="flex items-center gap-1">
            {cameras.map((cam) => (
              <button
                key={cam.id}
                onClick={() => setSelectedCamId(cam.id)}
                className={`px-2.5 py-1 text-xs font-mono font-medium rounded transition-colors cursor-pointer ${
                  selectedCamId === cam.id
                    ? 'bg-slate-900 text-teal-300 font-bold'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cam.code}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs font-mono text-slate-600 flex items-center gap-2">
          <span>{selectedCam.name}</span>
          <span>·</span>
          <span>{selectedCam.resolution}</span>
        </div>
      </div>

      {/* Main Forensic Player / Canvas Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Left 2 Cols: Simulated Video Display with On-Screen Forensic Overlays */}
        <div className="lg:col-span-2 bg-slate-950 p-4 relative flex flex-col justify-between min-h-[380px]">
          {/* Header Overlay in Video */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-300 z-10 pointer-events-none">
            <div className="bg-black/70 px-2.5 py-1 rounded border border-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-teal-400">{selectedCam.code}</span>
              <span>·</span>
              <span>{selectedCam.name}</span>
            </div>
            <div className="bg-black/70 px-2.5 py-1 rounded border border-slate-800 text-slate-200 font-bold">
              2026-09-27 18:04:12.480 IST
            </div>
          </div>

          {/* Central Surveillance Frame Simulation */}
          <div className="relative flex-1 my-4 flex items-center justify-center">
            {/* Visual Grid representing camera sensor view */}
            <div className="w-full h-64 border border-slate-800 rounded bg-radial from-slate-900 via-slate-950 to-black relative overflow-hidden flex items-center justify-center">
              {/* Surveillance crosshair overlay */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:40px_40px]" />

              {/* Watermark notice */}
              <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-400 bg-black/80 px-2 py-0.5 rounded border border-slate-700">
                {language === 'hi' ? 'बिटस्ट्रीम कार्य प्रतिलिपि · राइट-ब्लॉक्ड' : 'BITSTREAM WORKING COPY · WRITE-BLOCKED'}
              </div>

              {/* Target Bounding Box: Neutral terminology demonstration */}
              {showBoundingBoxes && (
                <div className="absolute w-36 h-48 border-2 border-teal-400 bg-teal-500/10 rounded flex flex-col justify-between p-1.5 pointer-events-none">
                  <div className="bg-slate-950/90 text-teal-300 border border-teal-500/50 px-1.5 py-0.5 text-[9px] font-mono rounded">
                    {language === 'hi' ? 'वस्तु #01: व्यक्ति जैसी गति' : 'OBJECT #01: Person-like movement'}
                    <span className="block text-[8px] text-slate-400">{t.confidenceDemoValue}</span>
                  </div>
                  <div className="text-[8px] font-mono text-teal-300 bg-black/80 px-1 py-0.5 rounded self-end">
                    {t.lumaDeltaLabel} +24%
                  </div>
                </div>
              )}

              {/* Center target indicator */}
              <div className="text-center pointer-events-none">
                <p className="text-xs font-mono text-slate-400">
                  {language === 'hi' ? 'निगरानी गलियारा लाइव स्ट्रीम' : 'Surveillance Corridor Stream Active'}
                </p>
                <p className="text-[11px] text-teal-400 font-mono mt-1">
                  {language === 'hi' ? `फ़्रेम: #${currentFrame} · कोडेक: H.264 High 4:2:0` : `Frame: #${currentFrame} · Codec: H.264 High 4:2:0`}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Video Controls Bar */}
          <div className="flex items-center justify-between text-xs text-slate-300 z-10 pt-2 border-t border-slate-800 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentFrame((f) => Math.max(0, f - 1))}
                className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white cursor-pointer"
                title={language === 'hi' ? 'पिछला फ़्रेम' : 'Previous Frame'}
              >
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded font-bold flex items-center gap-1 px-2.5 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? t.btnPause : t.btnPlay}</span>
              </button>
              <button
                onClick={() => setCurrentFrame((f) => f + 1)}
                className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white cursor-pointer"
                title={language === 'hi' ? 'अगला फ़्रेम' : 'Next Frame'}
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1 font-mono text-[11px] text-slate-400 ml-2">
                <span>{t.playbackSpeedLabel}</span>
                {[0.5, 1, 2, 4].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-1.5 py-0.5 rounded cursor-pointer ${
                      playbackSpeed === spd ? 'bg-slate-700 text-teal-300 font-bold' : 'hover:bg-slate-800'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showBoundingBoxes}
                  onChange={(e) => setShowBoundingBoxes(e.target.checked)}
                  className="rounded text-teal-500 focus:ring-0"
                />
                <span>{t.detectionOverlaysLabel}</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Col: Forensic Analysis Tabs & Investigator Notes */}
        <div className="border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col bg-slate-50/50">
          {/* Analysis Tabs */}
          <div className="flex border-b border-slate-200 overflow-x-auto bg-white text-xs font-medium">
            <button
              onClick={() => setActiveAnalysisTab('video')}
              className={`px-3 py-2.5 whitespace-nowrap border-b-2 cursor-pointer ${
                activeAnalysisTab === 'video'
                  ? 'border-teal-600 text-teal-800 font-bold bg-teal-50/30'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.tabInspection}
            </button>
            <button
              onClick={() => setActiveAnalysisTab('metadata')}
              className={`px-3 py-2.5 whitespace-nowrap border-b-2 cursor-pointer ${
                activeAnalysisTab === 'metadata'
                  ? 'border-teal-600 text-teal-800 font-bold bg-teal-50/30'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.tabMetadata}
            </button>
            <button
              onClick={() => setActiveAnalysisTab('correlation')}
              className={`px-3 py-2.5 whitespace-nowrap border-b-2 cursor-pointer ${
                activeAnalysisTab === 'correlation'
                  ? 'border-teal-600 text-teal-800 font-bold bg-teal-50/30'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.tabCrossCorrelation}
            </button>
            <button
              onClick={() => setActiveAnalysisTab('objects')}
              className={`px-3 py-2.5 whitespace-nowrap border-b-2 cursor-pointer ${
                activeAnalysisTab === 'objects'
                  ? 'border-teal-600 text-teal-800 font-bold bg-teal-50/30'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.tabObjects}
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="p-4 flex-1 overflow-y-auto space-y-3 text-xs">
            {activeAnalysisTab === 'video' && (
              <div className="space-y-3">
                <div className="p-3 bg-white rounded border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    {language === 'hi' ? 'सक्रिय कैमरा स्ट्रीम विनिर्देश' : 'Active Camera Stream Properties'}
                  </span>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[11px] text-slate-700">
                    <div>
                      <span className="text-slate-400">{language === 'hi' ? 'कैमरा:' : 'Camera:'}</span> {selectedCam.code}
                    </div>
                    <div>
                      <span className="text-slate-400">{language === 'hi' ? 'स्थान:' : 'Location:'}</span> {selectedCam.name}
                    </div>
                    <div>
                      <span className="text-slate-400">{language === 'hi' ? 'रेज़ोल्यूशन:' : 'Resolution:'}</span> {selectedCam.resolution}
                    </div>
                    <div>
                      <span className="text-slate-400">{language === 'hi' ? 'फ़्रेम दर:' : 'FPS:'}</span> {selectedCam.frameRate}
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400">{language === 'hi' ? 'घड़ी बहाव:' : 'Clock Offset:'}</span>{' '}
                      <span className="text-amber-700 font-bold">
                        {selectedCam.reportedClockOffsetSec > 0
                          ? `+${selectedCam.reportedClockOffsetSec}s`
                          : `${selectedCam.reportedClockOffsetSec}s`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    {language === 'hi' ? 'पहचानी गई घटनाएं' : 'Associated Timeline Events'}
                  </span>
                  <div className="space-y-1.5">
                    {camEvents.map((evt) => (
                      <div
                        key={evt.id}
                        className="p-2 bg-slate-50 rounded border border-slate-100 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold text-slate-900">{evt.eventDescription}</p>
                          <span className="font-mono text-[10px] text-slate-500">{evt.timestamp}</span>
                        </div>
                        <StatusBadge status={evt.classification} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeAnalysisTab === 'metadata' && (
              <div className="space-y-2 font-mono text-[11px] bg-white p-3 rounded border border-slate-200">
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-400">Container Wrapper:</span>
                  <span className="text-slate-800">ISO/IEC 14496-14 (MP4)</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-400">Video Encoding:</span>
                  <span className="text-slate-800">AVC / H.264 (Main@L4.1)</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-400">GOP Structure:</span>
                  <span className="text-slate-800">IBBPBBP (M=3, N=25)</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-400">PTS/DTS Timing:</span>
                  <span className="text-emerald-700 font-bold">Monotonic Continuous</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Integrity Check:</span>
                  <span className="text-emerald-700 font-bold">PASS (Hash Verified)</span>
                </div>
              </div>
            )}

            {activeAnalysisTab === 'correlation' && (
              <div className="p-3 bg-white rounded border border-slate-200 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  {language === 'hi' ? 'क्रॉस-कैमरा अस्थायी सहसंबंध' : 'Cross-Camera Temporal Correlation'}
                </span>
                <p className="text-slate-600 leading-snug">
                  {language === 'hi'
                    ? 'CAM 01 (उत्तर द्वार) और CAM 03 (गलियारा) 18:04:12 और 18:05:40 के बीच क्रमिक गति रिकॉर्ड करते हैं।'
                    : 'CAM 01 (North Gate) and CAM 03 (Corridor) record sequential activity between 18:04:12 and 18:05:40.'}
                </p>
                <div className="p-2 bg-teal-50 rounded border border-teal-200 text-teal-900 font-mono text-[11px]">
                  Δt = 88s elapsed · Directional Vector: Inbound
                </div>
              </div>
            )}

            {activeAnalysisTab === 'objects' && (
              <div className="p-3 bg-white rounded border border-slate-200 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  {language === 'hi' ? 'तटस्थ वस्तु वर्गीकरण' : 'Neutral Characterizations'}
                </span>
                <div className="space-y-1">
                  <div className="p-2 bg-slate-50 rounded">
                    <span className="font-mono text-teal-700 font-bold">OBJECT #01</span>
                    <p className="text-slate-700 mt-0.5">{language === 'hi' ? 'व्यक्ति जैसी गति' : 'Person-like movement pattern'}</p>
                  </div>
                  <div className="p-2 bg-slate-50 rounded">
                    <span className="font-mono text-teal-700 font-bold">OBJECT #02</span>
                    <p className="text-slate-700 mt-0.5">{language === 'hi' ? 'दरवाजे की स्थिति में परिवर्तन' : 'Aperture threshold variation'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Investigator Contemporaneous Note Entry Form */}
            <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-600">
                  {t.recordContemporaneousNote}
                </span>
                {noteSaved && (
                  <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {language === 'hi' ? 'सहेज लिया गया!' : 'Recorded!'}
                  </span>
                )}
              </div>

              <form onSubmit={handleAddNote} className="space-y-2">
                <textarea
                  rows={2}
                  required
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder={
                    language === 'hi'
                      ? 'तटस्थ फोरेंसिक अवलोकन लिखें (उदा. 18:04 पर आकृति का प्रवेश)...'
                      : 'Record contemporaneous observation using neutral terminology...'
                  }
                  className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-teal-500 focus:outline-hidden"
                />

                <div className="flex items-center justify-between gap-2">
                  <select
                    value={noteTag}
                    onChange={(e) => setNoteTag(e.target.value as EvidenceClassification)}
                    className="p-1.5 border border-slate-300 rounded text-[11px] bg-white"
                  >
                    <option value="CONFIRMED">{language === 'hi' ? 'पुष्ट साक्ष्य' : 'CONFIRMED'}</option>
                    <option value="SUPPORTED">{language === 'hi' ? 'समर्थित साक्ष्य' : 'SUPPORTED'}</option>
                    <option value="INFERENCE">{language === 'hi' ? 'विश्लेषणात्मक निष्कर्ष' : 'INFERENCE'}</option>
                    <option value="UNKNOWN">{language === 'hi' ? 'अज्ञात' : 'UNKNOWN'}</option>
                  </select>

                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold cursor-pointer"
                  >
                    {t.btnAddNote}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
