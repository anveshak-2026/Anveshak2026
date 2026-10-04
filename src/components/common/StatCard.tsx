import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  icon,
  variant = 'default',
  onClick,
}) => {
  const getBorder = () => {
    switch (variant) {
      case 'success':
        return 'border-l-4 border-l-emerald-600';
      case 'warning':
        return 'border-l-4 border-l-amber-500';
      case 'danger':
        return 'border-l-4 border-l-rose-500';
      case 'info':
        return 'border-l-4 border-l-blue-600';
      default:
        return 'border-l-4 border-l-slate-400';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white p-4 rounded-lg border border-slate-200 shadow-xs transition-colors ${getBorder()} ${
        onClick ? 'cursor-pointer hover:border-slate-300' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 truncate">
          {label}
        </span>
        {icon && <div className="text-slate-400 shrink-0">{icon}</div>}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
          {value}
        </span>
      </div>
      {subtext && <p className="mt-1 text-xs text-slate-500 truncate">{subtext}</p>}
    </div>
  );
};
