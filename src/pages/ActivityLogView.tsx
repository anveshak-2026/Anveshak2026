import React, { useState } from 'react';
import { ScrollText, Search } from 'lucide-react';
import { useForensicStore } from '../services/ForensicContext';

export const ActivityLogView: React.FC = () => {
  const { activityLog, language, t } = useForensicStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterResult, setFilterResult] = useState<string>('ALL');

  const filteredLogs = activityLog.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.evidenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesResult = filterResult === 'ALL' || log.result === filterResult;
    return matchesSearch && matchesResult;
  });

  const getLocalizedAction = (action: string) => {
    if (language !== 'hi') return action;
    if (action.includes('Evidence Source Ingested')) return 'साक्ष्य स्रोत आयात किया गया';
    if (action.includes('SHA-256 Bitstream Hash Generated')) return 'SHA-256 हैश उत्पन्न किया गया';
    if (action.includes('Integrity Verification Check Executed')) return 'अखंडता सत्यापन संपन्न';
    if (action.includes('Automated Clock Offset Calibrated')) return 'घड़ी का अंतर कैलिब्रेट किया गया';
    if (action.includes('Investigator Contemporaneous Note Logged')) return 'जांचकर्ता समसामयिक नोट दर्ज';
    if (action.includes('Footage Gap Radar Triggered')) return 'फुटेज अंतराल रडार सक्रिय';
    if (action.includes('12-Section Evidentiary Dossier Sealed')) return '12-चरणीय न्यायिक डॉसियर सील';
    return action;
  };

  const getLocalizedResult = (res: string) => {
    if (language !== 'hi') return res;
    if (res === 'Verified') return 'सत्यापित';
    if (res === 'Success') return 'सफल';
    if (res === 'Complete') return 'पूर्ण';
    if (res === 'Flagged') return 'चिह्नित';
    return res;
  };

  const filterOptions = [
    { key: 'ALL', label: language === 'hi' ? 'सभी' : 'ALL' },
    { key: 'Success', label: language === 'hi' ? 'सफल' : 'Success' },
    { key: 'Verified', label: language === 'hi' ? 'सत्यापित' : 'Verified' },
    { key: 'Complete', label: language === 'hi' ? 'पूर्ण' : 'Complete' },
    { key: 'Flagged', label: language === 'hi' ? 'चिह्नित' : 'Flagged' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ScrollText className="w-5 h-5 text-teal-700" />
            <h2 className="text-base font-bold uppercase tracking-wider text-slate-900">
              {t.activityTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t.activitySubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium px-2.5 py-1 bg-slate-100 rounded text-slate-700">
            {t.totalLoggedEvents} {activityLog.length}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchActivityPlaceholder}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-500 font-medium">{t.filterResultLabel}</span>
          {filterOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setFilterResult(opt.key)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                filterResult === opt.key
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Log Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">{t.colTimestamp}</th>
                <th className="py-2.5 px-3">{t.colUser}</th>
                <th className="py-2.5 px-3">{t.colAction}</th>
                <th className="py-2.5 px-3">{t.colCase}</th>
                <th className="py-2.5 px-3">{t.colEvidence}</th>
                <th className="py-2.5 px-3 text-right">{t.colResult}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 text-slate-600">{log.timestamp}</td>
                  <td className="py-2.5 px-3 font-sans font-medium text-slate-900">{log.user}</td>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-800">
                    {getLocalizedAction(log.action)}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{log.caseId}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{log.evidenceId}</td>
                  <td className="py-2.5 px-3 text-right">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                        log.result === 'Verified' || log.result === 'Success' || log.result === 'Complete'
                          ? 'bg-emerald-100 text-emerald-800'
                          : log.result === 'Flagged'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {getLocalizedResult(log.result)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
