import React, { useState } from 'react';
import {
  Clock,
} from 'lucide-react';
import { useForensicStore } from '../../services/ForensicContext';
import { StatusBadge } from '../common/StatusBadge';
import { TimelineEvent } from '../../types/forensics';

export const UnifiedTimeline: React.FC = () => {
  const {
    cameras,
    timelineEvents,
    selectedTimelineTime,
    setSelectedTimelineTime,
    applyClockCorrection,
    setApplyClockCorrection,
    gaps,
    language,
    t,
  } = useForensicStore();

  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(
    timelineEvents[1] // CAM 02 Person detected by default
  );

  // Time range from 18:00:00 to 18:30:00 (1800 seconds)
  const timePoints = [
    { label: '18:00', seconds: 0 },
    { label: '18:05', seconds: 300 },
    { label: '18:10', seconds: 600 },
    { label: '18:15', seconds: 900 },
    { label: '18:20', seconds: 1200 },
    { label: '18:25', seconds: 1500 },
    { label: '18:30', seconds: 1800 },
  ];

  const timeToSeconds = (timeStr: string) => {
    const parts = timeStr.split(':').map(Number);
    if (parts.length < 2) return 135;
    const hours = parts[0];
    const mins = parts[1];
    const secs = parts[2] || 0;
    return (hours - 18) * 3600 + mins * 60 + secs;
  };

  const currentSeconds = Math.max(0, Math.min(1800, timeToSeconds(selectedTimelineTime)));

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    const mins = Math.floor(val / 60);
    const secs = val % 60;
    const formatted = `18:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    setSelectedTimelineTime(formatted);
  };

  const getLocalizedEventType = (type: string) => {
    if (language !== 'hi') return type;
    switch (type) {
      case 'Motion':
        return 'गतिविधि';
      case 'Person':
        return 'व्यक्ति जैसी गति';
      case 'Door State':
        return 'दरवाजा';
      case 'Object':
        return 'वस्तु';
      case 'Vehicle':
        return 'वाहन';
      default:
        return type;
    }
  };

  const getLocalizedCamStatus = (status: string) => {
    if (language !== 'hi') return status;
    if (status === 'Clock Drift') return 'घड़ी का अंतर';
    if (status === 'Gaps Detected') return 'अंतराल मिले';
    if (status === 'Normal') return 'सामान्य';
    return status;
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
      {/* Timeline Controls Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-700" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              {t.timelineTitle}
            </h3>
            <span className="text-[11px] font-mono bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-semibold">
              {language === 'hi' ? 'क्रॉस-कैमरा कालानुक्रमिक सिंक' : 'Cross-Camera Chronological Sync'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'hi'
              ? 'एकाधिक DVR प्रणालियों के वीडियो साक्ष्य को एक सत्यापित संदर्भ समय पर संरेखित करता है।'
              : 'Synchronizes video events across multiple proprietary DVR systems to a single verified reference time.'}
          </p>
        </div>

        {/* Sync Controls & Clock Offset Switch */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          <label className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 rounded-md cursor-pointer hover:bg-slate-50 select-none">
            <input
              type="checkbox"
              checked={applyClockCorrection}
              onChange={(e) => setApplyClockCorrection(e.target.checked)}
              className="rounded text-teal-600 focus:ring-teal-500"
            />
            <span className="font-medium text-slate-700">{t.hardwareRtcOffsetCheckbox}</span>
          </label>

          <div className="px-3 py-1.5 bg-slate-900 text-teal-300 font-mono font-bold rounded flex items-center gap-2">
            <span className="text-slate-400 font-normal">{t.cursorLabel}</span>
            <span>{selectedTimelineTime} IST</span>
          </div>
        </div>
      </div>

      {/* Interactive Horizontal Scrubber Strip */}
      <div className="p-4 border-b border-slate-200 bg-slate-900 text-white">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>{t.incidentStartLabel}</span>
          <span className="text-teal-400 font-bold">{t.synchronizedPlayheadLabel}</span>
          <span>{t.incidentEndLabel}</span>
        </div>

        {/* Range input */}
        <div className="relative py-2">
          <input
            type="range"
            min={0}
            max={1800}
            value={currentSeconds}
            onChange={handleSliderChange}
            className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
          />

          {/* Time markers on scrubber */}
          <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
            {timePoints.map((tp) => (
              <span key={tp.seconds}>{tp.label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Multi-Camera Channel Rows */}
      <div className="p-4 space-y-3 overflow-x-auto min-w-[700px]">
        {cameras.map((cam) => {
          const camEvents = timelineEvents.filter((e) => e.cameraCode === cam.code);
          const camGaps = gaps.filter((g) => g.cameraCode.includes(cam.code));

          return (
            <div
              key={cam.id}
              className="flex items-center border border-slate-200 rounded-lg bg-slate-50/70 p-2 hover:bg-slate-50 transition-colors"
            >
              {/* Channel Label & Hardware Specs */}
              <div className="w-56 shrink-0 pr-3 border-r border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-900">{cam.code}</span>
                  <span
                    className={`text-[9px] font-mono px-1 py-0.2 rounded font-semibold ${
                      cam.status === 'Clock Drift'
                        ? 'bg-amber-100 text-amber-800'
                        : cam.status === 'Gaps Detected'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {getLocalizedCamStatus(cam.status)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 font-medium truncate mt-0.5">
                  {cam.name}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono mt-0.5">
                  <span>{cam.resolution.split(' ')[0]}</span>
                  <span>·</span>
                  <span>{cam.frameRate} FPS</span>
                  {cam.reportedClockOffsetSec !== 0 && (
                    <span className="text-amber-700 font-bold">
                      {cam.reportedClockOffsetSec > 0 ? `+${cam.reportedClockOffsetSec}s` : `${cam.reportedClockOffsetSec}s`}
                    </span>
                  )}
                </div>
              </div>

              {/* Channel Timeline Strip */}
              <div className="flex-1 px-4 relative h-14 flex items-center bg-slate-100/90 rounded mx-2 overflow-hidden border border-slate-200">
                {/* Visual continuous recording bar */}
                <div className="absolute inset-x-0 h-4 bg-teal-800/20 rounded border border-teal-700/30" />

                {/* Evidence Gaps Visual Blocks */}
                {camGaps.map((gap) => (
                  <div
                    key={gap.id}
                    title={`Missing Footage: ${gap.durationMinutes} min gap (${gap.possibleReasonCategory})`}
                    className="absolute h-6 bg-rose-500/80 border border-rose-600 rounded text-[9px] font-mono text-white flex items-center justify-center px-2 cursor-pointer z-10 font-bold"
                    style={{ left: '46%', width: '18%' }}
                  >
                    {language === 'hi' ? 'अंतराल: 17 मिनट' : 'GAP: 17m'}
                  </div>
                ))}

                {/* Event Markers on Channel */}
                {camEvents.map((evt) => {
                  const evSec = timeToSeconds(evt.timestamp);
                  const pct = Math.max(2, Math.min(96, (evSec / 1800) * 100));
                  const isSelected = selectedEvent?.id === evt.id;

                  return (
                    <button
                      key={evt.id}
                      onClick={() => setSelectedEvent(evt)}
                      className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 px-2 py-1 rounded text-[10px] font-mono font-bold shadow-xs transition-transform hover:scale-110 flex items-center gap-1 cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-teal-300 ring-2 ring-teal-400'
                          : evt.eventType === 'Door State'
                          ? 'bg-amber-600 text-white'
                          : evt.eventType === 'Object'
                          ? 'bg-blue-600 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                      style={{ left: `${pct}%` }}
                    >
                      <span>{evt.timestamp}</span>
                      <span>·</span>
                      <span className="font-sans font-medium">{getLocalizedEventType(evt.eventType)}</span>
                    </button>
                  );
                })}

                {/* Live Playhead Line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-rose-600 z-30 pointer-events-none"
                  style={{ left: `${(currentSeconds / 1800) * 100}%` }}
                >
                  <div className="w-2 h-2 -ml-[3px] bg-rose-600 rounded-full" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Event Forensic Inspector */}
      {selectedEvent && (
        <div className="p-4 border-t border-slate-200 bg-slate-50/90">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-slate-900 text-teal-300 px-2 py-0.5 rounded">
                {selectedEvent.cameraCode} {language === 'hi' ? 'घटना विवरण' : 'Event Detail'}
              </span>
              <span className="text-xs font-mono font-semibold text-slate-900">
                {selectedEvent.displayTime}
              </span>
              <StatusBadge status={selectedEvent.classification} size="sm" />
            </div>

            <span className="text-[11px] text-slate-500">
              {language === 'hi' ? 'जांचकर्ता द्वारा सत्यापित:' : 'Investigator Verified:'}{' '}
              <strong className="text-slate-800">
                {selectedEvent.verifiedByInvestigator
                  ? (language === 'hi' ? 'हाँ (हस्ताक्षरित)' : 'Yes (Signed)')
                  : (language === 'hi' ? 'समीक्षा लंबित' : 'Pending Review')}
              </strong>
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-white p-3 rounded border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                {t.lblObservedEvent}
              </span>
              <p className="text-slate-800 leading-snug font-medium">
                {selectedEvent.eventDescription}
              </p>
            </div>

            <div className="bg-white p-3 rounded border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                {t.lblNeutralObject}
              </span>
              <p className="text-slate-900 font-semibold">{selectedEvent.neutralObjectTerm}</p>
              <p className="text-[10px] text-slate-500 mt-1">
                {language === 'hi'
                  ? 'शब्दावली वस्तुनिष्ठ फोरेंसिक निष्पक्ष मानकों का पालन करती है।'
                  : 'Terminology adheres to objective forensic non-prejudicial standards.'}
              </p>
            </div>

            <div className="bg-white p-3 rounded border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                {t.lblInvestigatorNote}
              </span>
              <p className="text-slate-700 italic">{selectedEvent.notes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
