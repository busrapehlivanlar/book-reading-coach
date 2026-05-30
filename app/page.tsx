"use client";

import { useState } from "react";

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

type BookEntry = [title: string, author: string, reason: string];

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
  { emoji: "🌱", name: "Başlayamayan Okur",       desc: "En zor kısım ilk adım. Küçük başlayıp büyüyeceksin." },
  { emoji: "🔖", name: "Yarıda Bırakan Okur",     desc: "Yanlış kitap değilsin sen — yanlış tempo vardı. Bunu çözeceğiz." },
  { emoji: "📵", name: "Dikkati Dağılan Okur",    desc: "Kısa bölümler, somut hedefler. Beyin buna alışacak." },
  { emoji: "🔭", name: "Derinleşmek İsteyen Okur", desc: "Okuyorsun zaten. Şimdi sıra daha anlamlı kitaplarda." },
];

const BOOKS_BY_EXP: Record<string, BookEntry[]> = {
  "Sürükleyici & aksiyon": [
    ["Dürüst Aldatıcı",  "Dani Shapiro",      "Kısa, hızlı tempolu, bırakamıyorsun."],
    ["Karga Kral",       "Leigh Bardugo",     "Sürükleyici, takım dinamikleri."],
    ["Hayvan Çiftliği",  "George Orwell",     "Kısa ve güçlü, modern klasik."],
  ],
  "Öğretici & bilgi verici": [
    ["Atomik Alışkanlıklar", "James Clear",         "Alışkanlık bilimi, pratik."],
    ["Sapiens",              "Yuval Noah Harari",   "İnsanlık tarihi, kolay dil."],
    ["Düşün ve Zengin Ol",  "Napoleon Hill",        "Motivasyon klasiği."],
  ],
  "Duygusal & içsel": [
    ["Küçük Prens",          "Antoine de Saint-Exupéry", "Kısa, derin, her yaşa."],
    ["Sofie'nin Dünyası",    "Jostein Gaarder",           "Felsefeye giriş, roman formatında."],
    ["Kite Runner",          "Khaled Hosseini",           "Güçlü karakter, duygusal yolculuk."],
  ],
  "Kısa & kolay": [
    ["Hayvan Çiftliği",          "George Orwell",              "90 sayfa, keskin mesaj."],
    ["Martı Jonathan Livingston", "Richard Bach",               "60 sayfa, ilham verici."],
    ["Küçük Prens",              "Antoine de Saint-Exupéry",   "96 sayfa, evrensel."],
  ],
};

const PLANS: Record<string, string[]> = {
  "5 dakika":   ["5 dk","6 dk","7 dk","8 dk","8 dk","10 dk","10 dk"],
  "10 dakika":  ["10 dk","12 dk","12 dk","15 dk","15 dk","15 dk","20 dk"],
  "15 dakika":  ["15 dk","15 dk","20 dk","20 dk","25 dk","25 dk","30 dk"],
  "30 dakika+": ["30 dk","30 dk","35 dk","35 dk","40 dk","40 dk","45 dk"],
};

const DAYS = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

// ── HELPERS ──
function getProfile(answers: string[]): Profile {
  const level = answers[3];
  const bore  = answers[1];
  const time  = answers[0];
  if (level === "Yeni başlıyorum") return PROFILES[0];
  if (bore === "Yavaş tempo" || bore === "Çok uzun olması") return PROFILES[1];
  if (time === "5 dakika" || time === "10 dakika") return PROFILES[2];
  return PROFILES[3];
}

