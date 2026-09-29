import { useState } from 'react';

export default function Otp({ length = 6, className = '', otp, setOtp}) {

  const forceCursorToEnd = (e) => {
    const valLength = e.target.value.length;
    setTimeout(() => {
      e.target.setSelectionRange(valLength, valLength);
    }, 0);
  };

  return (
    <label className={`flex items-center justify-center lg:gap-3 cursor-pointer ${className}`}>
      <input
        autoFocus
        type="text"
        inputMode="numeric"
        maxLength={length}
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, length))}
        onFocus={forceCursorToEnd}
        onClick={forceCursorToEnd}
        className="sr-only caret-transparent text-transparent" 
      />

      {Array.from({ length }).map((_, i) => {
        const char = otp[i] || '';
        
        const isFocused = otp.length === length ? i === length - 1 : i === otp.length;

        return (
          <div
            key={i}
            className={`w-full h-18 lg:w-16 lg:h-20 text-3xl font-bold rounded-xl border flex items-center justify-center transition-all ${
              isFocused
                ? 'border-2 border-(--dull-bg) ring-2 ring-blue-100 bg-blue-50/50'
                : 'border-2 border-gray-300 bg-white'
            }`}
          >
            {char}
          </div>
        );
      })}
    </label>
  );
}