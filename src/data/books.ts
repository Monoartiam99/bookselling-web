import { Book, ChapterTrack, RoadmapPhase } from '../types/bookstore';

export const FLAGSHIP_PDF_URL =
  '/assets/aistudio/THE_COMPLETE_EARN_MONEY_Online_Master_Ebook_Manuscript_150_Pages_e94c27fb.pdf';

export const FLAGSHIP_BOOK: Book = {
  id: 'complete-earn-money-online',
  slug: 'the-complete-earn-money-online',
  title: 'The Complete Earn Money Online',
  subtitle: '30 Days Practical Blueprint: Zero to ₹1 Lakh',
  hindiHeadline:
    'घर बैठे अपने स्मार्टफोन से ₹0 से ₹1 Lakh/Month तक पहुँचने का असली 30-Day Roadmap',
  author: 'KamaoMoney Editorial Press',
  language: 'Hindi + English',
  format: 'eBook PDF (Soft Copy)',
  price: 99,
  originalPrice: 399,
  rating: 4.9,
  reviewCount: 1248,
  pages: 86,
  publishedYear: 2026,
  isbn: '978-93-89421-01-4',
  editionNote: 'Digital Soft Copy (PDF) · 10 Complete Parts · Instant Download',
  pdfAssetUrl: FLAGSHIP_PDF_URL,
  coverTheme: 'emerald-gold',
  coverKicker: '30 DAYS PRACTICAL BLUEPRINT',
  coverBadgeText: 'ZERO TO ₹1 LAKH',
  spineLabel: 'EARN MONEY ONLINE · SOFT COPY EDITION',
  description:
    'No empty promises or overnight schemes. This complete 10-part bilingual (Hindi + English) digital manuscript takes you step by step from zero-investment online tasks and Creator Mindset to YouTube, Instagram/Telegram funnels, high-income freelancing skills, digital products, and cyber-fraud protection — delivered instantly as a clean, searchable PDF soft copy.',
  highlights: [
    '₹0 से शुरुआत करने का स्टेप-बाय-स्टेप 30-Day & 90-Day एक्शन प्लान',
    'मोबाइल से ऑनलाइन कमाई के सुरक्षित और वैध तरीके (Zero Financial Risk)',
    'कंसिस्टेंसी, Valley of Disappointment और सही माइंडसेट का सीक्रेट',
    '25+ प्रैक्टिकल टूल्स, Cold Outreach Scripts, Real Case Studies और साइबर सुरक्षा कवच',
  ],
  chapters: [
    {
      id: 'part-01',
      number: 'Part 01',
      title: 'The Psychology of Money & The Reality of Online Earning',
      hindiTitle: 'पैसे का मनोविज्ञान और ऑनलाइन कमाई की असली सच्चाई',
      track: 'Mindset & Zero-Investment',
      phase: 'Days 1–7',
      pagesLabel: 'Pages 2–8',
      readMinutes: 12,
      summary:
        'Consumer vs. Creator mindset table, Active vs. Passive hybrid strategy, Rohit & Amit case studies, and crossing the Valley of Disappointment.',
      tags: ['mindset', 'consumer vs creator', 'passive income', 'compounding', 'discipline'],
      keyTools: ['Digital Wellbeing Audit', '2-Hour Time-Block'],
      excerpt:
        'डिजिटल अर्थव्यवस्था में असफलता का प्राथमिक कारण संसाधनों की कमी नहीं, बल्कि "शॉर्टकट मानसिकता" है। कंज्यूमर मोड से बाहर निकलकर क्रिएटर मोड में प्रवेश करने के दिन ही वित्तीय स्वतंत्रता की शुरुआत होती है।',
    },
    {
      id: 'part-02',
      number: 'Part 02',
      title: 'Start with Zero Investment: Earning Money from Online Tasks',
      hindiTitle: 'शून्य निवेश से पहली ऑनलाइन कमाई',
      track: 'Mindset & Zero-Investment',
      phase: 'Days 1–7',
      pagesLabel: 'Pages 9–13',
      readMinutes: 14,
      summary:
        'Economics of user acquisition & market research, profile optimization for 3x survey matches, anti-VPN safety rules, and building initial seed capital.',
      tags: ['zero investment', 'surveys', 'micro-tasks', 'seed capital', 'rewardzen', 'upi'],
      keyTools: ['Rewardzen', 'CPX Research', 'BitLabs'],
      excerpt:
        'शून्य निवेश मॉडल का मुख्य उद्देश्य बिना ₹1 का जोखिम उठाए डिजिटल वर्कफ़्लो को समझना, पहला वित्तीय सबूत प्राप्त करना और डोमेन/टूल्स के लिए ₹1,000–₹5,000 का सीड कैपिटल तैयार करना है।',
    },
    {
      id: 'part-03',
      number: 'Part 03',
      title: 'The YouTube Blueprint: How to Build a Channel and Earn Lakhs',
      hindiTitle: 'यूट्यूब ब्लूप्रिंट: चैनल बनाएं और लाखों कमाएं',
      track: 'YouTube & Social Media',
      phase: 'Days 8–30',
      pagesLabel: 'Pages 13–19',
      readMinutes: 18,
      summary:
        'High-RPM niche selection table (₹200–₹500/1K views), Face-Cam vs. Faceless workflows, 5 golden SEO rules, the 30-Video Rule, and 5 revenue streams.',
      tags: ['youtube', 'faceless channel', 'rpm', 'seo', 'thumbnails', 'ctr', 'adsense'],
      keyTools: ['VidIQ', 'TubeBuddy', 'CapCut', 'Canva'],
      excerpt:
        'फाइनेंस या डिजिटल अर्निंग चैनल पर केवल 50,000 व्यूज की कमाई एक कॉमेडी चैनल के 10 लाख व्यूज के बराबर हो सकती है। बिना व्यूज देखे 30 उच्च-गुणवत्ता वाले वीडियो अपलोड करना ही सफलता की कुंजी है।',
    },
    {
      id: 'part-04',
      number: 'Part 04',
      title: 'Make Money from Social Media: Facebook, Instagram & Telegram',
      hindiTitle: 'सोशल मीडिया मास्टरी: फेसबुक, इंस्टाग्राम और टेलीग्राम',
      track: 'YouTube & Social Media',
      phase: 'Days 8–30',
      pagesLabel: 'Pages 19–24',
      readMinutes: 16,
      summary:
        'Multi-platform ecosystem funnel, 5 ready-to-use Hindi viral hooks, ManyChat automated DM flows, Facebook LOC avoidance, and the 80-20 Telegram rule.',
      tags: ['instagram', 'reels', 'facebook monetization', 'telegram', 'manychat', 'hooks', 'funnel'],
      keyTools: ['ManyChat', 'Meta Business Suite', 'Linktree'],
      excerpt:
        'इंस्टाग्राम रील्स नए दर्शकों को खोजने का इंजन है, फेसबुक इन-स्ट्रीम ऐड्स डॉलर आय देता है, और टेलीग्राम पर 80% मुफ्त मूल्य + 20% प्रोमोशन का नियम स्थायी पैसिव आय खड़ा करता है।',
    },
    {
      id: 'part-05',
      number: 'Part 05',
      title: 'High-Income Digital Skills: Turn Your Talent into Big Money',
      hindiTitle: 'हाई-इनकम डिजिटल स्किल्स: फ्रीलांसिंग, आउटरीच और प्राइसिंग',
      track: 'Skills & Freelancing',
      phase: 'Days 8–30',
      pagesLabel: 'Pages 24–30',
      readMinutes: 18,
      summary:
        'Top 5 high-demand skills comparison table, Spec Work zero-experience portfolio strategy, 3 ready-to-send cold outreach scripts, and 50% advance payment rules.',
      tags: ['freelancing', 'video editing', 'cold email', 'spec work', 'pricing', 'clients', 'portfolio'],
      keyTools: ['VN Editor', 'Notion Portfolio', 'Wise / Payoneer'],
      excerpt:
        'डिजिटल दुनिया में किसी को आपकी डिग्री से सरोकार नहीं; क्लाइंट्स केवल पूछते हैं "क्या आप मेरी समस्या हल कर सकते हैं?" Spec Work से 5 बेहतरीन सैंपल बनाकर पहले 20 दिनों में क्लाइंट पाएं।',
    },
    {
      id: 'part-06',
      number: 'Part 06',
      title: 'Referral & Affiliate Marketing: Earn Commissions Without Any Product',
      hindiTitle: 'रेफरल और एफिलिएट मार्केटिंग: बिना प्रोडक्ट के कमीशन कमाना',
      track: 'YouTube & Social Media',
      phase: 'Days 8–30',
      pagesLabel: 'Pages 30–37',
      readMinutes: 14,
      summary:
        'One-time fixed commissions vs. 50% lifetime recurring math, 3-step conversion bridge funnel, Manish vs. Rahul case studies, and strict anti-ban compliance.',
      tags: ['affiliate marketing', 'referral', 'recurring income', 'passive income', 'funnel'],
      keyTools: ['Bridge Pages', 'Telegram Channel', 'Bitly'],
      excerpt:
        'बिना इन्वेंट्री और कस्टमर सपोर्ट के आपकी एकमात्र भूमिका "ट्रैफ़िक और विश्वास" का निर्माण है। एक बार के कमीशन के बजाय आवर्ती (recurring) मॉडल वास्तविक कम्पाउंडिंग देता है।',
    },
    {
      id: 'part-07',
      number: 'Part 07',
      title: 'Selling Products Online: E-Commerce & Digital Products Mastery',
      hindiTitle: 'ऑनलाइन प्रोडक्ट बेचना: ई-कॉमर्स और डिजिटल उत्पाद',
      track: 'E-Commerce & Business',
      phase: 'Days 31–90',
      pagesLabel: 'Pages 37–48',
      readMinutes: 20,
      summary:
        'Why digital products deliver 90%+ net margins, complete 7-Day eBook launch blueprint, zero-investment Meesho/GlowRoad reselling, and cutting RTO below 5%.',
      tags: ['digital products', 'ebook launch', 'e-commerce', 'reselling', 'meesho', 'rto control'],
      keyTools: ['Cosmofeed', 'Instamojo', 'Topmate', 'Canva 3D'],
      excerpt:
        'डिजिटल उत्पादों में "Zero Marginal Cost" काम करता है—एक बार बनाएं और 10,000 बार बेचें। ₹99 से ₹149 की Impulse-Buy कीमत और ऑटोमेटेड डिलीवरी से 90%+ शुद्ध लाभ मिलता है।',
    },
    {
      id: 'part-08',
      number: 'Part 08',
      title: 'Building an Online Business & Apps: From Freelancer to Founder',
      hindiTitle: 'अपना खुद का बिज़नेस और ऐप बनाना: फ्रीलांसर से फाउंडर तक',
      track: 'E-Commerce & Business',
      phase: 'Days 31–90',
      pagesLabel: 'Pages 49–59',
      readMinutes: 18,
      summary:
        'SOP delegation systems, CAPEX/OPEX & Break-Even math, 3-milestone developer contracts, scaling local shops 4x with GMB & ₹150/day Meta Ads, and accounting tools.',
      tags: ['business', 'founder', 'capex opex', 'agency', 'meta ads', 'gmb', 'app', 'accounting'],
      keyTools: ['Google Business Profile', 'Meta Ads Manager', 'Vyapar App'],
      excerpt:
        'सोलो फ्रीलांसर के पास केवल 24 घंटे होते हैं। SOP चेकलिस्ट, सही डेलिगेशन और CAPEX/OPEX गणित के साथ आप एक ऐसा सिस्टम बनाते हैं जो आपकी अनुपस्थिति में भी राजस्व उत्पन्न करता है।',
    },
    {
      id: 'part-09',
      number: 'Part 09',
      title: 'The Digital Shield: How to Avoid Online Frauds & Big Mistakes',
      hindiTitle: 'डिजिटल सुरक्षा कवच: साइबर फ्रॉड और बड़ी गलतियों से बचाव',
      track: 'Cyber Safety & Roadmap',
      phase: 'Days 1–7',
      pagesLabel: 'Pages 59–72',
      readMinutes: 16,
      summary:
        'Exposed mechanics of Telegram prepaid task scams, fake loan APKs, remote-access KYC calls, 7 unbreakable digital hygiene rules, and Golden Hour 1930 recovery.',
      tags: ['cyber safety', 'scam prevention', 'helpline 1930', 'upi pin', '2fa', 'security'],
      keyTools: ['Helpline 1930', 'cybercrime.gov.in', 'Google Authenticator'],
      excerpt:
        'पैसे कमाने से अधिक महत्वपूर्ण अपनी मेहनत की कमाई को सुरक्षित रखना है। कभी भी काम के लिए फीस न दें, रिसीव करने के लिए UPI PIN न डालें, और फ्रॉड होने पर 2 घंटे (Golden Hour) में 1930 पर कॉल करें।',
    },
    {
      id: 'part-10',
      number: 'Part 10',
      title: 'The 30-Day & 90-Day Action Roadmap & Secrets to a Happy Life',
      hindiTitle: 'एक्शन रोडमैप और सफल व खुशहाल जीवन के सूत्र',
      track: 'Cyber Safety & Roadmap',
      phase: 'Days 31–90',
      pagesLabel: 'Pages 73–86',
      readMinutes: 15,
      summary:
        'Complete Day 1–90 execution table, tailored 2-hour daily time-blocks for students, job holders & homemakers, 30-day habit tracker, and the 20% savings/investment rule.',
      tags: ['roadmap', '30-day plan', '90-day plan', 'habit tracker', 'time management', 'savings'],
      keyTools: ['30-Day Habit Tracker', '20% Wealth Rule', '20-20-20 Eye Break'],
      excerpt:
        'शॉर्टकट भी तभी काम करता है जब आपको लॉन्ग वे (बुनियादी नियम) आता है। प्रतिदिन 2 घंटे का अनुशासित टाइम-ब्लॉक और 20% बचत नियम आपको 90 दिनों में स्थायी वित्तीय स्वतंत्रता की राह पर लाता है।',
    },
  ],
  sampleExcerpt: {
    heading: 'Part 1: Consumer Mindset vs. Creator Mindset',
    subheading: 'डिजिटल अर्थव्यवस्था में वित्तीय स्वतंत्रता की शुरुआत (Manuscript Excerpt)',
    paragraphs: [
      'यह पुस्तक—"THE COMPLETE EARN MONEY ONLINE: 30 Days Practical Blueprint (Zero to ₹1 Lakh)"—कोई हवाई दावों या "रातारात अमीर बनने" की फर्जी योजनाओं की किताब नहीं है। यह एक व्यावहारिक, चरण-दर-चरण (step-by-step) मार्गदर्शिका है जो आपको इंटरनेट अर्थव्यवस्था की वास्तविकताओं से परिचित कराती है।',
      'डिजिटल अर्थव्यवस्था में असफलता का प्राथमिक कारण कभी भी संसाधनों, इंटरनेट स्पीड या तकनीकी उपकरणों की कमी नहीं होता। अधिकांश लोग इसलिए विफल होते हैं क्योंकि वे "शॉर्टकट मानसिकता" (Shortcut Mindset) के साथ इस क्षेत्र में कदम रखते हैं।',
      'एक कंज्यूमर अपने खाली समय को मनोरंजन के नाम पर बर्बाद करता है, जबकि एक क्रिएटर उसी सामग्री का विश्लेषणात्मक अध्ययन करता है: "यह वीडियो वायरल क्यों हुआ? इसका हुक क्या था? मैं इससे बेहतर मूल्य कैसे प्रदान कर सकता हूँ?"',
    ],
    keyTakeaways: [
      'Start with Active Income in Days 1–30 to fund your Seed Capital with zero financial risk.',
      'Cross the "Valley of Disappointment" using the disciplined 30-Video & 2-Hour Time-Block rule.',
      'Protect every rupee earned with the 7 Unbreakable Digital Hygiene Rules and Helpline 1930.',
    ],
  },
  reviews: [
    {
      id: 'rev-1',
      readerName: 'Rahul Verma',
      role: 'College Student',
      city: 'Lucknow',
      rating: 5,
      comment:
        'विश्वास नहीं हो रहा था कि ₹99 में इतनी सटीक जानकारी मिलेगी। Action Plan सच में बहुत आसान है और पार्ट 5 की कोल्ड ईमेल स्क्रिप्ट से मुझे पहला क्लाइंट मिला!',
      verified: true,
    },
    {
      id: 'rev-2',
      readerName: 'Priya Deshmukh',
      role: 'School Teacher & Creator',
      city: 'Jaipur',
      rating: 5,
      comment:
        'The 2-hour daily time-block table in Part 10 and the 7-day digital product launch plan finally helped me build a consistent side income from my phone.',
      verified: true,
    },
    {
      id: 'rev-3',
      readerName: 'Ankit Mishra',
      role: 'B.Com Final Year',
      city: 'Indore',
      rating: 5,
      comment:
        'Part 9 (The Digital Shield) alone is worth 10x the price. Saved my younger brother from a fake Telegram prepaid task scam last week.',
      verified: true,
    },
  ],
};

export const CHAPTER_TRACKS: Array<'All' | ChapterTrack> = [
  'All',
  'Mindset & Zero-Investment',
  'YouTube & Social Media',
  'Skills & Freelancing',
  'E-Commerce & Business',
  'Cyber Safety & Roadmap',
];

export const ROADMAP_PHASES: Array<'All' | RoadmapPhase> = [
  'All',
  'Days 1–7',
  'Days 8–30',
  'Days 31–90',
];
