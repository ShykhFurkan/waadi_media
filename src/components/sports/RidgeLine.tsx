import React from 'react';

interface RidgeLineProps {
  className?: string;
  variant?: 'divider' | 'texture' | 'loading';
}

export const RidgeLine: React.FC<RidgeLineProps> = ({ className = '', variant = 'divider' }) => {
  if (variant === 'loading') {
    return (
      <div className={`w-full flex items-center justify-center py-8 ${className}`}>
        <svg
          viewBox="0 0 400 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-48 h-8 text-[#E8A33D] animate-pulse"
        >
          <path
            d="M0 35 L70 35 L120 12 L170 28 L230 5 L300 24 L350 15 L400 35"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'texture') {
    return (
      <svg
        viewBox="0 0 600 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-12 text-[#22302B] opacity-60 pointer-events-none ${className}`}
      >
        <path
          d="M0 45 L90 45 L150 15 L220 32 L310 8 L400 30 L480 18 L600 45"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <div className={`w-full py-6 flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 1200 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-7xl h-8 text-[#22302B]"
      >
        <path
          d="M0 35 L200 35 L350 12 L480 28 L650 6 L820 26 L960 14 L1200 35"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
