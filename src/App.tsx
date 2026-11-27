import React, { useState, useEffect } from 'react';
import {
  Check,
  Star,
  ArrowRight,
  ChevronDown,
  BookOpen,
  Smartphone,
  Wallet,
} from 'lucide-react';
import { FLAGSHIP_BOOK } from './data/books';
import { Order } from './types/bookstore';
import { loadOrders, saveOrders } from './utils/storage';
import { BookCover3D } from './components/BookCover3D';
import { CartCheckoutDrawer } from './components/CartCheckoutDrawer';
import { RecentSalesToast } from './components/RecentSalesToast';
import { Footer } from './components/Footer';
import reviewerRahulImage from './assets/images/reviewer_rahul_verma_1795762763568.jpg';
import reviewerRiyaImage from './assets/images/reviewer_riya_sharma_1795762765996.jpg';
import reviewerAmitImage from './assets/images/reviewer_amit_kumar_1795762766879.jpg';

const EBOOK_BENEFITS = [
  '₹0 से शुरुआत करने का स्टेप-बाय-स्टेप एक्शन प्लान',
  'मोबाइल से ऑनलाइन कमाई के सुरक्षित तरीके',
  'कंसिस्टेंसी और सही माइंडसेट का सीक्रेट (90-Day Challenge)',
  '25+ प्रैक्टिकल टूल्स और पैसिव इनकम आइडियाज',
];

const BOOK_PILLARS = [
  {
    icon: BookOpen,
    title: 'Easy Hindi',
    detail: 'आसान भाषा · Hindi + English',
  },
  {
    icon: Smartphone,
    title: 'Smartphone Ready',
    detail: 'No laptop required to start',
  },
  {
    icon: Wallet,
    title: 'No Investment',
    detail: '₹0 से शुरुआत · Zero risk',
  },
];

const READER_REVIEWS = [
  {
    id: 'rahul-verma',
    quote:
      'विश्वास नहीं हो रहा था कि ₹99 में इतनी सटीक जानकारी मिलेगी। Action Plan सच में बहुत आसान है!',
    name: 'Rahul Verma',
    role: 'College Student, Lucknow',
    initials: 'RV',
    rating: 5,
    imageUrl: reviewerRahulImage,
    alt: 'Rahul Verma, College Student from Lucknow',
  },
  {
    id: 'riya-sharma',
    quote:
      'इस बुक के प्रैक्टिकल आइडियाज़ और बिना इन्वेस्टमेंट वाले तरीके सच में असरदार हैं। पढ़ने के 2 हफ्ते बाद ही मेरी रेगुलर ऑनलाइन अर्निंग शुरू हो गई।',
    name: 'रिया शर्मा',
    role: 'बी.कॉम स्टूडेंट, जयपुर',
    initials: 'RS',
    rating: 5,
    imageUrl: reviewerRiyaImage,
    alt: 'Riya Sharma, B.Com Student from Jaipur',
  },
  {
    id: 'amit-kumar',
    quote:
      'थैंक्स भाई! मैं इस बुक को पढ़ने के बाद महीने का ₹20-30k आसानी से कमा रहा हूँ। इसमें दिए गए स्टेप-बाय-स्टेप तरीके और प्रैक्टिकल टिप्स सच में बहुत काम के हैं।',
    name: 'अमित कुमार',
    role: 'फ्रीलांसर, पटना',
    initials: 'AK',
    rating: 5,
    imageUrl: reviewerAmitImage,
    alt: 'Amit Kumar, Freelancer from Patna',
  },
];

