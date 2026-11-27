import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  BookOpen,
  CheckCircle2,
  FileText,
  ShoppingBag,
  ArrowRight,
  ExternalLink,
  Download,
} from 'lucide-react';
import { Book, ChapterItem } from '../types/bookstore';
import { BookCover3D } from './BookCover3D';
import { ShareMenu } from './ShareMenu';

interface BookDetailModalProps {
  book: Book;
  isOpen: boolean;
  initialChapter: ChapterItem | null;
  isPurchased: boolean;
  onClose: () => void;
  onAddToCart: (openCart?: boolean) => void;
  onSelectChapter: (chapter: ChapterItem) => void;
  onToast: (message: string) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  isOpen,
  initialChapter,
  isPurchased,
  onClose,
  onAddToCart,
  onSelectChapter,
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<'sample' | 'contents' | 'overview' | 'reviews'>(
    initialChapter ? 'sample' : 'overview'
  );
  const [focusedChapter, setFocusedChapter] = useState<ChapterItem | null>(initialChapter);

  useEffect(() => {
    if (isOpen) {
      setFocusedChapter(initialChapter);
      setActiveTab(initialChapter ? 'sample' : 'overview');
    }
  }, [isOpen, initialChapter]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const savingsPercent = Math.round(
    ((book.originalPrice - book.price) / book.originalPrice) * 100
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1E18]/60 p-3 sm:p-6 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#E3DAC6] bg-[#FAF7F0] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#E7DFCD] bg-white px-5 py-3.5 sm:px-7">
          <div className="flex items-center gap-2 text-xs text-[#546860] truncate">
            <span>{book.format}</span>
            <span aria-hidden="true">·</span>
            <span>{book.language}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{book.pages} pages</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <ShareMenu book={book} onShared={onToast} />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close manuscript preview"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E3DAC6] text-[#132B23] hover:bg-[#F3EDE0] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Soft-Copy Cover Stage */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="flex w-full flex-col items-center justify-center rounded-xl border border-[#E8E0CE] bg-[#F3EDE0] py-10 px-6">
                <BookCover3D book={book} size="lg" showPdfRibbon />
              </div>

              <dl className="mt-5 grid w-full grid-cols-2 gap-x-4 gap-y-3 border-t border-[#E6DEC9] pt-4 text-xs">
                <div>
                  <dt className="text-[#5C7068]">Format</dt>
                  <dd className="mt-0.5 font-medium text-[#132B23]">Soft Copy (PDF)</dd>
                </div>
                <div>
                  <dt className="text-[#5C7068]">Edition</dt>
                  <dd className="mt-0.5 text-[#132B23]">{book.publishedYear} Master Edition</dd>
                </div>
                <div>
                  <dt className="text-[#5C7068]">Delivery</dt>
                  <dd className="mt-0.5 text-[#132B23]">Instant Email & WhatsApp</dd>
                </div>
                <div>
                  <dt className="text-[#5C7068]">Rating</dt>
                  <dd className="mt-0.5 flex items-center gap-1 font-mono text-[#132B23] tabular-nums">
                    <Star className="h-3.5 w-3.5 fill-[#C59A38] text-[#C59A38]" />
                    <span>{book.rating.toFixed(1)}</span>
                    <span className="text-[#5C7068]">({book.reviewCount.toLocaleString()})</span>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Right Purchase Module & Manuscript Reader */}
            <div className="lg:col-span-7 flex flex-col">
              <p className="text-xs font-medium text-[#5A6D65]">{book.author}</p>
              <h2
                id="pdp-title"
                className="mt-1 font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#132B23]"
              >
                {book.title}
              </h2>
              <p className="mt-1.5 text-sm sm:text-base text-[#3D524A]">{book.subtitle}</p>

              {/* Soft Copy Contiguous Purchase Box */}
              <div className="mt-5 rounded-xl border border-[#E2D9C5] bg-white p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-3xl font-semibold text-[#132B23] tabular-nums">
                      ₹{book.price}
                    </span>
                    <span className="font-mono text-base text-[#7E8C86] line-through tabular-nums">
                      ₹{book.originalPrice}
                    </span>
                    <span className="text-xs font-semibold text-[#144532]">
                      Save {savingsPercent}%
                    </span>
                  </div>
                  <span className="text-xs text-[#546860]">Digital Soft Copy Only (PDF)</span>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  {isPurchased ? (
                    <a
                      href={book.pdfAssetUrl}
                      download="The_Complete_Earn_Money_Online_Blueprint.pdf"
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#144532] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0D3324] whitespace-nowrap"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download Your Soft Copy PDF</span>
                    </a>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          onAddToCart(true);
                          onClose();
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#144532] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0D3324] whitespace-nowrap"
                      >
                        <span>Buy Soft Copy · ₹{book.price}</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onAddToCart(false)}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#144532] bg-white px-5 py-3 text-sm font-semibold text-[#144532] transition-colors hover:bg-[#F3F8F5] whitespace-nowrap"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        <span>Add to Bag</span>
                      </button>
                    </>
                  )}
                </div>

