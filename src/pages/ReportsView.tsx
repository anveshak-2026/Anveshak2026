import React from 'react';
import { FileText } from 'lucide-react';
import { ReportPreview } from '../components/forensics/ReportPreview';

export const ReportsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <ReportPreview />
    </div>
  );
};