// ── SUB-COMPONENTS ──

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-amber-100 px-6 h-[60px] flex items-center justify-between">
      <span className="font-serif text-2xl font-bold text-navy tracking-tight">
        Oku<span className="text-amber-500">ya</span>
      </span>
      <div className="hidden sm:flex items-center gap-6">
        <a href="#how"      className="text-sm text-gray-500 hover:text-navy transition-colors">Nasıl çalışır?</a>
        <a href="#profiles" className="text-sm text-gray-500 hover:text-navy transition-colors">Okur profilleri</a>
        <a href="#quiz"     className="text-sm text-gray-500 hover:text-navy transition-colors">Demoyu dene</a>
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
            {[["5 dk","günlük minimum"],["7 gün","başlangıç planı"],["3 kitap","sana özel öneri"]].map(([val, lbl]) => (
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
    { n: "02", title: "Sana göre kitap önerisi",    desc: "Ruh haline, müsait zamanına ve okuma seviyene göre seçilmiş 3 kitap." },
    { n: "03", title: "Günlük mikro hedefler",      desc: "5–30 dakikalık gerçekçi hedeflerle alışkanlık yavaş yavaş otomatikleşir." },
    { n: "04", title: "Yarıda bırakınca ne olur?",  desc: "Endişelenme. Neden bıraktığını analiz eder, sana daha uygun bir kitap öneririz." },
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
    { n: 1, title: "Kısa testi çöz",              desc: "Zamanın, kitaplardaki engelin ve beklentin hakkında 4 soru. Sadece tıkla, yaz." },
    { n: 2, title: "Okur profilini öğren",         desc: "Başlayamayan, yarıda bırakan, dikkati dağılan veya derinleşmek isteyen — hangisi sensin?" },
    { n: 3, title: "Sana özel 3 kitap önerisi al", desc: "Profiline, zamanına ve istediğin deneyime göre seçilmiş kitaplar." },
    { n: 4, title: "7 günlük mini okuma planına başla", desc: "İlk gün 5 dakika, ikinci gün 7 dakika... Beyin fark etmeden alışkanlığa dönüşür." },
    { n: 5, title: "İlerlemeni takip et",           desc: "Her gün küçük bir başarı. Haftalık özet. Kitap bitirildiğinde sıradaki hazır." },
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
    { emoji: "🌱", name: "Başlayamayan Okur",       desc: "Kitap almak istiyor, listeleri var ama bir türlü ilk sayfayı açamıyor.", tag: "Kısa & sürükleyici kitaplar" },
    { emoji: "🔖", name: "Yarıda Bırakan Okur",     desc: "50–100 sayfa gidiyor, sonra kitap masanın köşesinde aylarca bekliyor.", tag: "Tempo tutarlı kitaplar" },
    { emoji: "📵", name: "Dikkati Dağılan Okur",    desc: "Okurken telefonu eline alıyor, birkaç paragraftan sonra ne okuduğunu unutuyor.", tag: "Kısa bölümlü kitaplar" },
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
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [done, setDone]       = useState(false);

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
            className={`flex-1 h-1 rounded-full transition-colors duration-300 ${
              i < step ? "bg-green-400" : i === step ? "bg-amber-400" : "bg-gray-200"
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
            className={`text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${
              answers[step] === opt
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
          className={`bg-navy text-cream rounded-full px-5 py-2 text-sm font-medium transition-all ${
            answers[step] ? "hover:bg-navy/90 hover:-translate-y-0.5" : "opacity-40 cursor-not-allowed"
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
  const books   = BOOKS_BY_EXP[answers[2]] ?? BOOKS_BY_EXP["Kısa & kolay"];
  const plan    = PLANS[answers[0]] ?? PLANS["10 dakika"];
  const today   = new Date();

  const PROFILE_COLORS: Record<string, string> = {
    "Başlayamayan Okur":       "#2d6a4f",
    "Yarıda Bırakan Okur":     "#b87d0e",
    "Dikkati Dağılan Okur":    "#6d4c9e",
    "Derinleşmek İsteyen Okur":"#1a5276",
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
      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Bugünkü hedef</p>
      <div className="flex gap-3 mb-6">
        <div className="flex-1 bg-amber-50 border border-amber-200/50 rounded-xl p-4 text-center">
          <p className="font-serif font-bold text-amber-600 text-2xl">{plan[0]}</p>
          <p className="text-amber-600/70 text-xs mt-1">okuma süresi</p>
        </div>
        <div className="flex-1 bg-green-50 border border-green-200/50 rounded-xl p-4 text-center">
          <p className="font-serif font-bold text-green-700 text-2xl">Gün 1</p>
          <p className="text-green-600/70 text-xs mt-1">başlıyoruz</p>
        </div>
      </div>

      {/* Books */}
      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Sana özel kitaplar</p>
      <div className="flex flex-col gap-2 mb-6">
        {books.map(([title, author, reason]) => (
          <div key={title} className="flex gap-3 items-center bg-cream rounded-xl p-3 border border-amber-100">
            <div
              className="w-9 h-12 rounded flex items-center justify-center text-cream text-[9px] font-bold text-center p-0.5 flex-shrink-0"
              style={{ background: color }}
            >
              {title.slice(0, 4)}
            </div>
            <div>
              <p className="font-semibold text-navy text-sm">{title}</p>
              <p className="text-gray-400 text-xs">{author} — {reason}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 7-day plan */}
      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">7 günlük başlangıç planı</p>
      <div className="grid grid-cols-7 gap-1 mb-6">
        {plan.map((d, i) => {
          const day = DAYS[(today.getDay() + i) % 7];
          const isFirst = i === 0;
          return (
            <div
              key={i}
              className={`rounded-lg p-1.5 text-center ${isFirst ? "bg-amber-400" : "bg-gray-100 border border-gray-200"}`}
            >
              <p className={`text-[10px] font-bold ${isFirst ? "text-white" : "text-navy"}`}>{day}</p>
              <p className={`text-[9px] mt-0.5 ${isFirst ? "text-white" : "text-gray-400"}`}>{d}</p>
            </div>
          );
        })}
      </div>

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
          <p className="text-white/50 text-sm">4 soru, 2 dakika. Sana özel bir plan hazır.</p>
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
