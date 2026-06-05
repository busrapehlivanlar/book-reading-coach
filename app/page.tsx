"use client";

import { useEffect, useState } from "react";

// ── BRAND CONFIG (kolay değiştirilebilir) ──
const BRAND = {
  name: "Okuya",
  tagline: "Kişisel okuma alışkanlığı koçu",
  accentColor: "amber",
} as const;

// ── TYPES ──
interface Question {
  q: string;
  hint: string;
  opts: string[];
}

interface Profile {
  emoji: string;
  name: string;
  desc: string;
}
interface BookEntry {
  id: string;
  title: string;
  author: string;
  totalPages?: number;
  reason: string;
  length: "short" | "medium" | "long";
  pace: "fast" | "balanced" | "slow";
  difficulty: "easy" | "medium" | "hard";
  moods: string[];
  coverColor: string;
  showInQuiz?: boolean;
}

// ── DATA ──
const QUESTIONS: Question[] = [
  {
    q: "Günde ne kadar zaman ayırabilirsin?",
    hint: "Dürüst ol — gerçekçi bir hedef daha iyi çalışır.",
    opts: ["5 dakika", "10 dakika", "15 dakika", "30 dakika+"],
  },
  {
    q: "Kitaplarda seni en çok ne sıkıyor?",
    hint: "Birden fazla varsa en çok hangisi?",
    opts: ["Ağır dil", "Yavaş tempo", "Çok uzun olması", "Konunun ilgimi çekmemesi"],
  },
  {
    q: "Ne tür bir okuma deneyimi istiyorsun?",
    hint: "Şu an nasıl hissediyorsun?",
    opts: ["Sürükleyici & aksiyon", "Öğretici & bilgi verici", "Duygusal & içsel", "Kısa & kolay"],
  },
  {
    q: "Okuma seviyeni nasıl tanımlarsın?",
    hint: "Öz eleştirisi olmayan bir cevap.",
    opts: [
      "Yeni başlıyorum",
      "Ara sıra okuyorum",
      "Düzenli okumak istiyorum",
      "Zaten okuyorum ama daha iyi olabilir",
    ],
  },
];

const PROFILES: Profile[] = [
  { emoji: "🌱", name: "Başlayamayan Okur", desc: "En zor kısım ilk adım. Küçük başlayıp büyüyeceksin." },
  { emoji: "🔖", name: "Yarıda Bırakan Okur", desc: "Yanlış kitap değilsin sen — yanlış tempo vardı. Bunu çözeceğiz." },
  { emoji: "📵", name: "Dikkati Dağılan Okur", desc: "Kısa bölümler, somut hedefler. Beyin buna alışacak." },
  { emoji: "🔭", name: "Derinleşmek İsteyen Okur", desc: "Okuyorsun zaten. Şimdi sıra daha anlamlı kitaplarda." },
];

