import React from 'react';

interface LiveBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LiveBadge: React.FC<LiveBadgeProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3.5 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full font-display uppercase tracking-wider text-[#F7F5F0] bg-[#D62828] shadow-sm ${sizeClasses[size]} ${className}`}
    >
      <span className={`rounded-full bg-[#F7F5F0] animate-live-pulse ${dotSizes[size]}`} />
      LIVE
    </span>
  );
};
