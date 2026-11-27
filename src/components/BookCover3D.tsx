import React from 'react';
import { Book } from '../types/bookstore';

interface BookCover3DProps {
  book?: Book;
  size?: 'sm' | 'md' | 'lg';
  showPdfRibbon?: boolean;
}

export const BookCover3D: React.FC<BookCover3DProps> = ({
  size = 'lg',
  showPdfRibbon = true,
}) => {
  const isLg = size === 'lg';
  const dimensions = isLg
    ? 'w-[228px] sm:w-[252px] h-[324px] sm:h-[358px]'
    : size === 'sm'
    ? 'w-[104px] h-[148px]'
    : 'w-[172px] h-[244px]';

  return (
    <div className="book-stage relative inline-flex items-center justify-center select-none pl-4 sm:pl-6 py-2">
      {/* Ground contact shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-2 left-6 right-2 h-8 rounded-full blur-xl opacity-35"
        style={{ background: '#0B1E17' }}
      />

      {/* Scalloped Wax-Seal eBook PDF Stamp (Top-Left) */}
      {showPdfRibbon && isLg && (
        <div
          className="absolute -left-2 sm:left-0 top-1 z-30 flex h-[68px] w-[68px] items-center justify-center drop-shadow-[0_4px_10px_rgba(19,43,35,0.14)]"
          aria-label="eBook PDF Format"
        >
          <svg
            viewBox="0 0 80 80"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <path
              d="M40 3 L45.5 7.4 L52.4 5.5 L55.8 11.7 L62.9 12.2 L64 19.2 L70.4 22.1 L69 29.1 L74.2 34 L70.5 40 L74.2 46 L69 50.9 L70.4 57.9 L64 60.8 L62.9 67.8 L55.8 68.3 L52.4 74.5 L45.5 72.6 L40 77 L34.5 72.6 L27.6 74.5 L24.2 68.3 L17.1 67.8 L16 60.8 L9.6 57.9 L11 50.9 L5.8 46 L9.5 40 L5.8 34 L11 29.1 L9.6 22.1 L16 19.2 L17.1 12.2 L24.2 11.7 L27.6 5.5 L34.5 7.4 Z"
              fill="#F3EBDA"
              stroke="#C8B68A"
              strokeWidth="1.6"
            />
            <circle
              cx="40"
              cy="40"
              r="29"
              fill="none"
              stroke="#D7C7A1"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          </svg>
          <div className="relative z-10 flex flex-col items-center justify-center text-center leading-none">
            <span className="text-[12px] font-bold text-[#132B23] tracking-tight">eBook</span>
            <span className="mt-0.5 text-[12px] font-extrabold text-[#132B23] tracking-wide">
              PDF
            </span>
          </div>
        </div>
      )}

      <div className={`book-3d relative ${dimensions}`}>
        {/* Top White Paper Edge */}
        <div
          aria-hidden="true"
          className="book-top-pages absolute top-0 left-0 right-1 h-[22px] rounded-t-[2px] border-t border-white/80"
        />

        {/* Book Spine */}
        <div
          aria-hidden="true"
          className="book-spine absolute inset-y-0 left-0 w-[30px] rounded-l-[4px] flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #163E2E 0%, #0D291E 50%, #081A13 100%)',
            boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.55), inset 1px 0 2px rgba(255,255,255,0.12)',
          }}
        >
          <span
            className="text-[8px] font-semibold tracking-[0.06em] whitespace-nowrap text-[#E7D8B1]/90"
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
            }}
          >
            घर बैठे अपने स्मार्टफोन से ₹0 से ₹1 LAKH/MONTH
          </span>
        </div>

        {/* Front Cover */}
        <div
          className="relative h-full w-full rounded-r-[6px] rounded-l-[2px] overflow-hidden flex flex-col justify-between px-4 py-4 sm:px-5 sm:py-5"
          style={{
            background:
              'radial-gradient(circle at 52% 46%, #1D573F 0%, #103526 48%, #071D14 100%)',
            boxShadow:
              '0 22px 38px -12px rgba(7, 25, 18, 0.55), inset 5px 0 10px rgba(255,255,255,0.09), inset -1px 0 3px rgba(0,0,0,0.45)',
          }}
        >
          {/* Left binding crease line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-[9px] w-[1px] opacity-25"
            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.6), transparent, rgba(255,255,255,0.4))' }}
          />

          {/* Top Title Block */}
          <div className="relative z-10 text-center">
            <p
              className={`font-semibold tracking-[0.16em] uppercase text-[#DCE5DF] ${
                size === 'sm' ? 'text-[6px]' : 'text-[10px] sm:text-[11px]'
              }`}
            >
              THE COMPLETE
            </p>
            <h3
              className={`mt-0.5 font-extrabold tracking-[0.02em] uppercase leading-[1.03] ${
                size === 'sm' ? 'text-[13px]' : 'text-[27px] sm:text-[30px]'
              }`}
              style={{
                fontFamily: 'var(--font-display)',
                background: 'linear-gradient(180deg, #F8E3A3 0%, #E0B95A 55%, #C99D3B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              EARN MONEY ONLINE
            </h3>
            <p
              className={`mt-1 font-semibold tracking-[0.11em] uppercase text-[#E4ECE7] ${
                size === 'sm' ? 'text-[5.5px]' : 'text-[10px] sm:text-[11px]'
              }`}
            >
              30 DAYS PRACTICAL BLUEPRINT
            </p>
          </div>

          {/* Center Graphic: Smartphone Growth Chart + Floating Notes & Rupee Coins */}
          <div className="relative z-10 my-1 flex items-center justify-center">
            <svg
              viewBox="0 0 220 128"
              className={size === 'sm' ? 'w-20 h-12' : 'w-full max-w-[196px] h-[112px]'}
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="coverGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#E6C265" stopOpacity="0.4" />
                  <stop offset="65%" stopColor="#1B5A40" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#071D14" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="goldRim" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F8E29E" />
                  <stop offset="50%" stopColor="#CFA344" />
                  <stop offset="100%" stopColor="#8A6820" />
                </linearGradient>
                <linearGradient id="noteGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#D9D3C1" />
                  <stop offset="100%" stopColor="#9FA69B" />
                </linearGradient>
                <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#143D2D" />
                  <stop offset="100%" stopColor="#081C14" />
                </linearGradient>
              </defs>

              {/* Ambient glow */}
              <ellipse cx="110" cy="66" rx="95" ry="56" fill="url(#coverGlow)" />

              {/* Left fanned currency notes */}
              <g transform="translate(26 42) rotate(-24)">
                <rect x="0" y="0" width="52" height="28" rx="3" fill="url(#noteGrad)" stroke="#5E6E66" strokeWidth="1" />
                <rect x="5" y="4" width="42" height="20" rx="2" fill="none" stroke="#6E7E76" strokeWidth="0.7" />
                <text x="26" y="18" textAnchor="middle" fill="#2A4036" fontSize="11" fontWeight="700">₹</text>
              </g>
              <g transform="translate(20 76) rotate(14)">
                <rect x="0" y="0" width="48" height="26" rx="3" fill="#C7C2B2" stroke="#5A6A62" strokeWidth="1" />
                <text x="24" y="17" textAnchor="middle" fill="#273D34" fontSize="10" fontWeight="700">₹500</text>
              </g>

              {/* Right fanned currency notes */}
              <g transform="translate(148 26) rotate(22)">
                <rect x="0" y="0" width="54" height="28" rx="3" fill="url(#noteGrad)" stroke="#5E6E66" strokeWidth="1" />
                <rect x="5" y="4" width="44" height="20" rx="2" fill="none" stroke="#6E7E76" strokeWidth="0.7" />
                <text x="27" y="18" textAnchor="middle" fill="#2A4036" fontSize="10" fontWeight="700">₹500</text>
              </g>
              <g transform="translate(154 72) rotate(-14)">
                <rect x="0" y="0" width="48" height="26" rx="3" fill="#CFC8B5" stroke="#5E6E66" strokeWidth="1" />
                <text x="24" y="17" textAnchor="middle" fill="#273D34" fontSize="10" fontWeight="700">₹</text>
              </g>

              {/* Gold Rupee Coins */}
              <g>
                <circle cx="62" cy="28" r="10" fill="url(#goldRim)" stroke="#FFF0BE" strokeWidth="0.9" />
                <text x="62" y="32" textAnchor="middle" fill="#3B2908" fontSize="11" fontWeight="800">₹</text>
                <circle cx="156" cy="96" r="9.5" fill="url(#goldRim)" stroke="#FFF0BE" strokeWidth="0.9" />
                <text x="156" y="100" textAnchor="middle" fill="#3B2908" fontSize="10.5" fontWeight="800">₹</text>
                <circle cx="72" cy="100" r="8" fill="url(#goldRim)" stroke="#FFF0BE" strokeWidth="0.8" />
                <text x="72" y="103.5" textAnchor="middle" fill="#3B2908" fontSize="9" fontWeight="800">₹</text>
              </g>

              {/* Center Smartphone Frame */}
              <g transform="translate(82 14)">
                <rect
                  x="0"
                  y="0"
                  width="56"
                  height="98"
                  rx="8"
                  fill="url(#screenGrad)"
                  stroke="url(#goldRim)"
                  strokeWidth="2.4"
                />
                {/* Top speaker notch */}
                <rect x="20" y="5" width="16" height="2.4" rx="1.2" fill="#2A5844" />

                {/* Upward growth bars */}
                <rect x="10" y="60" width="6" height="16" rx="1.5" fill="#7FA992" />
                <rect x="19" y="52" width="6" height="24" rx="1.5" fill="#A9C79E" />
                <rect x="28" y="42" width="6" height="34" rx="1.5" fill="#D4B86A" />
                <rect x="37" y="30" width="7" height="46" rx="1.5" fill="#F2D178" />

                {/* Ascending golden arrow */}
                <path
                  d="M9 56 L22 45 L31 38 L44 20"
                  stroke="#FBE6A4"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M38 20 L44.5 19.5 L44 26"
                  stroke="#FBE6A4"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Bottom UI bar */}
                <rect x="14" y="84" width="28" height="3" rx="1.5" fill="#2F664E" />
              </g>

              {/* Sparkle accent dots */}
              <circle cx="48" cy="64" r="1.8" fill="#F7E09B" />
              <circle cx="170" cy="58" r="1.8" fill="#F7E09B" />
              <circle cx="138" cy="18" r="1.5" fill="#F7E09B" />
            </svg>
          </div>

          {/* Bottom Action Plan Badge & Tagline */}
          <div className="relative z-10 text-center">
            {size !== 'sm' && (
              <div
                className="mx-auto inline-block rounded-[5px] px-3 py-1 shadow-sm"
                style={{
                  background: 'linear-gradient(180deg, #DFBE6A 0%, #BA923A 100%)',
                }}
              >
                <span
                  className="block text-[11px] sm:text-[12px] font-extrabold tracking-[0.06em] text-[#11261E] tabular-nums"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  (ZERO TO ₹1 LAKH)
                </span>
              </div>
            )}

            <p
              className={`mt-2 font-bold tracking-[0.04em] uppercase leading-[1.15] text-[#F4EFE0] ${
                size === 'sm' ? 'text-[8px]' : 'text-[16px] sm:text-[18px]'
              }`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              30-DAY STEP-BY-STEP
              <br />
              ACTION PLAN
            </p>

            {isLg && (
              <p className="mt-2 text-[8.5px] font-semibold tracking-[0.14em] uppercase text-[#C4D3CB]">
                PRACTICAL | REALISTIC | ACTIONABLE
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