const BOOKS: BookEntry[] = [
  {
    id: "hayvan-ciftligi",
    title: "Hayvan Çiftliği",
    author: "George Orwell",
    totalPages: 152,
    reason: "Kısa, akıcı ve güçlü mesajı olan bir başlangıç kitabı.",
    length: "short",
    pace: "fast",
    difficulty: "easy",
    moods: ["Sürükleyici & aksiyon", "Kısa & kolay", "Öğretici & bilgi verici"],
    coverColor: "#d97706",
  },
  {
    id: "kucuk-prens",
    title: "Küçük Prens",
    author: "Antoine de Saint-Exupéry",
    totalPages: 96,
    reason: "Kısa, sade ama duygusal ve düşündürücü bir okuma deneyimi sunar.",
    length: "short",
    pace: "balanced",
    difficulty: "easy",
    moods: ["Duygusal & içsel", "Kısa & kolay"],
    coverColor: "#fbbf24",
  },
  {
    id: "marti-jonathan-livingston",
    title: "Martı Jonathan Livingston",
    author: "Richard Bach",
    totalPages: 128,
    reason: "Kısa yapısı ve ilham verici anlatımıyla okuma alışkanlığına dönüş için uygundur.",
    length: "short",
    pace: "balanced",
    difficulty: "easy",
    moods: ["Kısa & kolay", "Duygusal & içsel"],
    coverColor: "#f59e0b",
  },
  {
    id: "seker-portakali",
    title: "Şeker Portakalı",
    author: "José Mauro de Vasconcelos",
    totalPages: 144,
    reason: "Duygusal, akıcı ve karakterle bağ kurmayı kolaylaştıran bir romandır.",
    length: "medium",
    pace: "balanced",
    difficulty: "easy",
    moods: ["Duygusal & içsel"],
    coverColor: "#f59e0b",
  },
  {
    id: "fareler-ve-insanlar",
    title: "Fareler ve İnsanlar",
    author: "John Steinbeck",
    totalPages: 160,
    reason: "Kısa sayılabilecek, sade dilli ve etkileyici bir klasik.",
    length: "short",
    pace: "balanced",
    difficulty: "easy",
    moods: ["Duygusal & içsel", "Kısa & kolay"],
    coverColor: "#f59e0b",
  },
  {
    id: "simyaci",
    title: "Simyacı",
    author: "Paulo Coelho",
    //totalPages: 192,
    reason: "Akıcı dili ve motive edici hikâyesiyle yeni okurlar için düşük bariyerlidir.",
    length: "short",
    pace: "balanced",
    difficulty: "easy",
    moods: ["Duygusal & içsel", "Kısa & kolay"],
    coverColor: "#f59e0b",
  },
  {
    id: "atomik-aliskanliklar",
    title: "Atomik Alışkanlıklar",
    author: "James Clear",
    totalPages: 320,
    reason: "Okuma alışkanlığı kurmak isteyenler için pratik ve uygulanabilir öneriler içerir.",
    length: "medium",
    pace: "balanced",
    difficulty: "easy",
    moods: ["Öğretici & bilgi verici"],
    coverColor: "#0f766e",
    showInQuiz: false,
  },
  {
    id: "insan-ne-ile-yasar",
    title: "İnsan Ne ile Yaşar?",
    author: "Lev Tolstoy",
    totalPages: 256,
    reason: "Kısa, sade ve anlamlı hikâyelerle okuma eşiğini düşürür.",
    length: "short",
    pace: "balanced",
    difficulty: "easy",
    moods: ["Kısa & kolay", "Duygusal & içsel"],
    coverColor: "#1f2937",
  },
  {
    id: "bilinmeyen-bir-kadinin-mektubu",
    title: "Bilinmeyen Bir Kadının Mektubu",
    author: "Stefan Zweig",
    totalPages: 128,
    reason: "Kısa, yoğun ve duygusal bir anlatı arayanlar için güçlü bir seçenek.",
    length: "short",
    pace: "fast",
    difficulty: "medium",
    moods: ["Duygusal & içsel", "Kısa & kolay"],
    coverColor: "#7c2d12",
  },
  {
    id: "satranc",
    title: "Satranç",
    author: "Stefan Zweig",
    totalPages: 128,
    reason: "Kısa ama zihinsel gerilimi yüksek, tempolu bir okuma sunar.",
    length: "short",
    pace: "fast",
    difficulty: "medium",
    moods: ["Sürükleyici & aksiyon", "Kısa & kolay"],
    coverColor: "#365314",
  },
  {
    id: "1984",
    title: "1984",
    author: "George Orwell",
    totalPages: 320,
    reason: "Daha derin ve düşündürücü bir distopya okumak isteyenler için güçlü bir seçim.",
    length: "medium",
    pace: "balanced",
    difficulty: "medium",
    moods: ["Sürükleyici & aksiyon", "Öğretici & bilgi verici"],
    coverColor: "#991b1b",
  },
  {
    id: "donusum",
    title: "Dönüşüm",
    author: "Franz Kafka",
    totalPages: 128,
    reason: "Kısa ama daha sembolik ve düşündürücü bir metin denemek isteyenler için uygundur.",
    length: "short",
    pace: "slow",
    difficulty: "medium",
    moods: ["Duygusal & içsel", "Öğretici & bilgi verici"],
    coverColor: "#f59e0b",
  },
  {
    id: "korku",
    title: "Korku",
    author: "Stefan Zweig",
    totalPages: 80,
    reason: "Kısa, psikolojik gerilimi yüksek ve hızlı okunabilecek bir anlatı.",
    length: "short",
    pace: "fast",
    difficulty: "medium",
    moods: ["Sürükleyici & aksiyon", "Kısa & kolay", "Duygusal & içsel"],
    coverColor: "#581c87",
  },
  {
    id: "amok-kosucusu",
    title: "Amok Koşucusu",
    author: "Stefan Zweig",
    totalPages: 96,
    reason: "Yoğun duygusu ve kısa yapısıyla hızlı bitirilebilecek bir kitap.",
    length: "short",
    pace: "fast",
    difficulty: "medium",
    moods: ["Duygusal & içsel", "Kısa & kolay"],
    coverColor: "#7f1d1d",
  },
  {
    id: "palto",
    title: "Palto",
    author: "Nikolay Gogol",
    totalPages: 80,
    reason: "Kısa, klasik ve düşündürücü bir başlangıç metni.",
    length: "short",
    pace: "balanced",
    difficulty: "medium",
    moods: ["Kısa & kolay", "Öğretici & bilgi verici"],
    coverColor: "#374151",
  },
  {
    id: "otomatik-portakal",
    title: "Otomatik Portakal",
    author: "Anthony Burgess",
    totalPages: 176,
    reason: "Sıra dışı dili ve çarpıcı atmosferiyle farklı bir okuma deneyimi sunar.",
    length: "medium",
    pace: "fast",
    difficulty: "medium",
    moods: ["Sürükleyici & aksiyon"],
    coverColor: "#ea580c",
  },
  {
    id: "ucurtma-avcisi",
    title: "Uçurtma Avcısı",
    author: "Khaled Hosseini",
    totalPages: 375,
    reason: "Duygusal, sürükleyici ve karakter odaklı güçlü bir roman.",
    length: "long",
    pace: "balanced",
    difficulty: "easy",
    moods: ["Duygusal & içsel", "Sürükleyici & aksiyon"],
    coverColor: "#0369a1",
  },
  {
    id: "bin-muhtesem-gunes",
    title: "Bin Muhteşem Güneş",
    author: "Khaled Hosseini",
    totalPages: 430,
    reason: "Duygusal yoğunluğu yüksek, uzun ama akıcı bir roman.",
    length: "long",
    pace: "balanced",
    difficulty: "easy",
    moods: ["Duygusal & içsel"],
    coverColor: "#92400e",
  },
  {
    id: "beyaz-dis",
    title: "Beyaz Diş",
    author: "Jack London",
    totalPages: 256,
    reason: "Akıcı, macera duygusu yüksek ve yeni okurlar için uygun bir klasik.",
    length: "medium",
    pace: "fast",
    difficulty: "easy",
    moods: ["Sürükleyici & aksiyon"],
    coverColor: "#1e3a8a",
  },
  {
    id: "vahsetin-cagrisi",
    title: "Vahşetin Çağrısı",
    author: "Jack London",
    totalPages: 128,
    reason: "Kısa, tempolu ve macera hissi güçlü bir okuma.",
    length: "short",
    pace: "fast",
    difficulty: "easy",
    moods: ["Sürükleyici & aksiyon", "Kısa & kolay"],
    coverColor: "#065f46",
  },
  {
    id: "sefiller",
    title: "Sefiller",
    author: "Victor Hugo",
    totalPages: 520,
    reason: "Derinleşmek isteyen okurlar için güçlü ve klasik bir roman.",
    length: "long",
    pace: "slow",
    difficulty: "hard",
    moods: ["Duygusal & içsel", "Öğretici & bilgi verici"],
    coverColor: "#111827",
  },
  {
    id: "suc-ve-ceza",
    title: "Suç ve Ceza",
    author: "Fyodor Dostoyevski",
    totalPages: 672,
    reason: "Psikolojik derinliği yüksek, ciddi okuma alışkanlığı isteyen bir klasik.",
    length: "long",
    pace: "slow",
    difficulty: "hard",
    moods: ["Duygusal & içsel", "Öğretici & bilgi verici"],
    coverColor: "#450a0a",
  },
  {
    id: "yeraltindan-notlar",
    title: "Yeraltından Notlar",
    author: "Fyodor Dostoyevski",
    totalPages: 160,
    reason: "Kısa ama yoğun ve düşündürücü bir klasik.",
    length: "short",
    pace: "slow",
    difficulty: "hard",
    moods: ["Öğretici & bilgi verici", "Duygusal & içsel"],
    coverColor: "#3f3f46",
  },
  {
    id: "kumarbaz",
    title: "Kumarbaz",
    author: "Fyodor Dostoyevski",
    totalPages: 192,
    reason: "Dostoyevski’ye daha kısa ve akıcı bir giriş yapmak isteyenler için uygun.",
    length: "medium",
    pace: "balanced",
    difficulty: "medium",
    moods: ["Sürükleyici & aksiyon", "Duygusal & içsel"],
    coverColor: "#713f12",
  },
  {
    id: "babaya-mektup",
    title: "Babaya Mektup",
    author: "Franz Kafka",
    totalPages: 80,
    reason: "Kısa, kişisel ve yoğun bir metin okumak isteyenler için uygun.",
    length: "short",
    pace: "slow",
    difficulty: "medium",
    moods: ["Duygusal & içsel", "Kısa & kolay"],
    coverColor: "#27272a",
  },
  {
    id: "yasamak",
    title: "Yaşamak",
    author: "Yu Hua",
    totalPages: 240,
    reason: "Sade diliyle derin ve duygusal bir yaşam hikâyesi sunar.",
    length: "medium",
    pace: "balanced",
    difficulty: "easy",
    moods: ["Duygusal & içsel"],
    coverColor: "#b45309",
  },
  {
    id: "gece-yarisi-kutuphanesi",
    title: "Gece Yarısı Kütüphanesi",
    author: "Matt Haig",
    totalPages: 288,
    reason: "Akıcı, modern ve hayat seçimleri üzerine düşündüren bir roman.",
    length: "medium",
    pace: "balanced",
    difficulty: "easy",
    moods: ["Duygusal & içsel", "Kısa & kolay"],
    coverColor: "#4f46e5",
  },
  {
    id: "olasiksiz",
    title: "Olasılıksız",
    author: "Adam Fawer",
    totalPages: 480,
    reason: "Sürükleyici, tempolu ve merak duygusunu canlı tutan bir roman.",
    length: "long",
    pace: "fast",
    difficulty: "medium",
    moods: ["Sürükleyici & aksiyon"],
    coverColor: "#0f172a",
  },
  {
    id: "empati",
    title: "Empati",
    author: "Adam Fawer",
    totalPages: 450,
    reason: "Bilim kurgu ve gerilim hissini sevenler için sürükleyici bir seçenek.",
    length: "long",
    pace: "fast",
    difficulty: "medium",
    moods: ["Sürükleyici & aksiyon"],
    coverColor: "#164e63",
  },
  {
    id: "dune",
    title: "Dune",
    author: "Frank Herbert",
    totalPages: 688,
    reason: "Derin bir evren ve uzun soluklu bilim kurgu okumak isteyenler için güçlü bir seçim.",
    length: "long",
    pace: "slow",
    difficulty: "hard",
    moods: ["Sürükleyici & aksiyon", "Öğretici & bilgi verici"],
    coverColor: "#a16207",
  },
  {
    id: "fahrenheit-451",
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    totalPages: 208,
    reason: "Kitaplar, toplum ve düşünce özgürlüğü üzerine akıcı bir distopya.",
    length: "medium",
    pace: "fast",
    difficulty: "medium",
    moods: ["Sürükleyici & aksiyon", "Öğretici & bilgi verici"],
    coverColor: "#dc2626",
  },
  {
    id: "cesur-yeni-dunya",
    title: "Cesur Yeni Dünya",
    author: "Aldous Huxley",
    totalPages: 272,
    reason: "Düşündürücü bir distopya okumak isteyenler için klasik bir seçenek.",
    length: "medium",
    pace: "balanced",
    difficulty: "medium",
    moods: ["Öğretici & bilgi verici", "Sürükleyici & aksiyon"],
    coverColor: "#1d4ed8",
  },
  {
    id: "ikigai",
    title: "Ikigai",
    author: "Héctor García & Francesc Miralles",
    totalPages: 208,
    reason: "Kısa bölümleri ve sade diliyle kişisel gelişim okumak isteyenlere uygun.",
    length: "medium",
    pace: "balanced",
    difficulty: "easy",
    moods: ["Öğretici & bilgi verici", "Kısa & kolay"],
    coverColor: "#0d9488",
  },
  {
    id: "dort-anlasma",
    title: "Dört Anlaşma",
    author: "Don Miguel Ruiz",
    totalPages: 160,
    reason: "Kısa, sade ve kişisel farkındalık odaklı bir kitap.",
    length: "short",
    pace: "balanced",
    difficulty: "easy",
    moods: ["Öğretici & bilgi verici", "Kısa & kolay"],
    coverColor: "#9333ea",
  },
  {
    id: "insanin-anlam-arayisi",
    title: "İnsanın Anlam Arayışı",
    author: "Viktor E. Frankl",
    totalPages: 160,
    reason: "Kısa ama güçlü, hayat anlamı üzerine düşündüren bir kitap.",
    length: "short",
    pace: "balanced",
    difficulty: "medium",
    moods: ["Öğretici & bilgi verici", "Duygusal & içsel"],
    coverColor: "#475569",
  },
  {
    id: "zamanin-kisa-tarihi",
    title: "Zamanın Kısa Tarihi",
    author: "Stephen Hawking",
    totalPages: 255,
    reason: "Bilim ve evren hakkında merak duyanlar için öğretici bir başlangıç.",
    length: "medium",
    pace: "slow",
    difficulty: "hard",
    moods: ["Öğretici & bilgi verici"],
    coverColor: "#312e81",
  },
];

