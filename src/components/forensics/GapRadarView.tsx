import React from 'react';
import { AlertOctagon, CheckCircle2, HardDrive } from 'lucide-react';
import { useForensicStore } from '../../services/ForensicContext';

export const GapRadarView: React.FC = () => {
  const { gaps, language, t } = useForensicStore();

  const reasonCategories = [
    {
      label: language === 'hi' ? 'कोई रिकॉर्डिंग नहीं मिली' : 'No recording detected',
      desc: language === 'hi' ? 'इस समय सीमा के दौरान DVR शेड्यूल या मोशन थ्रेशोल्ड निष्क्रिय था।' : 'DVR schedule or motion threshold was inactive during this timeframe.',
    },
    {
      label: language === 'hi' ? 'अधूरा निर्यात' : 'Export incomplete',
      desc: language === 'hi' ? 'ब्लॉक ट्रांसफर पूरा होने से पहले USB या ऑपरेटर बैकअप बंद हो गया हो सकता है।' : 'USB or operator backup may have terminated before block transfer concluded.',
    },
    {
      label: language === 'hi' ? 'स्टोरेज अनुपलब्ध' : 'Storage unavailable',
      desc: language === 'hi' ? 'ड्राइव भर गई, ख़राब सेक्टर, या डिस्क राइट क्यू बफ़र ओवरफ्लो।' : 'Drive full, bad sectors, or disk write queue buffer overflow.',
    },
    {
      label: language === 'hi' ? 'उपकरण ऑफ़लाइन' : 'Device offline',
      desc: language === 'hi' ? 'PoE बिजली हानि, नेटवर्क व्यवधान, या राउटर में कैमरा रिबूट दर्ज।' : 'PoE power loss, network transient, or camera reboot logged in router.',
    },
    {
      label: language === 'hi' ? 'प्रारूप अपठनीय' : 'Format unreadable',
      desc: language === 'hi' ? 'दूषित NAL कीफ़्रेम या अनइंडेक्स किया गया स्वामित्व कंटेनर सेक्टर।' : 'Corrupted NAL keyframe or unindexed proprietary container sector.',
    },
    {
      label: language === 'hi' ? 'जांच आवश्यक' : 'Requires investigation',
      desc: language === 'hi' ? 'वर्गीकरण स्थापित करने से पहले भौतिक हार्डवेयर परीक्षा आवश्यक है।' : 'Physical hardware examination needed before establishing classification.',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Principle Banner */}
      <div className="bg-rose-50/70 border border-rose-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertOctagon className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
          <div className="text-xs">
            <h4 className="font-bold text-rose-950 text-sm">
              {t.gapProtocolTitle}
            </h4>
            <p className="text-rose-900 mt-1 leading-relaxed">
              {t.gapProtocolDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Visual Camera Continuity Comparison: CAM 01 vs CAM 02 */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
            {t.continuityComparisonTitle}
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            {t.referenceIncidentWindow}
          </span>
        </div>

        {/* CAM 01 Continuous */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-slate-900">CAM 01 (North Gate)</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {language === 'hi' ? '17:00 – 18:00 (100% निरंतर रिकॉर्डिंग)' : '17:00 – 18:00 (100% Continuous Recording)'}
            </span>
          </div>
          <div className="w-full h-7 bg-emerald-100/90 rounded border border-emerald-300 flex items-center px-3 text-[10px] font-mono text-emerald-900 font-semibold">
            {language === 'hi' ? 'निरंतर स्ट्रीम अक्षुण्ण (60 मिनट · 25 FPS)' : 'Continuous Stream Intact (60 min · 25 FPS)'}
          </div>
        </div>

        {/* CAM 02 with 17m Gap */}
        <div className="space-y-1 pt-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-slate-900">CAM 02 (Loading Bay)</span>
            <span className="text-rose-700 font-bold flex items-center gap-1 font-sans">
              <AlertOctagon className="w-3.5 h-3.5" />
              {language === 'hi'
                ? '17:35 – 17:52 अनुपलब्ध अंतराल का पता चला (17 मिनट)'
                : '17:35 – 17:52 Missing Interval Detected (17 Minutes)'}
            </span>
          </div>
          <div className="w-full h-7 flex rounded overflow-hidden border border-slate-300 text-[10px] font-mono text-center font-semibold">
            <div
              className="bg-emerald-100 text-emerald-900 flex items-center justify-center border-r border-slate-300"
              style={{ width: '58.3%' }}
            >
              {language === 'hi' ? '17:00–17:35 निरंतर (35 मिनट)' : '17:00–17:35 Continuous (35 min)'}
            </div>
            <div
              className="bg-rose-500 text-white flex items-center justify-center border-r border-slate-300 animate-pulse px-1"
              style={{ width: '28.3%' }}
            >
              {language === 'hi' ? 'अंतराल: 17:35–17:52 (17 मिनट गायब)' : 'GAP: 17:35–17:52 (17m MISSING)'}
            </div>
            <div
              className="bg-emerald-100 text-emerald-900 flex items-center justify-center"
              style={{ width: '13.4%' }}
            >
              {language === 'hi' ? '17:52–18:00 (8 मिनट)' : '17:52–18:00 (8 min)'}
            </div>
          </div>
        </div>
      </div>

      {/* Detected Gaps Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {gaps.map((gap) => (
          <div
            key={gap.id}
            className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold bg-slate-900 text-teal-300 px-2 py-0.5 rounded">
                {gap.id}
              </span>
              <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                {language === 'hi' ? `अवधि: ${gap.durationMinutes} मिनट` : `Duration: ${gap.durationMinutes} Minutes`}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                {language === 'hi' ? 'कैमरा व अनुपलब्ध समय अंतराल' : 'Camera Feed & Missing Time Window'}
              </span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">
                {gap.cameraCode} · {gap.startTime} → {gap.endTime}
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded border border-slate-100 space-y-2 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  {language === 'hi' ? 'संभावित तकनीकी श्रेणी (Non-Prejudicial):' : 'Possible Technical Category (Non-Prejudicial):'}
                </span>
                <span className="font-semibold text-amber-800 font-sans">
                  {gap.possibleReasonCategory}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  {language === 'hi' ? 'फोरेंसिक तकनीकी मूल्यांकन:' : 'Technical Assessment:'}
                </span>
                <p className="text-slate-700 leading-relaxed font-sans">{gap.technicalNote}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  {language === 'hi' ? 'स्वतंत्र क्रॉस-चेक सत्यापन:' : 'Cross-Verification:'}
                </span>
                <p className="text-slate-600 font-sans">{gap.crossCheckVerification}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>{language === 'hi' ? 'जांच स्थिति:' : 'Status:'} {gap.investigatorVerified ? (language === 'hi' ? 'सत्यापित' : 'Verified') : (language === 'hi' ? 'समीक्षाधीन' : 'Under Review')}</span>
              <span className="text-teal-700 font-semibold">{gap.recordedInLog}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 6 Technical Reasons Breakdown Accordion / Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
          {language === 'hi' ? 'साक्ष्य अंतराल के 6 मानक वस्तुनिष्ठ तकनीकी स्पष्टीकरण' : 'Standard Objective Categories for Surveillance Gaps'}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
          {reasonCategories.map((r, i) => (
            <div key={i} className="bg-white p-3 rounded border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block font-sans">
                {i + 1}. {r.label}
              </span>
              <p className="text-[11px] text-slate-600 leading-snug">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
