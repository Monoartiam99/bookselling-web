import React, { useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface RecentSale {
  city: string;
  timeAgo: string;
}

const RECENT_SALES: RecentSale[] = [
  { city: 'Lucknow', timeAgo: '2 mins ago' },
  { city: 'Jaipur', timeAgo: '4 mins ago' },
  { city: 'Pune', timeAgo: 'Just now' },
  { city: 'Indore', timeAgo: '6 mins ago' },
  { city: 'Patna', timeAgo: '3 mins ago' },
  { city: 'Surat', timeAgo: '5 mins ago' },
  { city: 'Bhopal', timeAgo: 'Just now' },
  { city: 'Chandigarh', timeAgo: '7 mins ago' },
  { city: 'Nagpur', timeAgo: '3 mins ago' },
  { city: 'Kanpur', timeAgo: '4 mins ago' },
];

interface RecentSalesToastProps {
  hidden?: boolean;
}

export const RecentSalesToast: React.FC<RecentSalesToastProps> = ({ hidden = false }) => {
  const [dismissedForSession, setDismissedForSession] = useState(false);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (dismissedForSession) return;

    let hideTimeout: number | undefined;
    let nextTimeout: number | undefined;

    const showCycle = (currentIdx: number) => {
      setIndex(currentIdx);
      setVisible(true);

      hideTimeout = window.setTimeout(() => {
        setVisible(false);
        nextTimeout = window.setTimeout(() => {
          showCycle((currentIdx + 1) % RECENT_SALES.length);
        }, 9000);
      }, 5200);
    };

    const initialTimeout = window.setTimeout(() => {
      showCycle(0);
    }, 3500);

    return () => {
      window.clearTimeout(initialTimeout);
      if (hideTimeout) window.clearTimeout(hideTimeout);
      if (nextTimeout) window.clearTimeout(nextTimeout);
    };
  }, [dismissedForSession]);

  if (dismissedForSession || hidden) return null;

  const sale = RECENT_SALES[index];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-4 left-4 right-4 sm:right-auto z-40 max-w-[310px] transition-all duration-200 ease-out ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      <div className="flex items-start gap-2.5 rounded-xl border border-[#E5DEC9] bg-[#FDFCF8]/95 backdrop-blur-xs px-3.5 py-3 shadow-[0_10px_28px_rgba(19,43,35,0.12)]">
        <div
          aria-hidden="true"
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EAF4EE] text-[#154A34]"
        >
          <CheckCircle2 className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1 pr-1">
          <p className="text-[12.5px] leading-[1.35] text-[#132B23]">
            Someone from <span className="font-bold">{sale.city}</span> just grabbed this eBook
          </p>
          <p className="mt-0.5 text-[11px] font-medium text-[#546860] tabular-nums">
            Verified PDF order · {sale.timeAgo}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setDismissedForSession(true)}
          aria-label="Dismiss recent sales notification"
          className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[#6E8078] hover:bg-[#F2ECE0] hover:text-[#132B23] transition-colors cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
