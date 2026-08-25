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
      <div className="min-h-screen bg-[#071426] text-white flex items-center justify-center font-mono">
        <div className="flex items-center gap-3">
          <Shield className="animate-pulse text-[#0757E8]" size={24} />
          <span>VERIFYING SECURITY CREDENTIALS...</span>
        </div>
      </div>
    );
  }

  if (isVerified) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#071426]/95 backdrop-blur-xl flex items-center justify-center p-4 selection:bg-[#0757E8] selection:text-white font-sans">
      <div className="w-full max-w-md bg-[#0B1728] border-2 border-[#1E293B] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0757E8] via-[#1769FF] to-[#0757E8]" />

        {/* Security Shield Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-[#0757E8]/10 border border-[#0757E8]/30 flex items-center justify-center mx-auto text-[#1769FF] shadow-inner">
            <Lock size={32} className="animate-pulse" />
          </div>
          <h2 className="font-display font-extrabold text-xl text-white tracking-tight">
            FOOTBALL CMS ACCESS
          </h2>
          <p className="text-xs font-mono text-white/70">
            Enter 4-Digit Security PIN to unlock management console
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
                      ? 'border-[#EF233C] bg-[#EF233C]/20 text-[#EF233C]'
                      : isFilled
                      ? 'border-[#0757E8] bg-[#0757E8]/20 text-[#1769FF] shadow-lg shadow-[#0757E8]/20'
                      : 'border-[#1E293B] bg-[#071426] text-white/40'
                  }`}
                >
                  {isFilled ? '●' : ''}
                </div>
              );
            })}
          </div>

          {/* Hidden input */}
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
            <div className="p-2.5 rounded-lg bg-[#EF233C]/20 border border-[#EF233C]/40 text-[#EF233C] text-xs font-mono flex items-center justify-center gap-2">
              <AlertCircle size={15} />
              <span>Incorrect Security PIN! Access Denied.</span>
            </div>
          )}

          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-2.5 pt-2 font-mono">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleKeyPress(num)}
                className="h-12 rounded-xl bg-[#071426] border border-[#1E293B] text-white font-bold text-lg hover:border-[#0757E8] hover:bg-[#0757E8]/20 active:scale-95 transition-all flex items-center justify-center"
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={handleBackspace}
              className="h-12 rounded-xl bg-[#071426] border border-[#1E293B] text-white/60 hover:text-[#EF233C] hover:border-[#EF233C]/50 active:scale-95 transition-all text-xs font-bold uppercase flex items-center justify-center"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => handleKeyPress('0')}
              className="h-12 rounded-xl bg-[#071426] border border-[#1E293B] text-white font-bold text-lg hover:border-[#0757E8] hover:bg-[#0757E8]/20 active:scale-95 transition-all flex items-center justify-center"
            >
              0
            </button>
            <button
              type="submit"
              className="h-12 rounded-xl bg-[#0757E8] text-white font-bold text-xs uppercase hover:bg-[#004ED0] active:scale-95 transition-all flex items-center justify-center gap-1 shadow-md"
            >
              <span>Unlock</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </form>

        {/* Footer Note */}
        <div className="pt-2 text-center border-t border-[#1E293B]">
          <span className="text-[10px] font-mono text-white/50">
            🔒 Authorized Football Control Room Operators Only
          </span>
        </div>
      </div>
    </div>
  );
}
