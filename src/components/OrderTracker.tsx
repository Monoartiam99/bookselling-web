import React, { useState, useEffect } from 'react';
import {
  Search,
  RefreshCw,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Mail,
} from 'lucide-react';
import { Order } from '../types/bookstore';

interface OrderTrackerProps {
  orders: Order[];
  highlightedOrderId: string | null;
  onAdvanceOrderStatus: (orderId: string) => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  orders,
  highlightedOrderId,
  onAdvanceOrderStatus,
}) => {
  const [lookupInput, setLookupInput] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    highlightedOrderId || orders[0]?.id || ''
  );
  const [lookupError, setLookupError] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (highlightedOrderId) {
      setSelectedOrderId(highlightedOrderId);
      setLookupError('');
    }
  }, [highlightedOrderId]);

  const activeOrder =
    orders.find((o) => o.id === selectedOrderId) || orders[0] || null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = lookupInput.trim().toLowerCase();
    if (!q) return;
    const match = orders.find(
      (o) =>
        o.id.toLowerCase() === q ||
        o.email.toLowerCase().includes(q) ||
        o.whatsapp.replace(/\s+/g, '').includes(q.replace(/\s+/g, ''))
    );
    if (match) {
      setSelectedOrderId(match.id);
      setLookupError('');
    } else {
      setLookupError(
        `No order matched "${lookupInput}". Try sample order ID KM-2026-4819 or place a new soft copy order.`
      );
    }
  };

  const handleRefreshLive = () => {
    if (!activeOrder) return;
    setIsRefreshing(true);
    setTimeout(() => {
      onAdvanceOrderStatus(activeOrder.id);
      setIsRefreshing(false);
    }, 500);
  };

  const completedCount = activeOrder
    ? activeOrder.milestones.filter((m) => m.completed).length
    : 0;
  const totalMilestones = activeOrder ? activeOrder.milestones.length : 1;
  const progressPercent = Math.round((completedCount / totalMilestones) * 100);
  const canAdvance = activeOrder && completedCount < totalMilestones;

  return (
    <section
      id="track-order"
      aria-labelledby="track-order-heading"
      className="border-t border-[#E6DEC9] bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium text-[#546860]">
              Real-Time Digital Fulfillment & Download Vault
            </p>
            <h2
              id="track-order-heading"
              className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#132B23]"
            >
              Track Your Soft Copy Order
            </h2>
            <p className="mt-2 text-sm text-[#4A5E56]">
              Verify payment confirmation, Email & WhatsApp dispatch status, and re-download your licensed PDF soft copy anytime using your Order ID or email.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex w-full max-w-md gap-2">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7D75]"
                aria-hidden="true"
              />
              <input
                type="text"
                value={lookupInput}
                onChange={(e) => setLookupInput(e.target.value)}
                placeholder="Order ID (e.g. KM-2026-4819) or Email"
                aria-label="Search order by ID or email"
                className="w-full rounded-lg border border-[#DCD3BD] bg-[#FAF7F0] py-2.5 pl-10 pr-3.5 text-sm text-[#132B23] placeholder:text-[#7E8C86] focus:border-[#144532] focus:bg-white focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-[#144532] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0D3324] transition-colors whitespace-nowrap shrink-0"
            >
              Track
            </button>
          </form>
        </div>

        {lookupError && (
          <p className="mt-3 text-xs font-medium text-[#9E2A2B]">{lookupError}</p>
        )}

        {orders.length > 1 && (
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-[#546860] whitespace-nowrap shrink-0">
              Your Orders:
            </span>
            {orders.map((ord) => {
              const active = activeOrder?.id === ord.id;
              return (
                <button
                  key={ord.id}
                  type="button"
                  onClick={() => {
                    setSelectedOrderId(ord.id);
                    setLookupError('');
                  }}
                  className={`rounded-lg border px-3 py-1.5 font-mono text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'border-[#144532] bg-[#144532] text-white'
                      : 'border-[#DCD3BD] bg-[#FAF7F0] text-[#132B23] hover:border-[#144532]'
                  }`}
                >
                  {ord.id}
                </button>
              );
            })}
          </div>
        )}

        {activeOrder && (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Digital Fulfillment Timeline */}
            <div className="lg:col-span-7 rounded-2xl border border-[#E5DEC9] bg-[#FAF7F0] p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5DEC9] pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#546860]">
                    <span className="font-mono font-semibold text-[#132B23] tabular-nums">
                      {activeOrder.id}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Placed {activeOrder.createdAt}</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-[#144532]">
                    {activeOrder.estimatedDelivery}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleRefreshLive}
                  disabled={isRefreshing || !canAdvance}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCD3BD] bg-white px-3.5 py-2 text-xs font-semibold text-[#132B23] transition-colors hover:border-[#144532] disabled:opacity-55 whitespace-nowrap shrink-0"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>
                    {canAdvance ? 'Refresh Live Status' : 'Delivery Verified'}
                  </span>
                </button>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-[#4A5E56] mb-1.5">
                  <span>Digital Delivery Progress</span>
                  <span className="font-mono font-semibold text-[#132B23] tabular-nums">
                    {progressPercent}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#E5DEC9]">
                  <div
                    className="h-full rounded-full bg-[#144532] transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <ol className="mt-6 space-y-5">
                {activeOrder.milestones.map((m, idx) => {
                  const isLast = idx === activeOrder.milestones.length - 1;
                  return (
                    <li key={m.id} className="relative flex gap-3.5">
                      {!isLast && (
                        <span
                          aria-hidden="true"
                          className={`absolute left-[9px] top-6 h-[calc(100%+8px)] w-[1.5px] ${
                            m.completed ? 'bg-[#144532]' : 'bg-[#DCD3BD]'
                          }`}
                        />
                      )}
                      <div className="relative z-10 mt-0.5 shrink-0">
                        {m.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-[#144532] bg-[#FAF7F0] rounded-full" />
                        ) : (
                          <Clock className="h-5 w-5 text-[#9AA6A0] bg-[#FAF7F0] rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p
                            className={`text-sm font-semibold ${
                              m.completed ? 'text-[#132B23]' : 'text-[#73837C]'
                            }`}
                          >
                            {m.label}
                          </p>
                          <span className="font-mono text-[11px] text-[#5B6F67] tabular-nums">
                            {m.timestamp}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-[#546860] leading-relaxed">
                          {m.detail}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Soft Copy Download Vault */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="rounded-2xl border border-[#E5DEC9] bg-white p-6 space-y-4">
                <h3 className="font-serif text-lg font-semibold text-[#132B23]">
                  Digital Soft Copy Vault
                </h3>

                <div className="divide-y divide-[#EFEADF]">
                  {activeOrder.items.map((item, idx) => (
                    <div key={`${item.bookId}-${idx}`} className="py-3 first:pt-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#132B23]">{item.title}</p>
                          <p className="text-xs text-[#546860] mt-0.5">
                            {item.format} · Qty {item.quantity}
                          </p>
                        </div>
                        <span className="font-mono text-sm font-semibold text-[#132B23] tabular-nums">
                          ₹{item.unitPrice * item.quantity}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <a
                          href={item.pdfAssetUrl}
                          download="The_Complete_Earn_Money_Online_Blueprint.pdf"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#144532] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#0D3324] transition-colors"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>Download Full PDF</span>
                        </a>
                        <a
                          href={item.pdfAssetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#144532] hover:underline underline-offset-4"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          <span>Open in Browser</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <dl className="space-y-2 border-t border-[#E5DEC9] pt-4 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-[#546860]">Licensed Reader</dt>
                    <dd className="font-medium text-[#132B23]">{activeOrder.customerName}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#546860]">Payment Ref</dt>
                    <dd className="font-mono text-[#132B23] tabular-nums">
                      {activeOrder.transactionRef}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#546860]">Total Paid</dt>
                    <dd className="font-mono font-semibold text-[#144532] tabular-nums">
                      ₹{activeOrder.total}
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-[#E5DEC9] pt-4 text-xs text-[#546860] flex items-start gap-2">
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#144532]" />
                  <span>
                    Digital delivery dispatched to{' '}
                    <span className="font-medium text-[#132B23]">{activeOrder.email}</span> &{' '}
                    <span className="font-medium text-[#132B23]">{activeOrder.whatsapp}</span>.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
