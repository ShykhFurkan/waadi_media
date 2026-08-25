'use client';

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden z-10 border border-[#E5EAF2]">
        <div className="p-4 border-b border-[#E5EAF2] flex items-center gap-3">
          <Search size={20} className="text-[#64748B]" />
          <input
            type="text"
            placeholder="Search teams, matches, tournaments, or players..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm text-[#111827] placeholder-[#94A3B8] focus:outline-none font-medium"
          />
          <button onClick={onClose} className="p-1 rounded text-[#64748B] hover:text-[#111827]">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 text-center text-sm text-[#64748B]">
          {query ? (
            <p>Searching for &ldquo;{query}&rdquo;...</p>
          ) : (
            <p>Type to search live scores, teams, and news.</p>
          )}
        </div>
      </div>
    </div>
  );
};