const PLANS: Record<string, string[]> = {
  "5 dakika": ["5 dk", "6 dk", "7 dk", "8 dk", "8 dk", "10 dk", "10 dk"],
  "10 dakika": ["10 dk", "12 dk", "12 dk", "15 dk", "15 dk", "15 dk", "20 dk"],
  "15 dakika": ["15 dk", "15 dk", "20 dk", "20 dk", "25 dk", "25 dk", "30 dk"],
  "30 dakika+": ["30 dk", "30 dk", "35 dk", "35 dk", "40 dk", "40 dk", "45 dk"],
};

const DAYS = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

// ── HELPERS ──
function getProfile(answers: string[]): Profile {
  const level = answers[3];
  const bore = answers[1];
  const time = answers[0];
  if (level === "Yeni başlıyorum") return PROFILES[0];
  if (bore === "Yavaş tempo" || bore === "Çok uzun olması") return PROFILES[1];
  if (time === "5 dakika" || time === "10 dakika") return PROFILES[2];
  return PROFILES[3];
}
function getBookRecommendations(answers: string[]): BookEntry[] {
  const time = answers[0];
  const bore = answers[1];
  const mood = answers[2];
  const level = answers[3];

  const scoredBooks = BOOKS.map((book) => {
    let score = 0;

    if (book.moods.includes(mood)) score += 4;

    if (time === "5 dakika" || time === "10 dakika") {
      if (book.length === "short") score += 3;
      if (book.difficulty === "easy") score += 2;
    }

    if (time === "15 dakika") {
      if (book.length === "short" || book.length === "medium") score += 2;
    }

    if (time === "30 dakika+") {
      if (book.length === "medium" || book.length === "long") score += 2;
    }

    if (bore === "Ağır dil") {
      if (book.difficulty === "easy") score += 3;
      if (book.difficulty === "hard") score -= 3;
    }

    if (bore === "Yavaş tempo") {
      if (book.pace === "fast") score += 3;
      if (book.pace === "slow") score -= 2;
    }

    if (bore === "Çok uzun olması") {
      if (book.length === "short") score += 4;
      if (book.length === "long") score -= 3;
    }

    if (bore === "Konunun ilgimi çekmemesi") {
      if (book.moods.includes(mood)) score += 2;
    }

    if (level === "Yeni başlıyorum") {
      if (book.difficulty === "easy") score += 3;
      if (book.length === "short") score += 2;
      if (book.difficulty === "hard") score -= 4;
    }

    if (level === "Ara sıra okuyorum") {
      if (book.difficulty === "easy" || book.difficulty === "medium") score += 2;
    }

    if (level === "Düzenli okumak istiyorum") {
      if (book.length === "medium" || book.pace === "balanced") score += 2;
    }

    if (level === "Zaten okuyorum ama daha iyi olabilir") {
      if (book.difficulty === "medium") score += 2;
    }

    return { book, score };
  });

  const answerKey = answers.join("|");

  const semiRandomScore = (bookId: string) => {
    let hash = 0;
    const value = `${answerKey}-${bookId}`;

    for (let i = 0; i < value.length; i++) {
      hash = value.charCodeAt(i) + ((hash << 5) - hash);
    }

    return Math.abs(hash % 100) / 100;
  };

  return scoredBooks
    .filter((item) => item.book.showInQuiz !== false)
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return semiRandomScore(b.book.id) - semiRandomScore(a.book.id);
    })
    .slice(0, 8)
    .sort((a, b) => semiRandomScore(b.book.id) - semiRandomScore(a.book.id))
    .slice(0, 3)
    .map((item) => item.book);
}
function getTodayKey() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

