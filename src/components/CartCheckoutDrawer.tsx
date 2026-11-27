import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Building2,
  Lock,
  CheckCircle2,
  Download,
  ArrowRight,
  ChevronLeft,
} from 'lucide-react';
import { Book, Order, PaymentMethod } from '../types/bookstore';

interface CartCheckoutDrawerProps {
  isOpen: boolean;
  book: Book;
  onClose: () => void;
  onOrderComplete: (order: Order) => void;
}

type CheckoutStep = 'details' | 'payment' | 'processing' | 'confirmed';

const BANKS = ['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra'];

function formatCardNumber(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
}

function formatExpiry(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
}

function detectCardBrand(num: string): string {
  const clean = num.replace(/\D/g, '');
  if (clean.startsWith('4')) return 'Visa';
  if (/^(5[1-5]|2[2-7])/.test(clean)) return 'Mastercard';
  if (/^(60|65|81|82|508)/.test(clean)) return 'RuPay';
  return 'Card';
}

export const CartCheckoutDrawer: React.FC<CartCheckoutDrawerProps> = ({
  isOpen,
  book,
  onClose,
  onOrderComplete,
}) => {
  const [step, setStep] = useState<CheckoutStep>('details');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [formError, setFormError] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('');
  const [upiApp, setUpiApp] = useState<'GPay' | 'PhonePe' | 'Paytm' | 'UPI'>('GPay');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState(BANKS[0]);
  const [paymentError, setPaymentError] = useState('');

  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const total = book.price;

  const handleClose = () => {
    if (step === 'confirmed') {
      setStep('details');
      setConfirmedOrder(null);
    }
    onClose();
  };

  const handleDetailsContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !email.trim() || !email.includes('@')) {
      setFormError('Please enter your full name and a valid email address for PDF delivery.');
      return;
    }
    if (whatsapp.replace(/\D/g, '').length < 10) {
      setFormError('Please enter a valid 10-digit WhatsApp number to receive your eBook PDF.');
      return;
    }
    setFormError('');
    setStep('payment');
  };

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'upi') {
      if (upiId.trim() && !upiId.includes('@')) {
        setPaymentError(
          'Enter a valid UPI ID (e.g. name@okaxis) or leave blank to approve via your selected UPI app.'
        );
        return;
      }
    } else if (paymentMethod === 'card') {
      const digits = cardNumber.replace(/\D/g, '');
      if (digits.length < 16) {
        setPaymentError('Please enter a valid 16-digit card number.');
        return;
      }
      if (!cardName.trim() || cardExpiry.length < 5 || cardCvv.length < 3) {
        setPaymentError('Please complete cardholder name, expiry (MM/YY), and CVV.');
        return;
      }
    }

    setPaymentError('');
    setStep('processing');

    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      const orderNum = `KM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const txRef =
        paymentMethod === 'upi'
          ? `UPI-${Math.floor(100000000000 + Math.random() * 899999999999)}`
          : paymentMethod === 'card'
          ? `CRD-${Math.floor(1000000000 + Math.random() * 8999999999)}`
          : `NBK-${Math.floor(1000000000 + Math.random() * 8999999999)}`;

      const newOrder: Order = {
        id: orderNum,
        createdAt: timeStr,
        customerName: customerName.trim(),
        email: email.trim(),
        whatsapp: whatsapp.trim(),
        items: [
          {
            bookId: book.id,
            title: book.title,
            format: 'eBook PDF (Soft Copy)',
            quantity: 1,
            unitPrice: total,
            pdfAssetUrl: book.pdfAssetUrl,
          },
        ],
        subtotal: book.originalPrice,
        discount: book.originalPrice - total,
        total,
        paymentMethod,
        transactionRef: txRef,
        deliveryChannel: 'Instant PDF Download via Email & WhatsApp',
        estimatedDelivery: 'Instant Download Ready',
        statusStep: 3,
        milestones: [
          {
            id: 'd1',
            label: 'Payment Verified',
            detail: `${paymentMethod.toUpperCase()} transaction ${txRef} approved for ₹${total}`,
            timestamp: timeStr,
            completed: true,
          },
          {
            id: 'd2',
            label: 'PDF Unlocked & Sent',
            detail: `Sent to ${email.trim()} and ${whatsapp.trim()}`,
            timestamp: timeStr,
            completed: true,
            current: true,
          },
        ],
      };

      setConfirmedOrder(newOrder);
      onOrderComplete(newOrder);
      setStep('confirmed');
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#0D1E18]/55 backdrop-blur-[2px]"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Instant eBook PDF Checkout"
    >
      <div
        className="flex h-full w-full max-w-md flex-col bg-[#FAF7EE] shadow-2xl border-l border-[#E3DAC6]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5DEC9] bg-white px-5 py-4">
          <div className="flex items-center gap-2.5">
            {step === 'payment' && (
              <button
                type="button"
                onClick={() => setStep('details')}
                aria-label="Go back"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E3DAC6] text-[#132B23] hover:bg-[#F3EDE0]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
            <div>
              <h2 className="text-base font-bold text-[#132B23]">
                {step === 'details' && 'Instant PDF Checkout'}
                {step === 'payment' && 'Complete Payment (₹99)'}
                {step === 'processing' && 'Verifying Payment'}
                {step === 'confirmed' && 'eBook PDF Ready'}
              </h2>
              {step !== 'confirmed' && step !== 'processing' && (
                <p className="text-[11px] text-[#5B6F67]">
                  Step {step === 'details' ? '1' : '2'} of 2 · Instant Email & WhatsApp Delivery
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close checkout"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E3DAC6] text-[#132B23] hover:bg-[#F3EDE0]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {/* Compact Order Summary Banner */}
          {step !== 'confirmed' && step !== 'processing' && (
            <div className="mb-5 flex items-center justify-between rounded-xl border border-[#E5DEC9] bg-white p-4">
              <div className="min-w-0 pr-3">
                <p className="text-xs font-semibold text-[#144532]">75% OFF Launch Offer</p>
                <p className="mt-0.5 text-sm font-bold text-[#132B23] truncate">
                  {book.title} (eBook PDF)
                </p>
                <p className="text-xs text-[#546860]">Instant Soft Copy · Hindi + English</p>
              </div>
              <div className="text-right shrink-0 tabular-nums">
                <span className="block text-xl font-extrabold text-[#132B23]">₹{book.price}</span>
                <span className="block text-xs text-[#C8433B] line-through">
                  ₹{book.originalPrice}
                </span>
              </div>
            </div>
          )}

          {/* STEP 1: DETAILS */}
          {step === 'details' && (
            <form id="checkout-details-form" onSubmit={handleDetailsContinue} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#374C44] mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Rahul Verma"
                  className="w-full rounded-lg border border-[#DCD3BD] bg-white px-3.5 py-2.5 text-sm text-[#132B23] focus:border-[#144532] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#374C44] mb-1.5">
                  Email Address (for PDF & Receipt) *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-[#DCD3BD] bg-white px-3.5 py-2.5 text-sm text-[#132B23] focus:border-[#144532] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#374C44] mb-1.5">
                  WhatsApp Number (for Instant PDF Link) *
                </label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-lg border border-[#DCD3BD] bg-white px-3.5 py-2.5 text-sm text-[#132B23] focus:border-[#144532] focus:outline-none"
                />
              </div>

              {formError && <p className="text-xs font-medium text-[#9E2A2B]">{formError}</p>}
            </form>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 'payment' && (
            <form id="checkout-payment-form" onSubmit={handlePayNow} className="space-y-4">
              <div className="grid grid-cols-3 gap-2 rounded-xl bg-[#EFE9DA] p-1">
                {(
                  [
                    ['upi', 'UPI / QR', Smartphone],
                    ['card', 'Card', CreditCard],
                    ['netbanking', 'NetBanking', Building2],
                  ] as const
                ).map(([key, label, Icon]) => {
                  const active = paymentMethod === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setPaymentMethod(key);
                        setPaymentError('');
                      }}
                      className={`flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                        active
                          ? 'bg-white text-[#132B23] shadow-xs'
                          : 'text-[#546860] hover:text-[#132B23]'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>

              {paymentMethod === 'upi' && (
                <div className="rounded-xl border border-[#E5DEC9] bg-white p-4 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-[#132B23] mb-2">Select UPI App</p>
                    <div className="grid grid-cols-4 gap-2">
                      {(['GPay', 'PhonePe', 'Paytm', 'UPI'] as const).map((app) => (
                        <button
                          key={app}
                          type="button"
                          onClick={() => setUpiApp(app)}
                          className={`rounded-lg border py-2 text-xs font-semibold transition-colors ${
                            upiApp === app
                              ? 'border-[#144532] bg-[#F3F8F5] text-[#144532]'
                              : 'border-[#E5DEC9] bg-[#FAF7EE] text-[#4A5E56]'
                          }`}
                        >
                          {app}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#374C44] mb-1">
                      UPI ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder={`yourname@${upiApp.toLowerCase()}`}
                      className="w-full rounded-lg border border-[#DCD3BD] bg-[#FAF7EE] px-3.5 py-2.5 text-sm font-mono text-[#132B23] focus:border-[#144532] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="rounded-xl border border-[#E5DEC9] bg-white p-4 space-y-3.5">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-[#374C44]">Card Number *</label>
                      <span className="font-mono text-[11px] font-semibold text-[#144532]">
                        {detectCardBrand(cardNumber)}
                      </span>
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="4532 8910 2345 6789"
                      className="w-full rounded-lg border border-[#DCD3BD] bg-[#FAF7EE] px-3.5 py-2.5 text-sm font-mono text-[#132B23] focus:border-[#144532] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#374C44] mb-1">
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="RAHUL VERMA"
                      className="w-full rounded-lg border border-[#DCD3BD] bg-[#FAF7EE] px-3.5 py-2.5 text-sm text-[#132B23] focus:border-[#144532] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#374C44] mb-1">
                        Expiry (MM/YY) *
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                        placeholder="08/29"
                        className="w-full rounded-lg border border-[#DCD3BD] bg-[#FAF7EE] px-3.5 py-2.5 text-sm font-mono text-[#132B23] focus:border-[#144532] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#374C44] mb-1">CVV *</label>
                      <input
                        type="password"
                        inputMode="numeric"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="•••"
                        className="w-full rounded-lg border border-[#DCD3BD] bg-[#FAF7EE] px-3.5 py-2.5 text-sm font-mono text-[#132B23] focus:border-[#144532] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="rounded-xl border border-[#E5DEC9] bg-white p-4 space-y-2.5">
                  <p className="text-xs font-semibold text-[#132B23]">Select Your Bank</p>
                  {BANKS.map((bank) => (
                    <label
                      key={bank}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border px-3.5 py-2.5 text-sm transition-colors ${
                        selectedBank === bank
                          ? 'border-[#144532] bg-[#F3F8F5] font-medium text-[#132B23]'
                          : 'border-[#E8E0CE] bg-[#FAF7EE] text-[#4A5E56]'
                      }`}
                    >
                      <span>{bank}</span>
                      <input
                        type="radio"
                        name="netbank"
                        checked={selectedBank === bank}
                        onChange={() => setSelectedBank(bank)}
                        className="accent-[#144532]"
                      />
                    </label>
                  ))}
                </div>
              )}

              {paymentError && <p className="text-xs font-medium text-[#9E2A2B]">{paymentError}</p>}

              <div className="flex items-center gap-2 text-xs text-[#546860]">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#144532]" />
                <span>256-bit SSL encrypted checkout · Instant PDF delivery</span>
              </div>
            </form>
          )}

          {/* STEP 3: PROCESSING */}
          {step === 'processing' && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-[#E5DEC9] border-t-[#144532]" />
              <h3 className="mt-5 text-lg font-bold text-[#132B23]">Verifying Payment</h3>
              <p className="mt-1.5 text-xs text-[#546860]">
                Confirming ₹{total} and unlocking your eBook PDF...
              </p>
            </div>
          )}

          {/* STEP 4: CONFIRMED */}
          {step === 'confirmed' && confirmedOrder && (
            <div className="space-y-5">
              <div className="rounded-xl border border-[#CFE0D7] bg-[#F2F8F4] p-5">
                <div className="flex items-center gap-2.5 text-[#144532]">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-bold">Payment Successful — PDF Unlocked</span>
                </div>
                <p className="mt-2 font-mono text-xs text-[#385046] tabular-nums">
                  Order ID: {confirmedOrder.id}
                </p>
                <p className="mt-1 text-xs text-[#4C6259]">
                  Download link also sent to {confirmedOrder.email} & {confirmedOrder.whatsapp}.
                </p>
              </div>

              <div className="rounded-xl border border-[#E5DEC9] bg-white p-4 space-y-4">
                <div>
                  <p className="text-sm font-bold text-[#132B23]">{book.title}</p>
                  <p className="text-xs text-[#546860] mt-0.5">
                    Complete eBook PDF (Soft Copy) · Hindi + English
                  </p>
                </div>
                <a
                  href={book.pdfAssetUrl}
                  download="The_Complete_Earn_Money_Online_Blueprint.pdf"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#165A3B] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#10462D] transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Full eBook PDF Now</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        {step !== 'processing' && step !== 'confirmed' && (
          <div className="border-t border-[#E5DEC9] bg-white px-5 py-4 space-y-3">
            <div className="flex items-center justify-between text-sm font-bold text-[#132B23]">
              <span>Total Payable</span>
              <span className="font-mono text-base tabular-nums">₹{total}</span>
            </div>

            {step === 'details' && (
              <button
                type="submit"
                form="checkout-details-form"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#1E6E47] to-[#134D32] px-5 py-3.5 text-sm font-bold text-[#FBF4DC] hover:from-[#185D3B] hover:to-[#0F3F28] transition-all cursor-pointer"
              >
                <span>Continue to Payment · ₹{total}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}

            {step === 'payment' && (
              <button
                type="submit"
                form="checkout-payment-form"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#1E6E47] to-[#134D32] px-5 py-3.5 text-sm font-bold text-[#FBF4DC] hover:from-[#185D3B] hover:to-[#0F3F28] transition-all cursor-pointer"
              >
                <Lock className="h-4 w-4" />
                <span>Pay ₹{total} & Download PDF</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
