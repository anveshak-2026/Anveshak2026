import React from 'react';
import { EvidenceClassification, IntegrityStatus } from '../../types/forensics';
import { useForensicStore } from '../../services/ForensicContext';

interface StatusBadgeProps {
  status: EvidenceClassification | IntegrityStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const { language } = useForensicStore();
  const s = status.toUpperCase();

  const getStyle = () => {
    switch (s) {
      case 'CONFIRMED':
      case 'VERIFIED':
      case 'HEALTHY':
      case 'SUCCESS':
      case 'COMPLETE':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'SUPPORTED':
      case 'ACTIVE':
        return 'bg-blue-50 text-blue-800 border-blue-300';
      case 'CONFLICTED':
      case 'WARNING':
      case 'CLOCK DRIFT':
      case 'FRAGMENTED':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'MISSING':
      case 'FAILED':
      case 'GAPS DETECTED':
      case 'CORRUPTED':
        return 'bg-rose-50 text-rose-800 border-rose-300';
      case 'INFERENCE':
        return 'bg-indigo-50 text-indigo-800 border-indigo-300';
      case 'UNKNOWN':
      case 'PENDING':
      case 'REQUIRES REVIEW':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getLocalizedText = () => {
    if (language !== 'hi') return status;

    switch (s) {
      case 'CONFIRMED':
        return 'पुष्ट साक्ष्य';
      case 'VERIFIED':
        return 'सत्यापित';
      case 'HEALTHY':
        return 'सामान्य / स्वस्थ';
      case 'SUCCESS':
        return 'सफल';
      case 'COMPLETE':
        return 'पूर्ण';
      case 'SUPPORTED':
        return 'समर्थित साक्ष्य';
      case 'ACTIVE':
        return 'सक्रिय';
      case 'CONFLICTED':
        return 'विरोधाभासी';
      case 'WARNING':
        return 'चेतावनी';
      case 'CLOCK DRIFT':
        return 'घड़ी का अंतर';
      case 'FRAGMENTED':
        return 'खंडित';
      case 'MISSING':
        return 'अनुपलब्ध साक्ष्य';
      case 'FAILED':
        return 'विफल';
      case 'GAPS DETECTED':
        return 'अंतराल मिले';
      case 'CORRUPTED':
        return 'दूषित';
      case 'INFERENCE':
        return 'विश्लेषणात्मक निष्कर्ष';
      case 'UNKNOWN':
        return 'अज्ञात';
      case 'PENDING':
        return 'लंबित';
      case 'REQUIRES REVIEW':
        return 'समीक्षा आवश्यक';
      default:
        return status;
    }
  };

  const pxClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center font-medium border rounded whitespace-nowrap tabular-nums ${pxClass} ${getStyle()}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70" />
      {getLocalizedText()}
    </span>
  );
};