function getYesterdayKey() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split("T")[0];
}

// ── SUB-COMPONENTS ──

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-amber-100 px-6 h-[60px] flex items-center justify-between">
      <span className="font-serif text-2xl font-bold text-navy tracking-tight">
        Oku<span className="text-amber-500">ya</span>
      </span>
      <div className="hidden sm:flex items-center gap-6">
        <a href="#how" className="text-sm text-gray-500 hover:text-navy transition-colors">Nasıl çalışır?</a>
        <a href="#profiles" className="text-sm text-gray-500 hover:text-navy transition-colors">Okur profilleri</a>
        <a href="#quiz" className="text-sm text-gray-500 hover:text-navy transition-colors">Demoyu dene</a>
        <a href="#quiz" className="bg-navy text-cream rounded-full px-5 py-2 text-sm font-medium hover:bg-navy/90 transition-all hover:-translate-y-0.5">
          Başla
        </a>
      </div>
    </nav>
  );
}

function HeroMockup() {
  return (
    <div className="bg-white rounded-2xl border border-amber-100 p-6 shadow-xl shadow-navy/5">
      <div className="flex items-center gap-2 mb-5">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <span className="ml-auto text-[10px] text-gray-400 uppercase tracking-widest font-medium">Bugünkü planın</span>
      </div>

      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Önerilen kitap</p>
      <div className="bg-amber-50 border-l-4 border-amber-400 rounded-xl p-4 mb-4">
        <p className="font-serif font-bold text-navy text-base">Hayvan Çiftliği</p>
        <p className="text-xs text-gray-500 mt-1">Kısa, akıcı dili ve güçlü mesajıyla başlangıç için ideal.</p>
      </div>

      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Günlük hedef</p>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-green-50 rounded-xl p-3 text-center">
          <p className="font-serif font-bold text-green-700 text-xl">8 dk</p>
          <p className="text-[10px] text-green-600 mt-0.5">okuma süresi</p>
        </div>
        <div className="bg-green-50 rounded-xl p-3 text-center">
          <p className="font-serif font-bold text-green-700 text-xl">6 syf</p>
          <p className="text-[10px] text-green-600 mt-0.5">sayfa hedefi</p>
        </div>
      </div>

      <div className="bg-gray-100 rounded-full h-1.5">
        <div className="bg-amber-400 h-full rounded-full w-[35%] transition-all duration-1000" />
      </div>
      <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
        <span>Bu haftaki ilerleme</span>
        <span>2/7 gün</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-cream pt-20 pb-20 px-6">
      <div
        className="pointer-events-none absolute -top-32 -right-20 w-96 h-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(245,167,50,0.14) 0%, transparent 70%)" }}
      />
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-600 border border-amber-200 rounded-full px-4 py-1.5 text-xs font-semibold mb-5">
            ✦ Kişisel okuma koçun
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold leading-tight text-navy tracking-tight mb-5">
            Kitap okumak hiç bu kadar{" "}
            <em className="not-italic text-amber-500">kolay</em> olmamıştı.
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
            Okuya, sana sadece kitap önermez. Zamanına, ruh haline ve okuma seviyene göre küçük adımlarla gerçek bir okuma alışkanlığı kazandırır.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <a href="#quiz" className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-7 py-3 font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-200">
              Okur profilimi oluştur
            </a>
            <a href="#how" className="border-2 border-navy text-navy rounded-full px-7 py-3 font-medium hover:bg-navy hover:text-cream transition-all">
              Nasıl çalışır?
            </a>
          </div>
          <div className="flex gap-6 flex-wrap">
            {[["5 dk", "günlük minimum"], ["7 gün", "başlangıç planı"], ["3 kitap", "sana özel öneri"]].map(([val, lbl]) => (
              <div key={lbl}>
                <p className="font-serif text-2xl font-bold text-navy">{val}</p>
                <p className="text-xs text-gray-400 mt-0.5">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
        <HeroMockup />
      </div>
    </section>
  );
}

function Problem() {
  const cards = [
    { icon: "📚", title: "Ne okuyacağımı bilmiyorum", desc: "Yüzlerce kitap arasında kaybolmak motivasyonu tamamen yok ediyor." },
    { icon: "⏸️", title: "Başlıyorum ama yarıda bırakıyorum", desc: "Kitap ilgi çekmeyi bırakıyor ve bir daha açmak zor geliyor." },
    { icon: "📱", title: "Telefonu elimden bırakamıyorum", desc: "Sosyal medya döngüsü dikkat süresini kısaltıyor ve okumak 'zor' hissettiriyor." },
    { icon: "😩", title: "Ağır kitaplar motivasyonu düşürüyor", desc: "Yanlış kitapla başlamak okumayı bir yükümlülüğe dönüştürüyor." },
  ];

  return (
    <section id="problem" className="bg-navy py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <span className="inline-block bg-white/10 text-white/70 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-5">
          Tanıdık geliyor mu?
        </span>
        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight">
          Kitap okumak <span className="text-amber-400">istemiyor</span> değilsin.
        </h2>
        <p className="text-white/50 mb-10 max-w-lg">
          Sadece doğru başlangıcı bulamadın. Çoğu okuyucu aynı engellerde takılır.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <div key={c.title} className="bg-white/6 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:-translate-y-0.5 transition-all">
              <div className="text-3xl mb-3">{c.icon}</div>
              <h3 className="text-white text-sm font-medium mb-2">{c.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const items = [
    { n: "01", title: "Kişisel okur profili testi", desc: "4 kısa soru ile okuma alışkanlıklarını, engellerini ve beklentilerini anlarız." },
    { n: "02", title: "Sana göre kitap önerisi", desc: "Ruh haline, müsait zamanına ve okuma seviyene göre seçilmiş 3 kitap." },
    { n: "03", title: "Günlük mikro hedefler", desc: "5–30 dakikalık gerçekçi hedeflerle alışkanlık yavaş yavaş otomatikleşir." },
    { n: "04", title: "Yarıda bırakınca ne olur?", desc: "Endişelenme. Neden bıraktığını analiz eder, sana daha uygun bir kitap öneririz." },
  ];

  return (
    <section id="solution" className="bg-cream py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-700 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-4">
            Okuya nasıl yardım eder?
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy tracking-tight mb-3">
            Okuya seni suçlamaz,<br />sana uygun yolu bulur.
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Okuma alışkanlığı bir disiplin meselesi değil, doğru başlangıç meselesidir.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => (
            <div key={item.n} className="bg-white border border-amber-100 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/5 transition-all">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-serif font-bold text-sm mb-4">
                {item.n}
              </div>
              <h3 className="font-semibold text-navy text-sm mb-2">{item.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: 1, title: "Kısa testi çöz", desc: "Zamanın, kitaplardaki engelin ve beklentin hakkında 4 soru. Sadece tıkla, yaz." },
    { n: 2, title: "Okur profilini öğren", desc: "Başlayamayan, yarıda bırakan, dikkati dağılan veya derinleşmek isteyen — hangisi sensin?" },
    { n: 3, title: "Sana özel 3 kitap önerisi al", desc: "Profiline, zamanına ve istediğin deneyime göre seçilmiş kitaplar." },
    { n: 4, title: "7 günlük mini okuma planına başla", desc: "İlk gün 5 dakika, ikinci gün 7 dakika... Beyin fark etmeden alışkanlığa dönüşür." },
    { n: 5, title: "İlerlemeni takip et", desc: "Her gün küçük bir başarı. Haftalık özet. Kitap bitirildiğinde sıradaki hazır." },
  ];

  return (
    <section id="how" className="bg-amber-50/60 py-20 px-6">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-green-100 text-green-700 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-4">
            Adım adım
          </span>
          <h2 className="font-serif text-3xl font-bold text-navy tracking-tight mb-2">5 adımda okur oluyorsun</h2>
          <p className="text-gray-500 text-sm">Tüm süreç 10 dakika içinde tamamlanır.</p>
        </div>
        <div className="flex flex-col">
          {steps.map((s, i) => (
            <div key={s.n} className={`flex gap-5 items-start py-5 ${i < steps.length - 1 ? "border-b border-dashed border-amber-200" : ""}`}>
              <div className="min-w-[40px] h-10 rounded-full bg-navy text-cream flex items-center justify-center font-serif font-bold text-sm flex-shrink-0">
                {s.n}
              </div>
              <div>
                <h3 className="font-semibold text-navy text-sm mb-1">{s.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Profiles() {
  const profiles = [
    { emoji: "🌱", name: "Başlayamayan Okur", desc: "Kitap almak istiyor, listeleri var ama bir türlü ilk sayfayı açamıyor.", tag: "Kısa & sürükleyici kitaplar" },
    { emoji: "🔖", name: "Yarıda Bırakan Okur", desc: "50–100 sayfa gidiyor, sonra kitap masanın köşesinde aylarca bekliyor.", tag: "Tempo tutarlı kitaplar" },
    { emoji: "📵", name: "Dikkati Dağılan Okur", desc: "Okurken telefonu eline alıyor, birkaç paragraftan sonra ne okuduğunu unutuyor.", tag: "Kısa bölümlü kitaplar" },
    { emoji: "🔭", name: "Derinleşmek İsteyen Okur", desc: "Okuyor ama yüzeysel kalıyor. Daha çok, daha anlayarak okumak istiyor.", tag: "Zengin içerikli kitaplar" },
  ];

  return (
    <section id="profiles" className="bg-cream py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-700 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-4">
            Okur profilleri
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy tracking-tight">Hangisi sensin?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {profiles.map((p) => (
            <div key={p.name} className="bg-white border border-amber-100 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/8 transition-all cursor-default">
              <div className="text-4xl mb-3">{p.emoji}</div>
              <h3 className="font-serif font-bold text-navy mb-2 text-base">{p.name}</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">{p.desc}</p>
              <span className="inline-block bg-amber-50 text-amber-600 rounded-full px-3 py-1 text-xs font-semibold">
                {p.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── QUIZ COMPONENT ──
function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const select = (opt: string) => {
    const next = [...answers];
    next[step] = opt;
    setAnswers(next);
  };

  const goNext = () => {
    if (!answers[step]) return;
    if (step < QUESTIONS.length - 1) setStep(step + 1);
    else setDone(true);
  };

  const goBack = () => { if (step > 0) setStep(step - 1); };

  const reset = () => { setStep(0); setAnswers([]); setDone(false); };

  if (done) {
    return <QuizResult answers={answers} onReset={reset} />;
  }

  const q = QUESTIONS[step];

  return (
    <div className="bg-white rounded-2xl p-8 max-w-xl mx-auto shadow-lg">
      {/* progress dots */}
      <div className="flex gap-1.5 mb-7">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1 rounded-full transition-colors duration-300 ${i < step ? "bg-green-400" : i === step ? "bg-amber-400" : "bg-gray-200"
              }`}
          />
        ))}
      </div>

      <h3 className="font-serif text-lg font-bold text-navy mb-1">{q.q}</h3>
      <p className="text-gray-400 text-xs mb-5">{q.hint}</p>

      <div className="grid grid-cols-2 gap-2 mb-6">
        {q.opts.map((opt) => (
          <button
            key={opt}
            onClick={() => select(opt)}
            className={`text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${answers[step] === opt
              ? "border-amber-400 bg-amber-50 text-amber-700 font-medium"
              : "border-gray-200 bg-gray-50 text-navy hover:border-amber-300 hover:bg-amber-50"
              }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={goBack}
          className={`text-sm text-gray-400 hover:text-navy transition-colors ${step === 0 ? "invisible" : ""}`}
        >
          ← Geri
        </button>
        <span className="text-xs text-gray-400">{step + 1} / {QUESTIONS.length}</span>
        <button
          onClick={goNext}
          disabled={!answers[step]}
          className={`bg-navy text-cream rounded-full px-5 py-2 text-sm font-medium transition-all ${answers[step] ? "hover:bg-navy/90 hover:-translate-y-0.5" : "opacity-40 cursor-not-allowed"
            }`}
        >
          {step === QUESTIONS.length - 1 ? "Profilimi göster →" : "İleri →"}
        </button>
      </div>
    </div>
  );
}

function QuizResult({ answers, onReset }: { answers: string[]; onReset: () => void }) {
  const profile = getProfile(answers);
  const books = getBookRecommendations(answers);
  const plan = PLANS[answers[0]] ?? PLANS["10 dakika"];
  const today = new Date();
  const [completedToday, setCompletedToday] = useState(false);
  const [streak, setStreak] = useState(0);
  const [selectedBook, setSelectedBook] = useState<BookEntry | null>(null);
  const [dailyPageGoal, setDailyPageGoal] = useState(10);
  const [isTrackingStarted, setIsTrackingStarted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesReadToday, setPagesReadToday] = useState("");
  const [bookSearch, setBookSearch] = useState("");
  const [manualTotalPages, setManualTotalPages] = useState("");

  const selectedTotalPages =
    selectedBook?.totalPages ?? (Number(manualTotalPages) || 0);

  const hasValidTotalPages = selectedTotalPages > 0;

  const remainingPages = Math.max(selectedTotalPages - currentPage, 0);

  const progressPercent = hasValidTotalPages
    ? Math.round((currentPage / selectedTotalPages) * 100)
    : 0;

  const estimatedDaysLeft =
    hasValidTotalPages && dailyPageGoal > 0
      ? Math.ceil(remainingPages / dailyPageGoal)
      : 0;
  const normalizedSearch = bookSearch.trim().toLowerCase();
  const [externalBooks, setExternalBooks] = useState<BookEntry[]>([]);
  const [isSearchingExternal, setIsSearchingExternal] = useState(false);
  const [externalSearchError, setExternalSearchError] = useState("");

  const searchedBooks =
    normalizedSearch.length > 0
      ? BOOKS.filter((book) =>
        `${book.title} ${book.author}`.toLowerCase().includes(normalizedSearch)
      ).slice(0, 6)
      : [];
  const getExternalBookLength = (pageCount?: number): BookEntry["length"] => {
    if (!pageCount) return "medium";
    if (pageCount <= 180) return "short";
    if (pageCount <= 350) return "medium";
    return "long";
  };

  const searchExternalBooks = async (queryText: string) => {
    const query = queryText.trim();

    if (query.length < 3) {
      setExternalBooks([]);
      return;
    }

    setIsSearchingExternal(true);
    setExternalSearchError("");
    setExternalBooks([]);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=8`
      );

      if (!response.ok) {
        throw new Error("Kitap araması başarısız oldu.");
      }

      const data = await response.json();

      const mappedBooks: BookEntry[] = (data.docs ?? [])
        .map((item: any) => {
          const title = item.title;
          const author = Array.isArray(item.author_name)
            ? item.author_name.slice(0, 2).join(", ")
            : "Bilinmeyen yazar";

          if (!title) return null;

          const pageCount =
            typeof item.number_of_pages_median === "number" &&
              item.number_of_pages_median > 0
              ? item.number_of_pages_median
              : undefined;

          return {
            id: `openlibrary-${item.key}`,
            title,
            author,
            totalPages: pageCount,
            reason: pageCount
              ? "Open Library üzerinden bulundu. Sayfa sayısı otomatik alındı."
              : "Open Library üzerinden bulundu. Sayfa sayısı bulunamadı; takibe başlamadan önce ekleyebilirsin.",
            length: getExternalBookLength(pageCount),
            pace: "balanced",
            difficulty: "easy",
            moods: ["Kısa & kolay"],
            coverColor: "#334155",
            showInQuiz: false,
          };
        })
        .filter(Boolean) as BookEntry[];

      setExternalBooks(mappedBooks);

      if (mappedBooks.length === 0) {
        setExternalSearchError("Bu aramada uygun kitap sonucu bulunamadı.");
      }
    } catch {
      setExternalSearchError("Kitap araması sırasında bir sorun oluştu. Lütfen tekrar dene.");
    } finally {
      setIsSearchingExternal(false);
    }
  };
  useEffect(() => {
    const query = bookSearch.trim();

    setExternalSearchError("");

    if (query.length < 3) {
      setExternalBooks([]);
      return;
    }

    if (searchedBooks.length > 0) {
      setExternalBooks([]);
      return;
    }

    const timer = window.setTimeout(() => {
      searchExternalBooks(query);
    }, 600);

    return () => window.clearTimeout(timer);
  }, [bookSearch, searchedBooks.length]);
  const selectBook = (book: BookEntry) => {
    setSelectedBook(book);
    setIsTrackingStarted(false);
    setCurrentPage(0);
    setPagesReadToday("");
    setBookSearch("");
    setManualTotalPages("");
  };
  const startTracking = () => {
    if (!hasValidTotalPages) return;

    setCurrentPage(0);
    setPagesReadToday("");
    setIsTrackingStarted(true);
  };

  const saveReadingProgress = () => {
    if (!selectedBook) return;

    const pages = Number(pagesReadToday);

    if (!Number.isFinite(pages) || pages <= 0) {
      return;
    }

    const nextPage = Math.min(currentPage + pages, selectedTotalPages);

    setCurrentPage(nextPage);
    setPagesReadToday("");
  };

  useEffect(() => {
    const todayKey = getTodayKey();
    const savedDate = localStorage.getItem("okuya-last-read-date");
    const savedStreak = Number(localStorage.getItem("okuya-streak") || "0");

    setCompletedToday(savedDate === todayKey);
    setStreak(savedStreak);
  }, []);

  const markTodayAsRead = () => {
    const todayKey = getTodayKey();
    const yesterdayKey = getYesterdayKey();

    const savedDate = localStorage.getItem("okuya-last-read-date");
    const savedStreak = Number(localStorage.getItem("okuya-streak") || "0");

    if (savedDate === todayKey) {
      return;
    }

    const nextStreak = savedDate === yesterdayKey ? savedStreak + 1 : 1;

    localStorage.setItem("okuya-last-read-date", todayKey);
    localStorage.setItem("okuya-streak", String(nextStreak));

    setCompletedToday(true);
    setStreak(nextStreak);
  };

  const PROFILE_COLORS: Record<string, string> = {
    "Başlayamayan Okur": "#2d6a4f",
    "Yarıda Bırakan Okur": "#b87d0e",
    "Dikkati Dağılan Okur": "#6d4c9e",
    "Derinleşmek İsteyen Okur": "#1a5276",
  };
  const color = PROFILE_COLORS[profile.name] ?? "#1a1f3c";

  return (
    <div className="bg-white rounded-2xl p-8 max-w-xl mx-auto shadow-lg">
      {/* Profile header */}
      <div className="rounded-xl p-5 mb-6 flex gap-4 items-center" style={{ background: color }}>
        <span className="text-5xl">{profile.emoji}</span>
        <div>
          <p className="font-serif font-bold text-white text-lg">{profile.name}</p>
          <p className="text-white/60 text-sm mt-0.5">{profile.desc}</p>
        </div>
      </div>

      {/* Today target */}


      {/* Books */}
      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
        İlgini çekebilecek kitaplar
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-cream rounded-2xl border border-amber-100 p-3 flex flex-col"
          >
            <div
              className="h-36 rounded-xl p-3 mb-3 flex flex-col justify-between text-white shadow-sm"
              style={{ background: book.coverColor }}
            >
              <div className="text-[10px] uppercase tracking-widest opacity-70">
                Okuya
              </div>

              <div>
                <p className="font-serif font-bold text-lg leading-tight">
                  {book.title}
                </p>
                <p className="text-xs opacity-75 mt-1">{book.author}</p>
              </div>

              <div className="text-[10px] opacity-70">
                {book.totalPages} sayfa
              </div>
            </div>

            <p className="font-semibold text-navy text-sm mb-1">{book.title}</p>
            <p className="text-gray-400 text-xs mb-3 line-clamp-3">
              {book.reason}
            </p>

            <button
              type="button"
              onClick={() => selectBook(book)}
              className="mt-auto bg-navy text-cream rounded-full px-4 py-2 text-xs font-medium hover:bg-navy/90 transition-all"
            >
              Okumaya başla
            </button>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-6">
        <div className="flex flex-col gap-2 mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            Başka bir kitap mı arıyorsun?
          </p>
          <label className="sr-only" htmlFor="book-search">
            Kitap veya yazar ara
          </label>
          <input
            id="book-search"
            type="text"
            value={bookSearch}
            onChange={(e) => setBookSearch(e.target.value)}
            placeholder="Kitap veya yazar ara... Örn. Simyacı"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-navy outline-none focus:border-amber-400"
          />
        </div>

        {bookSearch.trim().length > 0 ? (
          <>
            {searchedBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {searchedBooks.map((book) => (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => selectBook(book)}
                    className="text-left bg-white border border-amber-100 rounded-xl p-3 hover:border-amber-400 hover:bg-amber-50 transition-all"
                  >
                    <div className="flex gap-3 items-center">
                      <div
                        className="w-10 h-14 rounded-lg p-1.5 flex flex-col justify-between text-white flex-shrink-0"
                        style={{ background: book.coverColor }}
                      >
                        <span className="text-[6px] uppercase tracking-widest opacity-70">
                          Okuya
                        </span>
                        <span className="font-serif font-bold text-[9px] leading-tight">
                          {book.title.slice(0, 18)}
                        </span>
                        <span className="text-[6px] opacity-70">
                          {book.totalPages ? `${book.totalPages} syf` : "sayfa ?"}
                        </span>
                      </div>

                      <div>
                        <p className="font-semibold text-navy text-sm">
                          {book.title}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {book.author} ·{" "}
                          {book.totalPages
                            ? `${book.totalPages} sayfa`
                            : "sayfa sayısı bilinmiyor"}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-dashed border-gray-300 rounded-xl p-4 text-center">
                <p className="font-medium text-navy text-sm">
                  Bu kitap Okuya kitaplığında bulunamadı.
                </p>
                <p className="text-gray-400 text-xs mt-1 mb-4">
                  İstersen Google Books üzerinden daha geniş bir arama yapabilirsin.
                </p>



                {externalSearchError && (
                  <p className="text-red-500 text-xs mt-3">
                    {externalSearchError}
                  </p>
                )}
              </div>
            )}

            {externalBooks.length > 0 && (
              <div className="mt-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
                  Open Library sonuçları
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {externalBooks.map((book) => (
                    <button
                      key={book.id}
                      type="button"
                      onClick={() => selectBook(book)}
                      className="text-left bg-white border border-amber-100 rounded-xl p-3 hover:border-amber-400 hover:bg-amber-50 transition-all"
                    >
                      <div className="flex gap-3 items-center">
                        <div
                          className="w-10 h-14 rounded-lg p-1.5 flex flex-col justify-between text-white flex-shrink-0"
                          style={{ background: book.coverColor }}
                        >
                          <span className="text-[6px] uppercase tracking-widest opacity-70">
                            Library
                          </span>
                          <span className="font-serif font-bold text-[9px] leading-tight">
                            {book.title.slice(0, 18)}
                          </span>
                          <span className="text-[6px] opacity-70">
                            {book.totalPages ? `${book.totalPages} syf` : "sayfa ?"}
                          </span>
                        </div>

                        <div>
                          <p className="font-semibold text-navy text-sm">
                            {book.title}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {book.author} ·{" "}
                            {book.totalPages
                              ? `${book.totalPages} sayfa`
                              : "sayfa sayısı bilinmiyor"}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-400 text-xs">
            Önerilenlerde yoksa kitap adını veya yazarını arayabilirsin.
          </p>
        )}
      </div>
      {selectedBook ? (
        <>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600 mb-2">
              Seçilen kitap
            </p>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-6 items-start">
              <div className="flex gap-4 items-center">
                <div
                  className="w-16 h-24 rounded-xl p-2 flex flex-col justify-between text-white flex-shrink-0"
                  style={{ background: selectedBook.coverColor }}
                >
                  <span className="text-[8px] uppercase tracking-widest opacity-70">
                    Okuya
                  </span>
                  <span className="font-serif font-bold text-xs leading-tight">
                    {selectedBook.title}
                  </span>
                  <span className="text-[8px] opacity-70">
                    {selectedBook.totalPages ? `${selectedBook.totalPages} syf` : "sayfa ?"}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-navy text-lg">
                    {selectedBook.title}
                  </h4>
                  <p className="text-gray-500 text-xs mb-2">
                    {selectedBook.author}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {selectedBook.reason}
                  </p>
                </div>
              </div>

              <div className="border-t md:border-t-0 md:border-l border-amber-200 pt-5 md:pt-0 md:pl-5">
                {!selectedBook.totalPages && (
                  <div className="mb-4">
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-amber-600 mb-2">
                      Toplam sayfa sayısı
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={manualTotalPages}
                      onChange={(e) => setManualTotalPages(e.target.value)}
                      placeholder="Örn. 240"
                      className="w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-sm text-navy outline-none focus:border-amber-400"
                    />

                    <p className="text-gray-400 text-xs mt-2">
                      Bu kitabın sayfa sayısı bulunamadı. Takibe başlamak için toplam sayfa sayısını gir.
                    </p>
                  </div>
                )}
                <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600 mb-3">
                  Günlük sayfa hedefin
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {[5, 10, 15, 20, 30].map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setDailyPageGoal(goal)}
                      className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${dailyPageGoal === goal
                        ? "bg-navy text-cream"
                        : "bg-white text-navy border border-amber-200 hover:border-amber-400"
                        }`}
                    >
                      {goal} sayfa
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                    <p className="font-serif font-bold text-navy text-lg">
                      {hasValidTotalPages ? selectedTotalPages : "?"}
                    </p>
                    <p className="text-gray-400 text-[10px]">toplam sayfa</p>
                  </div>

                  <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                    <p className="font-serif font-bold text-navy text-lg">
                      {dailyPageGoal}
                    </p>
                    <p className="text-gray-400 text-[10px]">günlük hedef</p>
                  </div>

                  <div className="bg-white rounded-xl p-3 text-center border border-amber-100">
                    <p className="font-serif font-bold text-navy text-lg">
                      {hasValidTotalPages ? Math.ceil(selectedTotalPages / dailyPageGoal) : "?"}
                    </p>
                    <p className="text-gray-400 text-[10px]">tahmini gün</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={startTracking}
                  disabled={!hasValidTotalPages}
                  className={`mt-4 w-full rounded-xl py-3 text-sm font-medium transition-all ${hasValidTotalPages
                    ? "bg-navy text-cream hover:bg-navy/90 hover:-translate-y-0.5"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  Okuma takibini başlat
                </button>
              </div>
            </div>
          </div>

          {isTrackingStarted && (
            <div className="bg-navy rounded-2xl p-5 mb-6 text-white">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50 mb-2">
                Aktif okuma takibi
              </p>

              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h4 className="font-serif font-bold text-2xl">
                    {selectedBook.title}
                  </h4>
                  <p className="text-white/50 text-sm mt-1">
                    {selectedBook.author}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-serif font-bold text-2xl text-amber-400">
                    %{progressPercent}
                  </p>
                  <p className="text-white/40 text-xs">tamamlandı</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-full h-3 mb-5 overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="bg-white/8 border border-white/10 rounded-xl p-3 text-center">
                  <p className="font-serif font-bold text-xl">{currentPage}</p>
                  <p className="text-white/40 text-[10px]">okunan sayfa</p>
                </div>

                <div className="bg-white/8 border border-white/10 rounded-xl p-3 text-center">
                  <p className="font-serif font-bold text-xl">{remainingPages}</p>
                  <p className="text-white/40 text-[10px]">kalan sayfa</p>
                </div>

                <div className="bg-white/8 border border-white/10 rounded-xl p-3 text-center">
                  <p className="font-serif font-bold text-xl">{estimatedDaysLeft}</p>
                  <p className="text-white/40 text-[10px]">tahmini gün</p>
                </div>
              </div>

              {progressPercent >= 100 ? (
                <div className="bg-green-400/15 border border-green-300/20 rounded-xl p-4 text-center">
                  <p className="font-serif font-bold text-xl text-green-200">
                    Tebrikler, kitabı bitirdin 🎉
                  </p>
                  <p className="text-green-100/70 text-sm mt-1">
                    Bir sonraki adımda bu kitabı rafına ekleyebileceksin.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-xl p-4 text-navy">
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                    Bugün kaç sayfa okudun?
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="1"
                      value={pagesReadToday}
                      onChange={(e) => setPagesReadToday(e.target.value)}
                      placeholder="Örn. 12"
                      className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-amber-400"
                    />

                    <button
                      type="button"
                      onClick={saveReadingProgress}
                      className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-4 py-3 text-sm font-medium transition-all"
                    >
                      Kaydet
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-6 text-center">
          <p className="font-serif font-bold text-navy text-lg mb-1">
            Okuma planını başlatmak için bir kitap seç.
          </p>
          <p className="text-gray-400 text-sm">
            Yukarıdaki kitaplardan birini seçtiğinde günlük hedefini belirleyip okuma takibine başlayabileceksin.
          </p>
        </div>
      )}

      <button
        onClick={onReset}
        className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-xl py-3 font-medium transition-all hover:-translate-y-0.5"
      >
        Tekrar dene →
      </button>
    </div>
  );
}

function QuizSection() {
  return (
    <section id="quiz" className="bg-navy py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-white/10 text-white/70 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-4">
            Şimdi dene
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white tracking-tight mb-2">
            Okur profilini hemen öğren
          </h2>
          <p className="text-white/50 text-sm">
            4 soru, 2 dakika. Sana özel bir plan hazır.
          </p>
        </div>
        <Quiz />
      </div>
    </section>
  );
}


function Testimonials() {
  const items = [
    { text: "Aldığım kitapları hep yarıda bırakıyordum. Artık bir yükümlülük gibi hissettiriyordu. Okuya bana 8 dakikalık hedef verdi — ilk kez bir kitabı bitirdim.", meta: "Zeynep, 28", profile: "Yarıda bırakan okur profili" },
    { text: "Günde 5 dakika ile başladım. İki hafta sonra fark etmeden 20 dakika okur olmuştum. Alışkanlık gerçekten kümülatif çalışıyor.", meta: "Berk, 34", profile: "Başlayamayan okur profili" },
    { text: "Ne okuyacağımı seçmek en zor kısımdı. Okuya zaten karar verdiği için direkt okumaya geçtim. Seçim yorgunluğu yok.", meta: "Selin, 22", profile: "Dikkati dağılan okur profili" },
  ];

  return (
    <section id="testimonials" className="bg-amber-50/60 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-700 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-4">
            Kullanıcı senaryoları
          </span>
          <h2 className="font-serif text-3xl font-bold text-navy tracking-tight mb-3">Tanıdık hikayeler</h2>
          <p className="text-gray-400 text-xs max-w-xs mx-auto">
            Bunlar kurgusal kullanıcı senaryolarıdır; Okuya&apos;nın hangi durumlar için tasarlandığını gösterir.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((t) => (
            <div key={t.meta} className="bg-white border border-amber-100 rounded-2xl p-6">
              <span className="inline-block bg-green-100 text-green-700 rounded-full px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider mb-4">
                Örnek senaryo
              </span>
              <p className="font-serif italic text-navy text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="text-xs text-gray-500">
                <span className="font-medium text-navy">{t.meta}</span> — {t.profile}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="cta" className="bg-navy py-24 px-6 text-center">
      <div className="max-w-xl mx-auto">
        <p className="text-white/40 text-sm mb-3">Ücretsiz başla</p>
        <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
          Bugün sadece<br />
          <em className="not-italic text-amber-400">5 dakika</em> ile başlayabilirsin.
        </h2>
        <p className="text-white/50 mb-8">Kredi kartı yok. Hesap açma zorunluluğu yok. Sadece 4 soru.</p>
        <div className="flex justify-center gap-6 flex-wrap mb-8 text-sm text-white/50">
          {["Profil testi", "Kitap önerileri", "7 günlük plan"].map((s) => (
            <span key={s} className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">✓</span>
              {s}
            </span>
          ))}
        </div>
        <a href="#quiz" className="inline-block bg-amber-500 hover:bg-amber-600 text-white rounded-full px-9 py-4 text-base font-medium transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-400/30">
          Okur profilimi oluştur
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0f1229] px-6 py-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-serif text-white text-lg font-bold">
            Oku<span className="text-amber-400">ya</span>
          </p>
          <p className="text-white/30 text-xs mt-0.5">{BRAND.tagline}</p>
        </div>
        <div className="flex gap-5 text-white/40 text-sm">
          {["Hakkında", "Gizlilik", "İletişim"].map((l) => (
            <a key={l} href="#" className="hover:text-white/80 transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ── PAGE ──
export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Profiles />
        <QuizSection />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

