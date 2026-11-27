import React, { useState } from 'react';
import { Mail, MessageCircle, ShieldCheck, X } from 'lucide-react';

type PolicyKey = 'privacy' | 'refund' | 'disclaimer';

const POLICIES: Record<PolicyKey, { title: string; body: string[] }> = {
  privacy: {
    title: 'Privacy Policy',
    body: [
      'Your name, email address, and WhatsApp number are collected solely to deliver your digital eBook PDF and order receipt.',
      'We never sell, rent, or share reader contact details with third-party marketers. Payment processing runs over 256-bit SSL encryption.',
    ],
  },
  refund: {
    title: 'Terms & 7-Day Refund Policy',
    body: [
      'Purchasing this eBook grants a single-reader personal license to download and use the complete Hindi + English PDF manuscript.',
      'If you read through the blueprint and feel it did not deliver practical value, reply to your delivery email or WhatsApp message within 7 days of purchase for a prompt, full refund.',
    ],
  },
  disclaimer: {
    title: 'Educational & Earnings Disclaimer',
    body: [
      'This eBook provides structured educational guidance on digital skills, content creation, freelancing, and online business fundamentals.',
      'No specific income figure is guaranteed. Real-world outcomes depend entirely on individual effort, skill acquisition, consistency, and market conditions.',
    ],
  },
};

interface FooterProps {
  price: number;
  onOpenCheckout: () => void;
}

export const Footer: React.FC<FooterProps> = ({ price, onOpenCheckout }) => {
  const [activePolicy, setActivePolicy] = useState<PolicyKey | null>(null);

  return (
    <>
      <footer className="w-full border-t border-[#E5DEC9] bg-[#F4EFE2] text-[#2B4038]">
        <div className="mx-auto max-w-[780px] px-5 sm:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-[1.35fr_0.85fr_1fr] gap-8 pb-8 border-b border-[#E3DBC7]">
            {/* Brand Column */}
            <div>
              <a
                href="#top"
                className="text-[19px] font-extrabold tracking-tight text-[#122921] whitespace-nowrap"
              >
                KAMAOMONEY
              </a>
              <p className="mt-2.5 text-[13.5px] leading-[1.6] text-[#455A52] max-w-[280px]">
                Practical digital income, smartphone skill roadmaps, and cyber-safety blueprints in simple Hindi &amp; English.
              </p>
              <div className="mt-3.5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#154A34]">
                <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>256-bit SSL · Instant PDF Delivery</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-[13px] font-bold tracking-[0.02em] text-[#132B23]">
                Quick Links
              </h3>
              <ul className="mt-3 space-y-2 text-[13.5px] font-medium">
                <li>
                  <button
                    type="button"
                    onClick={onOpenCheckout}
                    className="text-[#154A34] font-semibold hover:underline cursor-pointer"
                  >
                    Get the eBook (₹{price})
                  </button>
                </li>
                <li>
                  <a href="#benefits" className="text-[#455A52] hover:text-[#132B23] hover:underline">
                    What&apos;s Inside
                  </a>
                </li>
                <li>
                  <a href="#pillars" className="text-[#455A52] hover:text-[#132B23] hover:underline">
                    Key Pillars
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-[#455A52] hover:text-[#132B23] hover:underline">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Reader Support */}
            <div>
              <h3 className="text-[13px] font-bold tracking-[0.02em] text-[#132B23]">
                Reader Support
              </h3>
              <ul className="mt-3 space-y-2.5 text-[13.5px] text-[#455A52]">
                <li>
                  <a
                    href="mailto:support@kamaomoney.in"
                    className="inline-flex items-center gap-2 hover:text-[#132B23] hover:underline"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-[#154A34]" aria-hidden="true" />
                    <span>support@kamaomoney.in</span>
                  </a>
                </li>
                <li className="inline-flex items-start gap-2">
                  <MessageCircle className="h-4 w-4 shrink-0 text-[#154A34] mt-0.5" aria-hidden="true" />
                  <span>Instant Email &amp; WhatsApp PDF delivery support (Mon–Sat)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Legal & Copyright Row */}
          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px] text-[#556961]">
            <p>© {new Date().getFullYear()} KamaoMoney Press. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-medium">
              <button
                type="button"
                onClick={() => setActivePolicy('privacy')}
                className="hover:text-[#132B23] hover:underline cursor-pointer"
              >
                Privacy Policy
              </button>
              <span aria-hidden="true" className="text-[#C7BEAA]">
                ·
              </span>
              <button
                type="button"
                onClick={() => setActivePolicy('refund')}
                className="hover:text-[#132B23] hover:underline cursor-pointer"
              >
                Refund Policy
              </button>
              <span aria-hidden="true" className="text-[#C7BEAA]">
                ·
              </span>
              <button
                type="button"
                onClick={() => setActivePolicy('disclaimer')}
                className="hover:text-[#132B23] hover:underline cursor-pointer"
              >
                Disclaimer
              </button>
            </div>
          </div>

          <p className="mt-4 text-[11.5px] leading-[1.55] text-[#667971]">
            Educational guide only. Earnings outcomes vary based on individual effort, skills, and consistent execution of the 30-day action plan.
          </p>
        </div>
      </footer>

      {/* Policy Modal */}
      {activePolicy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1E18]/55 backdrop-blur-[2px] p-4"
          onClick={() => setActivePolicy(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="policy-modal-title"
        >
          <div
            className="w-full max-w-md rounded-2xl border border-[#E5DEC9] bg-[#FAF7EE] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h3
                id="policy-modal-title"
                className="text-lg font-extrabold text-[#132B23]"
              >
                {POLICIES[activePolicy].title}
              </h3>
              <button
                type="button"
                onClick={() => setActivePolicy(null)}
                aria-label="Close dialog"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E3DAC6] text-[#132B23] hover:bg-[#EFE8D7] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-[14px] leading-[1.6] text-[#354A42]">
              {POLICIES[activePolicy].body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActivePolicy(null)}
              className="mt-6 w-full rounded-xl bg-[#154A34] px-4 py-2.5 text-sm font-bold text-[#FBF2D5] hover:bg-[#103B29] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
