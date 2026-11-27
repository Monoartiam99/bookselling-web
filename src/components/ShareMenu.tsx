import React, { useState, useRef, useEffect } from 'react';
import { Share2, Check, Copy, Mail, MessageCircle } from 'lucide-react';
import { Book } from '../types/bookstore';

interface ShareMenuProps {
  book: Book;
  compact?: boolean;
  onShared?: (message: string) => void;
}

export const ShareMenu: React.FC<ShareMenuProps> = ({
  book,
  compact = false,
  onShared,
}) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}#book-${book.slug}`
      : `https://kamaomoney.in/#book-${book.slug}`;

  const shareText = `${book.title} — ${book.subtitle} (₹${book.price} on KamaoMoney Books)`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = `${shareText} ${shareUrl}`;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    onShared?.(`Copied link for "${book.title}"`);
    setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 1200);
  };

  const handleNativeOrToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);

  const channels = [
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      icon: MessageCircle,
    },
    {
      name: 'X (Twitter)',
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      icon: Share2,
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Share2,
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Share2,
    },
    {
      name: 'Email',
      href: `mailto:?subject=${encodeURIComponent(book.title)}&body=${encodedText}%0A%0A${encodedUrl}`,
      icon: Mail,
    },
  ];

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        type="button"
        onClick={handleNativeOrToggle}
        aria-expanded={open}
        aria-label={`Share ${book.title}`}
        className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#DCD3BD] bg-[#FAF7F0] text-[#132B23] transition-colors hover:border-[#144532] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#144532] whitespace-nowrap shrink-0 ${
          compact ? 'h-10 w-10 p-0' : 'px-3.5 py-2 text-xs font-medium min-h-[40px]'
        }`}
      >
        <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
        {!compact && <span>Share</span>}
      </button>

      {open && (
        <div
          role="menu"
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 z-40 mt-2 w-52 rounded-xl border border-[#E2D9C5] bg-white p-1.5 shadow-lg"
        >
          <div className="px-2.5 py-1.5 text-[11px] font-medium text-[#5A6D65] border-b border-[#EFEADF] mb-1 truncate">
            Share this book
          </div>
          {channels.map((ch) => (
            <a
              key={ch.name}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                onShared?.(`Opened ${ch.name} share for "${book.title}"`);
                setOpen(false);
              }}
              className="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium text-[#132B23] hover:bg-[#F5F0E4] transition-colors"
            >
              <span>{ch.name}</span>
              <span className="text-[11px] text-[#5A6D65]">↗</span>
            </a>
          ))}
          <button
            type="button"
            onClick={handleCopy}
            className="mt-1 flex w-full items-center justify-between rounded-lg border-t border-[#EFEADF] px-2.5 py-2 text-xs font-medium text-[#144532] hover:bg-[#F5F0E4] transition-colors"
          >
            <span>{copied ? 'Link Copied' : 'Copy Book Link'}</span>
            {copied ? (
              <Check className="h-3.5 w-3.5 text-[#144532]" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};
