export type ChapterTrack =
  | 'Mindset & Zero-Investment'
  | 'YouTube & Social Media'
  | 'Skills & Freelancing'
  | 'E-Commerce & Business'
  | 'Cyber Safety & Roadmap';

export type RoadmapPhase = 'Days 1–7' | 'Days 8–30' | 'Days 31–90';

export type BookFormat = 'eBook PDF (Soft Copy)';

export type BookLanguage = 'Hindi + English';

export type CoverTheme = 'emerald-gold';

export interface ChapterItem {
  id: string;
  number: string;
  title: string;
  hindiTitle: string;
  track: ChapterTrack;
  phase: RoadmapPhase;
  pagesLabel: string;
  readMinutes: number;
  summary: string;
  tags: string[];
  keyTools: string[];
  excerpt: string;
}

export interface SampleExcerpt {
  heading: string;
  subheading: string;
  paragraphs: string[];
  keyTakeaways: string[];
}

export interface BookReview {
  id: string;
  readerName: string;
  role: string;
  city: string;
  rating: number;
  comment: string;
  verified: boolean;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  hindiHeadline: string;
  author: string;
  language: BookLanguage;
  format: BookFormat;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  pages: number;
  publishedYear: number;
  isbn: string;
  editionNote: string;
  pdfAssetUrl: string;
  coverTheme: CoverTheme;
  coverKicker: string;
  coverBadgeText: string;
  spineLabel: string;
  description: string;
  highlights: string[];
  chapters: ChapterItem[];
  sampleExcerpt: SampleExcerpt;
  reviews: BookReview[];
}

export interface CartItem {
  bookId: string;
  format: BookFormat;
  quantity: number;
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking';

export interface OrderMilestone {
  id: string;
  label: string;
  detail: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  email: string;
  whatsapp: string;
  items: Array<{
    bookId: string;
    title: string;
    format: BookFormat;
    quantity: number;
    unitPrice: number;
    pdfAssetUrl: string;
  }>;
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  transactionRef: string;
  deliveryChannel: string;
  estimatedDelivery: string;
  statusStep: number;
  milestones: OrderMilestone[];
}

export interface UserBehavior {
  viewedChapterIds: string[];
  trackClicks: Record<string, number>;
  searchQueries: string[];
  hasPurchasedSoftCopy: boolean;
  preferredPhase?: RoadmapPhase;
}

export interface RecommendedChapter {
  chapter: ChapterItem;
  score: number;
  reason: string;
}

export interface ChapterFilterState {
  query: string;
  track: 'All' | ChapterTrack;
  phase: 'All' | RoadmapPhase;
  sortBy: 'recommended' | 'order' | 'quickest';
}
