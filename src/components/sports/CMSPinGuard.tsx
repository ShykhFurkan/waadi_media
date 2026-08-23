'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Lock, AlertCircle, ArrowRight } from 'lucide-react';

const CORRECT_PIN = '8291';

interface CMSPinGuardProps {
  children: React.ReactNode;
}

export function CMSPinGuard({ children }: CMSPinGuardProps) {
  const [isVerified, setIsVerified] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if session has already verified the PIN
    const sessionAuth = sessionStorage.getItem('cms_pin_verified');
    if (sessionAuth === 'true') {
      setIsVerified(true);
    }
    setLoading(false);
  }, []);

  const handlePinSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pin === CORRECT_PIN) {
      sessionStorage.setItem('cms_pin_verified', 'true');
      setIsVerified(true);
      setError(false);
    } else {
      setError(true);
      setPin('');
    }
  };

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) {
      const nextPin = pin + num;
      setPin(nextPin);
      setError(false);
      if (nextPin.length === 4) {
        if (nextPin === CORRECT_PIN) {
          sessionStorage.setItem('cms_pin_verified', 'true');
          setIsVerified(true);
        } else {
          setError(true);
          setTimeout(() => setPin(''), 500);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#091510] text-[#F7F5F0] flex items-center justify-center font-mono">
        <div className="flex items-center gap-3">
          <Shield className="animate-pulse text-[#E8A33D]" size={24} />
          <span>VERIFYING SECURITY CREDENTIALS...</span>
        </div>
      </div>
    );
  }

  if (isVerified) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#07130E]/95 backdrop-blur-xl flex items-center justify-center p-4 selection:bg-[#E8A33D] selection:text-[#0F2A1E]">
      <div className="w-full max-w-md bg-[#0D2218] border-2 border-[#22302B] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E8A33D] via-emerald-500 to-[#E8A33D]" />

        {/* Security Shield Icon Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-[#132A1F] border border-[#22302B] flex items-center justify-center mx-auto text-[#E8A33D] shadow-inner">
            <Lock size={32} className="animate-pulse" />
          </div>
          <h2 className="font-display text-lg text-white uppercase tracking-wider font-bold">
            CMS CONSOLE ACCESS
          </h2>
          <p className="text-xs font-mono text-[#8A9A91]">
            Enter 4-Digit Security PIN to unlock sports console
          </p>
        </div>

        {/* PIN Display Dots */}
        <form onSubmit={handlePinSubmit} className="space-y-4">
          <div className="flex justify-center items-center gap-4 py-3">
            {[0, 1, 2, 3].map((index) => {
              const isFilled = pin.length > index;
              return (
                <div
                  key={index}
                  className={`w-12 h-14 rounded-xl border-2 flex items-center justify-center text-xl font-mono font-bold transition-all ${
                    error
                      ? 'border-red-500 bg-red-950/30 text-red-400 animate-shake'
                      : isFilled
                      ? 'border-[#E8A33D] bg-[#142820] text-[#E8A33D] shadow-lg shadow-[#E8A33D]/10'
                      : 'border-[#22302B] bg-[#07130E] text-[#8A9A91]'
                  }`}
                >
                  {isFilled ? '●' : ''}
                </div>
              );
            })}
          </div>

          {/* Hidden input for direct typing */}
          <input
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            value={pin}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '').slice(0, 4);
              setPin(val);
              setError(false);
              if (val.length === 4) {
                if (val === CORRECT_PIN) {
                  sessionStorage.setItem('cms_pin_verified', 'true');
                  setIsVerified(true);
                } else {
                  setError(true);
                  setTimeout(() => setPin(''), 500);
                }
              }
            }}
            className="sr-only"
            autoFocus
          />

          {/* Error Alert */}
          {error && (
            <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/50 text-red-400 text-xs font-mono flex items-center justify-center gap-2 animate-bounce">
              <AlertCircle size={15} />
              <span>Incorrect Security PIN! Access Denied.</span>
            </div>
          )}

          {/* On-Screen Numeric Keypad */}
          <div className="grid grid-cols-3 gap-2.5 pt-2 font-mono">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleKeyPress(num)}
                className="h-12 rounded-xl bg-[#07130E] border border-[#22302B] text-white font-bold text-lg hover:border-[#E8A33D] hover:bg-[#142820] active:scale-95 transition-all flex items-center justify-center"
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={handleBackspace}
              className="h-12 rounded-xl bg-[#07130E] border border-[#22302B] text-[#8A9A91] hover:text-red-400 hover:border-red-900/50 active:scale-95 transition-all text-xs font-bold uppercase flex items-center justify-center"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => handleKeyPress('0')}
              className="h-12 rounded-xl bg-[#07130E] border border-[#22302B] text-white font-bold text-lg hover:border-[#E8A33D] hover:bg-[#142820] active:scale-95 transition-all flex items-center justify-center"
            >
              0
            </button>
            <button
              type="submit"
              className="h-12 rounded-xl bg-[#E8A33D] text-[#0F2A1E] font-bold text-xs uppercase hover:bg-[#F2C878] active:scale-95 transition-all flex items-center justify-center gap-1 shadow"
            >
              <span>Unlock</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </form>

        {/* Security Note Footer */}
        <div className="pt-2 text-center border-t border-[#1F332A]">
          <span className="text-[10px] font-mono text-[#8A9A91]">
            🔒 Authorized Broadcast Operators Only
          </span>
        </div>
      </div>
    </div>
  );
}