                <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-[#EFEADF] pt-3 text-xs">
                  <span className="text-[#4A5E56]">
                    {isPurchased
                      ? 'Lifetime digital license unlocked in your browser.'
                      : 'Instant downloadable PDF sent via Email & WhatsApp after payment.'}
                  </span>
                  <a
                    href={book.pdfAssetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[#144532] hover:underline underline-offset-4"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Open PDF Preview</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="mt-6 border-b border-[#E3DAC6] flex items-center gap-6 overflow-x-auto">
                {(
                  [
                    ['sample', focusedChapter ? `${focusedChapter.number} Preview` : 'Read Excerpt'],
                    ['contents', `All ${book.chapters.length} Parts`],
                    ['overview', 'Overview'],
                    ['reviews', `Reviews (${book.reviews.length})`],
                  ] as const
                ).map(([tabKey, label]) => (
                  <button
                    key={tabKey}
                    type="button"
                    onClick={() => setActiveTab(tabKey)}
                    className={`pb-3 text-sm font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                      activeTab === tabKey
                        ? 'border-[#144532] text-[#132B23]'
                        : 'border-transparent text-[#5E726A] hover:text-[#132B23]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mt-5">
                {activeTab === 'sample' && (
                  <div className="rounded-xl border border-[#E5DEC9] bg-white p-5 sm:p-6">
                    {focusedChapter ? (
                      <>
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#144532] font-medium">
                          <span className="inline-flex items-center gap-1.5">
                            <BookOpen className="h-4 w-4" />
                            <span>
                              {focusedChapter.number} · {focusedChapter.pagesLabel}
                            </span>
                          </span>
                          <span className="text-[#546860]">
                            {focusedChapter.phase} · {focusedChapter.readMinutes} min read
                          </span>
                        </div>
                        <h4 className="mt-2 font-serif text-lg font-semibold text-[#132B23]">
                          {focusedChapter.title}
                        </h4>
                        <p className="mt-0.5 text-xs text-[#546860]">{focusedChapter.hindiTitle}</p>
                        <p className="mt-4 text-sm leading-7 text-[#253A32]">
                          {focusedChapter.excerpt}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-[#3D524A]">
                          {focusedChapter.summary}
                        </p>
                        <div className="mt-4 border-t border-[#EFEADF] pt-3.5 text-xs text-[#546860]">
                          <span className="font-semibold text-[#132B23]">Tools Covered: </span>
                          {focusedChapter.keyTools.join(' · ')}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 text-xs text-[#144532] font-medium">
                          <BookOpen className="h-4 w-4" />
                          <span>Manuscript Excerpt</span>
                        </div>
                        <h4 className="mt-2 font-serif text-lg font-semibold text-[#132B23]">
                          {book.sampleExcerpt.heading}
                        </h4>
                        <p className="mt-0.5 text-xs text-[#546860]">
                          {book.sampleExcerpt.subheading}
                        </p>
                        <div className="mt-4 space-y-3 text-sm leading-7 text-[#253A32]">
                          {book.sampleExcerpt.paragraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                          ))}
                        </div>
                        <div className="mt-5 border-t border-[#EFEADF] pt-4">
                          <p className="text-xs font-semibold text-[#132B23] mb-2">
                            Key Blueprint Takeaways
                          </p>
                          <ul className="space-y-1.5 text-xs text-[#384D45]">
                            {book.sampleExcerpt.keyTakeaways.map((t, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="font-mono text-[#144532]">0{i + 1}.</span>
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {activeTab === 'contents' && (
                  <ol className="divide-y divide-[#EAE2D0]">
                    {book.chapters.map((ch) => (
                      <li key={ch.id} className="py-3 first:pt-0">
                        <button
                          type="button"
                          onClick={() => {
                            setFocusedChapter(ch);
                            onSelectChapter(ch);
                            setActiveTab('sample');
                          }}
                          className="group flex w-full items-baseline gap-2.5 text-left"
                        >
                          <span className="font-mono text-xs font-medium text-[#144532] shrink-0">
                            {ch.number}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-[#132B23] group-hover:text-[#144532]">
                              {ch.title}
                            </p>
                            <p className="text-xs text-[#4C6259] mt-0.5">{ch.hindiTitle}</p>
                            <p className="mt-1 text-xs leading-relaxed text-[#576B63]">
                              {ch.summary}
                            </p>
                          </div>
                          <span className="font-mono text-[11px] text-[#5C7068] shrink-0">
                            {ch.pagesLabel}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ol>
                )}

                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <p className="text-sm leading-relaxed text-[#2F443C]">{book.description}</p>
                    <div className="space-y-2.5 pt-1">
                      <h4 className="text-xs font-semibold tracking-wide text-[#132B23]">
                        Included in Your Digital Soft Copy
                      </h4>
                      {book.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-sm text-[#1E352D]">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#144532]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {book.reviews.map((rev) => (
                      <article
                        key={rev.id}
                        className="rounded-xl border border-[#E6DEC9] bg-white p-4"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-xs text-[#132B23]">
                            <span className="font-semibold">{rev.readerName}</span>
                            <span className="text-[#5B6F67]">
                              {' '}
                              · {rev.role}, {rev.city}
                            </span>
                          </div>
                          <div className="flex items-center gap-0.5 text-[#C59A38]">
                            {Array.from({ length: rev.rating }).map((_, idx) => (
                              <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-[#2C423A]">
                          “{rev.comment}”
                        </p>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