const FAQ_ITEMS = [
  {
    question: 'Is this suitable for beginners?',
    answer:
      'Yes. The 30-day roadmap is written in simple Hindi + English specifically for beginners starting from ₹0 with no prior online earning or technical experience.',
  },
  {
    question: "What if I don't like the ebook?",
    answer:
      'If you read the blueprint and feel it did not give you practical value, simply reply to your delivery email or WhatsApp message within 7 days for a full, hassle-free refund.',
  },
  {
    question: 'How and when will I receive the eBook PDF?',
    answer:
      'Immediately after your ₹99 payment is confirmed, the full PDF unlocks on screen for instant download, and a backup download link is sent to both your Email and WhatsApp.',
  },
  {
    question: 'Do I need a laptop or extra investment to start?',
    answer:
      'No laptop or upfront capital is required. Every starting track in the blueprint is designed to be executed directly from your smartphone with ₹0 investment.',
  },
  {
    question: 'Is this a printed book or a digital PDF?',
    answer:
      'This is a digital eBook (Soft Copy PDF) so you can start reading on your phone within seconds with zero waiting or shipping charges.',
  },
];

const OFFER_DURATION_SECONDS = 2 * 60 * 60;
const OFFER_DEADLINE_KEY = 'kamaomoney_launch_offer_deadline_v1';

function getInitialRemainingSeconds(): number {
  try {
    const stored = window.localStorage.getItem(OFFER_DEADLINE_KEY);
    if (stored) {
      const deadline = Number(stored);
      const diff = Math.floor((deadline - Date.now()) / 1000);
      if (Number.isFinite(diff) && diff > 0 && diff <= OFFER_DURATION_SECONDS) {
        return diff;
      }
    }
    const nextDeadline = Date.now() + OFFER_DURATION_SECONDS * 1000;
    window.localStorage.setItem(OFFER_DEADLINE_KEY, String(nextDeadline));
  } catch {
    // Fallback to in-memory 2-hour countdown when storage is unavailable
  }
  return OFFER_DURATION_SECONDS;
}

function formatCountdown(totalSeconds: number): string {
  const clamped = Math.max(0, totalSeconds);
  const hrs = Math.floor(clamped / 3600);
  const mins = Math.floor((clamped % 3600) / 60);
  const secs = clamped % 60;
  return [hrs, mins, secs].map((unit) => String(unit).padStart(2, '0')).join(':');
}

