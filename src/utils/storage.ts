import { CartItem, Order, UserBehavior } from '../types/bookstore';
import { FLAGSHIP_PDF_URL } from '../data/books';

const STORAGE_KEYS = {
  CART: 'kamaomoney_cart_v2',
  BEHAVIOR: 'kamaomoney_behavior_v2',
  ORDERS: 'kamaomoney_orders_v2',
};

export const DEFAULT_BEHAVIOR: UserBehavior = {
  viewedChapterIds: [],
  trackClicks: {},
  searchQueries: [],
  hasPurchasedSoftCopy: false,
};

export function createSeedOrders(): Order[] {
  return [
    {
      id: 'KM-2026-4819',
      createdAt: '26 Nov 2026, 09:14 AM',
      customerName: 'Rahul Verma',
      email: 'rahul.verma@example.in',
      whatsapp: '+91 98210 44819',
      items: [
        {
          bookId: 'complete-earn-money-online',
          title: 'The Complete Earn Money Online',
          format: 'eBook PDF (Soft Copy)',
          quantity: 1,
          unitPrice: 99,
          pdfAssetUrl: FLAGSHIP_PDF_URL,
        },
      ],
      subtotal: 99,
      discount: 0,
      total: 99,
      paymentMethod: 'upi',
      transactionRef: 'UPI-633019482710',
      deliveryChannel: 'Instant Soft Copy PDF (Email + WhatsApp)',
      estimatedDelivery: 'Soft Copy Delivered · PDF Ready to Download',
      statusStep: 2,
      milestones: [
        {
          id: 'd1',
          label: 'Payment Verified (256-bit TLS)',
          detail: 'UPI transaction UPI-633019482710 cleared for ₹99',
          timestamp: '26 Nov, 09:14 AM',
          completed: true,
        },
        {
          id: 'd2',
          label: 'Digital Soft Copy Licensed & Packaged',
          detail: '86-page Hindi + English master PDF licensed to Rahul Verma',
          timestamp: '26 Nov, 09:14 AM',
          completed: true,
        },
        {
          id: 'd3',
          label: 'Dispatched to Email & WhatsApp',
          detail: 'Download link delivered to rahul.verma@example.in & WhatsApp',
          timestamp: '26 Nov, 09:15 AM',
          completed: true,
          current: true,
        },
        {
          id: 'd4',
          label: 'Download Confirmed in Reader Vault',
          detail: 'Click "Refresh Live Status" or download directly from your order vault',
          timestamp: 'Ready now',
          completed: false,
        },
      ],
    },
  ];
}

export function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CART);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadBehavior(): UserBehavior {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BEHAVIOR);
    if (!raw) return DEFAULT_BEHAVIOR;
    const parsed = JSON.parse(raw);
    return {
      viewedChapterIds: Array.isArray(parsed.viewedChapterIds) ? parsed.viewedChapterIds : [],
      trackClicks:
        parsed.trackClicks && typeof parsed.trackClicks === 'object' ? parsed.trackClicks : {},
      searchQueries: Array.isArray(parsed.searchQueries) ? parsed.searchQueries : [],
      hasPurchasedSoftCopy: Boolean(parsed.hasPurchasedSoftCopy),
      preferredPhase: parsed.preferredPhase,
    };
  } catch {
    return DEFAULT_BEHAVIOR;
  }
}

export function saveBehavior(behavior: UserBehavior): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BEHAVIOR, JSON.stringify(behavior));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) return createSeedOrders();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : createSeedOrders();
  } catch {
    return createSeedOrders();
  }
}

export function saveOrders(orders: Order[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  } catch {
    // Ignore storage quota errors
  }
}