export default function App() {
  const book = FLAGSHIP_BOOK;
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [failedAvatars, setFailedAvatars] = useState<Record<string, boolean>>({});
  const [remainingSeconds, setRemainingSeconds] = useState<number>(() =>
    getInitialRemainingSeconds()
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const handleOrderComplete = (newOrder: Order) => {
    const existing = loadOrders();
    saveOrders([newOrder, ...existing]);
  };

  return (
    <div className="min-h-screen bg-[#FAF7EE] text-[#132B23] flex flex-col">
      {/* Top Split Promotional Strip */}
      <div className="w-full flex items-stretch text-[9.5px] sm:text-[13px] font-extrabold tracking-[0.02em] sm:tracking-[0.04em] uppercase leading-none select-none overflow-hidden">
        <div className="flex-[1.18] sm:flex-[1.15] bg-gradient-to-r from-[#E6CE88] via-[#DFC26E] to-[#D7B65E] text-[#152D24] py-2.5 pr-2 sm:pr-3.5 pl-2 flex items-center justify-end gap-1 sm:gap-1.5 text-right whitespace-nowrap">
          <span aria-hidden="true" className="text-[#B88416] text-[10px] sm:text-[14px]">
            ⚡
          </span>
          <span>LIMITED LAUNCH OFFER: 75% OFF</span>
        </div>
        <div className="flex-1 bg-[#113A2B] text-[#F5E8C2] py-2.5 pl-2 sm:pl-3.5 pr-2 flex items-center justify-start gap-1 sm:gap-2 text-left whitespace-nowrap">
          <span>ENDS TODAY</span>
          <span aria-hidden="true" className="text-[#E6C56A]/60">
            ·
          </span>
          <span
            className="font-mono text-[9.5px] sm:text-[12.5px] font-semibold tracking-[0.04em] sm:tracking-[0.06em] text-[#E9CF82] tabular-nums"
            aria-live="off"
            aria-label={`Offer ends in ${formatCountdown(remainingSeconds)}`}
          >
            {formatCountdown(remainingSeconds)}
          </span>
          <span aria-hidden="true" className="text-[#E6C56A] text-[10px] sm:text-[14px]">
            ⚡
          </span>
        </div>
      </div>

      {/* Minimal Header Bar */}
      <header className="w-full bg-[#FCF9F2] border-b border-[#EAE3D2]">
        <div className="mx-auto max-w-[780px] px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
          <a
            href="#top"
            className="text-[20px] sm:text-[22px] font-extrabold tracking-tight text-[#122921] whitespace-nowrap shrink-0"
          >
            KAMAOMONEY
          </a>

          <div className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5DEC9] bg-white px-3 py-1.5 text-[13px] sm:text-[14px] whitespace-nowrap shrink-0 shadow-[0_1px_2px_rgba(19,43,35,0.04)]">
            <span className="font-bold text-[#122921] tabular-nums">4.9</span>
            <Star className="h-4 w-4 fill-[#F0B429] text-[#F0B429]" aria-hidden="true" />
            <span className="text-[#3C4F47] font-medium tabular-nums">(1,240+ Readers)</span>
          </div>
        </div>
      </header>

      {/* Focused Single-Page Sales Canvas */}
      <main id="top" className="flex-1 mx-auto w-full max-w-[780px] px-5 sm:px-8 pt-8 sm:pt-11 pb-14">
        {/* Centered Headline & Subheadline */}
        <section className="text-center max-w-[660px] mx-auto">
          <h1 className="text-[28px] sm:text-[40px] md:text-[44px] font-extrabold leading-[1.24] tracking-[-0.015em] text-[#132B23]">
            घर बैठे अपने स्मार्टफोन से ₹0 से ₹1 Lakh/Month तक पहुँचने का असली 30-Day Roadmap!
          </h1>
          <p className="mt-4 text-[16px] sm:text-[20px] font-medium leading-[1.5] text-[#1D342C]">
            बिना किसी फालतू Shortcuts के—Step-by-Step Practical Blueprint जो सच में काम करता है।
          </p>
        </section>

        {/* Hero Product & Pricing Split */}
        <section className="mt-8 sm:mt-11 grid grid-cols-1 md:grid-cols-[1.08fr_0.92fr] gap-8 sm:gap-10 items-center">
          {/* Left: 3D eBook Mockup */}
          <div className="flex justify-center">
            <BookCover3D book={book} size="lg" showPdfRibbon />
          </div>

          {/* Right: Offer Box + Primary CTA + Trust Strip */}
          <div className="w-full max-w-[340px] mx-auto md:max-w-none flex flex-col">
            {/* Price Card */}
            <div className="rounded-2xl border border-[#E5DEC9] bg-white p-4 sm:p-5 shadow-[0_8px_24px_rgba(19,43,35,0.05)] text-center">
              <div className="rounded-lg bg-[#F1ECE0] px-3 py-2 text-[12px] sm:text-[13px] font-extrabold tracking-[0.04em] uppercase text-[#132B23]">
                75% OFF LAST CHANCE
              </div>
              <div className="mt-4 mb-1 flex items-baseline justify-center gap-3 tabular-nums">
                <span className="text-[50px] sm:text-[56px] font-extrabold leading-none tracking-tight text-[#122921]">
                  ₹{book.price}
                </span>
                <span className="text-[26px] sm:text-[30px] font-semibold leading-none text-[#C8433B] line-through decoration-2 decoration-[#C8433B]">
                  ₹{book.originalPrice}
                </span>
              </div>
            </div>

            {/* Primary CTA Button */}
            <button
              type="button"
              onClick={() => setCheckoutOpen(true)}
              className="mt-4 w-full rounded-xl bg-gradient-to-b from-[#1F6F48] via-[#175B3B] to-[#11462D] hover:from-[#1B6340] hover:to-[#0E3A25] px-5 py-4 text-center shadow-[0_10px_22px_rgba(18,74,48,0.28)] border border-[#2D865A]/40 transition-all duration-150 active:scale-[0.99] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#144532]"
            >
              <span className="block text-[16px] sm:text-[18px] font-extrabold tracking-[0.03em] uppercase text-[#FBF2D5] leading-snug">
                GET THE EBOOK
              </span>
              <span className="mt-0.5 inline-flex items-center justify-center gap-1.5 text-[16px] sm:text-[18px] font-extrabold tracking-[0.03em] uppercase text-[#FBF2D5] leading-snug tabular-nums">
                <span>NOW FOR ₹{book.price}</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.6]" />
              </span>
            </button>

            {/* Instant Delivery Note */}
            <p className="mt-4 text-center text-[15px] sm:text-[16px] font-medium leading-[1.4] text-[#1A3129]">
              Instant PDF Download via
              <br />
              Email &amp; WhatsApp
            </p>

            {/* Trust & Payment Marks */}
            <div className="mt-4 flex flex-col items-center">
              <span className="text-[12px] font-semibold text-[#3C5048]">Trust</span>
              <div
                className="mt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
                aria-label="Accepted payment methods: Google Pay, PhonePe, Paytm, UPI, Visa, Mastercard"
              >
                {/* Google Pay */}
                <span className="inline-flex h-6 w-6 items-center justify-center" title="Google Pay">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path d="M12.2 10.2v3.9h5.4c-.2 1.3-1.5 3.8-5.4 3.8-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C17 3.3 14.8 2.4 12.2 2.4 6.9 2.4 2.6 6.7 2.6 12s4.3 9.6 9.6 9.6c5.5 0 9.2-3.9 9.2-9.4 0-.6-.1-1.1-.2-1.6h-9z" fill="#4285F4" />
                    <path d="M3.7 7.6l3.2 2.3C7.7 7.9 9.8 6.4 12.2 6.4c1.9 0 3.1.8 3.8 1.5l2.6-2.5C17 3.3 14.8 2.4 12.2 2.4 8.5 2.4 5.3 4.5 3.7 7.6z" fill="#EA4335" />
                    <path d="M12.2 21.6c2.6 0 4.8-.9 6.4-2.3l-3-2.4c-.8.6-1.9 1-3.4 1-2.6 0-4.9-1.8-5.7-4.2l-3.2 2.5c1.6 3.2 4.9 5.4 8.9 5.4z" fill="#34A853" />
                    <path d="M6.5 13.7c-.2-.6-.3-1.2-.3-1.8s.1-1.2.3-1.8L3.3 7.6C2.8 8.9 2.6 10.4 2.6 12s.2 3.1.7 4.4l3.2-2.7z" fill="#FBBC05" />
                  </svg>
                </span>

                {/* PhonePe */}
                <span
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#5F259F] text-[12px] font-bold text-white leading-none"
                  title="PhonePe"
                >
                  पे
                </span>

                {/* Paytm */}
                <span className="text-[12px] font-extrabold tracking-tight leading-none" title="Paytm">
                  <span className="text-[#002970]">Pay</span>
                  <span className="text-[#00BAF2]">tm</span>
                </span>

                {/* UPI */}
                <span className="inline-flex items-center text-[11px] font-extrabold tracking-tight text-[#4A4A4A] italic leading-none" title="UPI">
                  UPI
                  <span className="ml-0.5 text-[#097939] not-italic font-black">▸</span>
                </span>

                {/* VISA */}
                <span
                  className="text-[12px] font-black tracking-tight italic text-[#1A1F71] leading-none"
                  title="Visa"
                >
                  VISA
                </span>

                {/* Mastercard */}
                <span className="inline-flex items-center" title="Mastercard">
                  <span className="h-4 w-4 rounded-full bg-[#EB001B]" />
                  <span className="-ml-1.5 h-4 w-4 rounded-full bg-[#F79E1B]/90" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* What You Will Get Checklist */}
        <section id="benefits" className="mt-11 sm:mt-14 scroll-mt-6">
          <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#132B23] tracking-[-0.01em]">
            इस eBook में आपको क्या मिलेगा?
          </h2>

          <ul className="mt-5 space-y-3.5">
            {EBOOK_BENEFITS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#154A34] text-white"
                >
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </span>
                <span className="text-[16px] sm:text-[18px] font-medium leading-[1.45] text-[#172D25]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Key Book Pillars (3 Compact Icon-Card Squares) */}
        <section id="pillars" className="mt-8 sm:mt-10 scroll-mt-6" aria-label="Key pillars of this eBook">
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
            {BOOK_PILLARS.map(({ icon: Icon, title, detail }) => (
              <div
                key={title}
                className="flex flex-col items-center justify-center text-center rounded-2xl border border-[#E5DEC9] bg-[#FDFCF8] px-2.5 py-4 sm:p-5 min-h-[126px] sm:min-h-[146px] shadow-[0_4px_16px_rgba(19,43,35,0.04)]"
              >
                <div
                  aria-hidden="true"
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#154A34]"
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-[13px] sm:text-[15px] font-bold leading-tight text-[#132B23]">
                  {title}
                </h3>
                <p className="mt-1 text-[11px] sm:text-[12.5px] leading-snug text-[#465B52]">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Reader Reviews Section (3-Column Grid) */}
        <section
          id="reviews"
          className="mt-9 sm:mt-11 scroll-mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch"
          aria-label="Reader Reviews"
        >
          {READER_REVIEWS.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-[#E5DEC9] bg-[#FDFCF8] p-4 sm:p-5 shadow-[0_8px_24px_rgba(19,43,35,0.06)] flex flex-col justify-between h-full"
            >
              <div>
                {/* Top: Reviewer Portrait & Rating */}
                <div className="flex items-center justify-between gap-3">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[#E5DEC9] bg-[#EAF4EE] flex items-center justify-center">
                    {!failedAvatars[review.id] ? (
                      <img
                        src={review.imageUrl}
                        alt={review.alt}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedAvatars((prev) => ({ ...prev, [review.id]: true }))
                        }
                        className="h-full w-full object-cover object-top"
                      />
                    ) : (
                      <span className="text-base font-extrabold text-[#154A34] tracking-tight">
                        {review.initials}
                      </span>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[13px] font-bold text-[#132B23] tabular-nums">
                    <span>{review.rating}</span>
                    <Star className="h-3.5 w-3.5 fill-[#F0B429] text-[#F0B429]" aria-hidden="true" />
                  </span>
                </div>

                {/* Quote */}
                <p className="mt-3.5 text-[14px] sm:text-[14.5px] font-bold leading-[1.55] text-[#132B23]">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              {/* Author Attribution */}
              <div className="mt-4 pt-3 border-t border-[#EFEADF]">
                <p className="text-[13.5px] font-bold text-[#132B23] leading-snug">
                  {review.name}
                </p>
                <p className="mt-0.5 text-[12px] font-medium text-[#465B52] leading-snug">
                  {review.role}
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* Simple Collapsible FAQ Section */}
        <section id="faq" className="mt-10 sm:mt-12 scroll-mt-6" aria-labelledby="faq-heading">
          <h2
            id="faq-heading"
            className="text-[20px] sm:text-[24px] font-extrabold text-[#132B23] tracking-[-0.01em]"
          >
            Frequently Asked Questions
          </h2>

          <div className="mt-4 rounded-2xl border border-[#E5DEC9] bg-[#FDFCF8] divide-y divide-[#EAE3D2] shadow-[0_6px_20px_rgba(19,43,35,0.04)]">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              const panelId = `faq-panel-${idx}`;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] sm:text-[16px] font-semibold text-[#132B23] hover:bg-[#F7F3E7]/70 transition-colors duration-150 first:rounded-t-2xl last:rounded-b-2xl cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#144532]"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-4 w-4 shrink-0 text-[#154A34] transition-transform duration-150 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      id={panelId}
                      className="px-5 pb-4 pt-0.5 text-[14px] sm:text-[15px] leading-[1.6] text-[#354A42]"
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Dedicated Footer */}
      <Footer price={book.price} onOpenCheckout={() => setCheckoutOpen(true)} />

      {/* Subtle Recent Sales Toast */}
      <RecentSalesToast hidden={checkoutOpen} />

      {/* Instant Checkout Drawer */}
      <CartCheckoutDrawer
        isOpen={checkoutOpen}
        book={book}
        onClose={() => setCheckoutOpen(false)}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
}
