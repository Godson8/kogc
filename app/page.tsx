"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const heroImages = [
  "/hero/hero_1.JPG",
  "/hero/hero_2.JPG",
  "/hero/hero_3.JPG",
  "/hero/hero_4.JPG",
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Groups", href: "#groups" },
  { label: "Location", href: "#location" },
];

const communityGroups = [
  {
    name: "Excellent Men",
    image: "/men2.jpeg",
    desc: "A brotherhood built on faith, integrity, and servant leadership.",
  },
  {
    name: "Virtuous Women",
    image: "/women.jpeg",
    desc: "Empowering women to walk in purpose, grace, and strength.",
  },
  {
    name: "Young Adults",
    image: "/youngAdults.jpeg",
    desc: "Equipping the next generation to lead with courage and conviction.",
  },
  {
    name: "Teenagers",
    image: "/teens.jpg",
    desc: "A safe space for teens to grow in faith and find community.",
  },
  {
    name: "Children",
    image: "/children.jpeg",
    desc: "Planting seeds of faith in the hearts of our youngest members.",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Check if currently within a service window (Calgary / Mountain Time)
  const checkLive = () => {
    const now = new Date();
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Edmonton",
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).formatToParts(now);
    const day = parts.find((p) => p.type === "weekday")?.value ?? "";
    const hour = parseInt(
      parts.find((p) => p.type === "hour")?.value ?? "0",
      10,
    );
    const min = parseInt(
      parts.find((p) => p.type === "minute")?.value ?? "0",
      10,
    );
    const totalMin = hour * 60 + min;
    // Sunday 9:00 AM – 12:00 PM  → 540 – 720
    // Wednesday 7:00 PM – 8:30 PM → 1140 – 1230
    const live =
      (day === "Sunday" && totalMin >= 540 && totalMin < 720) ||
      (day === "Wednesday" && totalMin >= 1140 && totalMin < 1230);
    setIsLive(live);
  };

  useEffect(() => {
    checkLive();
    const timer = setInterval(checkLive, 60_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="min-h-screen">
      {/* ── NAVBAR ────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-[background,box-shadow] duration-300 ${
          scrolled
            ? "bg-white shadow-[0_2px_24px_rgba(107,33,168,0.1)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between py-4">
          <a href="#home" className="flex-shrink-0">
            <Image
              src="/kogc_logo.png"
              alt="RCCG King of Glory Chapel"
              width={160}
              height={56}
              className="h-14 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`font-epilogue text-[0.9rem] font-semibold tracking-wide transition-colors duration-200 relative group ${
                    scrolled
                      ? "text-[#2d2d3a] hover:text-[#6B21A8]"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-[2px] group-hover:w-full transition-[width] duration-300 rounded-full ${
                      scrolled ? "bg-[#6B21A8]" : "bg-white"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#give"
            className={`hidden md:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-epilogue font-bold tracking-wide active:scale-95 transition-[background,border,transform] duration-200 ${
              scrolled
                ? "bg-[#6B21A8] text-white hover:bg-[#581c87] shadow-[0_4px_14px_rgba(107,33,168,0.35)]"
                : "border-2 border-white/80 text-white hover:bg-white/15"
            }`}
          >
            Give
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className={`md:hidden p-2 rounded-xl transition-colors duration-200 ${
              scrolled
                ? "text-[#2d2d3a] hover:bg-purple-50"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* ── MOBILE FULL-SCREEN MENU ───────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[60] bg-[#0f0f1a] flex flex-col transition-[opacity,transform] duration-300 ease-in-out md:hidden ${
          mobileOpen
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <Image
            src="/kogc_logo.png"
            alt="RCCG King of Glory Chapel"
            width={140}
            height={50}
            className="h-12 w-auto object-contain"
          />
          <button
            onClick={closeMobile}
            aria-label="Close menu"
            className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-200"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Nav links — vertically centered */}
        <div className="flex flex-col flex-1 justify-center px-8 gap-1">
          {[...navLinks, { label: "Give", href: "#give" }].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMobile}
              className="font-epilogue font-bold text-white text-[2rem] py-4 border-b border-white/10 hover:text-[#C9A84C] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Footer area */}
        <div className="px-8 pb-12 pt-6">
          <p className="text-white/40 text-sm mb-5">
            3927 Edmonton Trl, Calgary, AB T2E 6T1
          </p>
          <div className="flex gap-3">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/p/King-of-Glory-Chapel-100064316577251/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#6B21A8] transition-colors duration-200"
            >
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/kogchapel/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#6B21A8] transition-colors duration-200"
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="0.8"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="https://www.youtube.com/@rccgkingofglorychapelcalga5619"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#6B21A8] transition-colors duration-200"
            >
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                <polygon
                  fill="#0f0f1a"
                  points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── HERO SECTION ──────────────────────────────────────────── */}
      <section
        id="home"
        className="relative h-screen min-h-[600px] overflow-hidden"
      >
        {/* Carousel images */}
        {heroImages.map((src, idx) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: idx === currentSlide ? 1 : 0 }}
          >
            <Image
              src={src}
              alt={`Hero slide ${idx + 1}`}
              fill
              className="object-cover object-center"
              priority={idx === 0}
              sizes="100vw"
            />
          </div>
        ))}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-16 max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-[#C9A84C] font-epilogue font-semibold text-sm tracking-[0.2em] uppercase mb-4">
              Redeemed Christian Church of God
            </p>
            <h1
              className="font-epilogue font-extrabold text-white leading-[1.1] tracking-[-0.02em] mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              King of Glory Chapel
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-lg">
              A place of worship, community, and transforming grace. Come as you
              are — belong as family.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#about"
                className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#6B21A8] text-white font-epilogue font-bold text-sm tracking-wide hover:bg-[#581c87] active:scale-95 transition-[background,transform] duration-200 shadow-[0_4px_18px_rgba(107,33,168,0.5)]"
              >
                Learn More
              </a>
              <a
                href="#location"
                className="inline-flex items-center px-7 py-3.5 rounded-full border-2 border-white/70 text-white font-epilogue font-bold text-sm tracking-wide hover:bg-white/10 active:scale-95 transition-[background,transform] duration-200"
              >
                Join Us
              </a>
            </div>
          </div>

          {/* ── LIVE NOW CARD — shown only during service times ── */}
          {isLive && (
            <div className="absolute bottom-16 right-6 lg:right-16 bg-white rounded-2xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.25)] min-w-[230px]">
              {/* Live badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                </span>
                <span className="font-epilogue font-extrabold text-red-500 text-xs tracking-[0.2em] uppercase">
                  Live Now
                </span>
              </div>
              <p className="font-epilogue font-bold text-[#1a1a2e] text-base leading-snug mb-1">
                Worship with us anywhere
              </p>
              <p className="text-2xl leading-none mb-4">🌍</p>
              <a
                href="https://www.youtube.com/@rccgkingofglorychapelcalga5619/live"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 py-2.5 rounded-xl bg-[#6B21A8] text-white font-epilogue font-bold text-xs tracking-wide hover:bg-[#581c87] active:scale-95 transition-[background,transform] duration-200"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Livestream
              </a>
            </div>
          )}
        </div>

        {/* Carousel dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`rounded-full transition-[width,background] duration-300 ${
                idx === currentSlide
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── SERVICES SECTION ──────────────────────────────────────── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#6B21A8] font-epilogue font-semibold text-xs tracking-[0.2em] uppercase mb-3">
                Worship With Us
              </p>
              <h2 className="font-epilogue font-bold text-[#1a1a2e] text-3xl lg:text-4xl leading-tight tracking-[-0.02em] mb-4">
                Join our services
                <br />
                this week
              </h2>
              <p className="text-[#6B7280] leading-[1.7] text-base">
                We believe in the power of gathered worship. Whether you&apos;re
                joining us for the first time or the hundredth, you&apos;ll find
                a warm community ready to welcome you.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Sunday */}
              <div className="bg-[#F3EEFF] rounded-2xl p-6 border border-purple-100">
                <div className="w-10 h-10 rounded-xl bg-[#6B21A8]/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-[#6B21A8]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <p className="text-[#374151] font-epilogue font-bold text-sm mb-1">
                  Sunday Service
                </p>
                <p className="font-epilogue font-bold text-[#6B21A8] text-2xl leading-tight">
                  9:00 AM
                </p>
                <p className="text-[#9CA3AF] text-xs mt-1.5 leading-snug">
                  Worship, Word &amp; Prayer
                </p>
              </div>

              {/* Wednesday */}
              <div className="bg-[#FDF8EC] rounded-2xl p-6 border border-yellow-100">
                <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-[#C9A84C]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                    />
                  </svg>
                </div>
                <p className="text-[#374151] font-epilogue font-bold text-sm mb-1">
                  Wednesday Study
                </p>
                <p className="font-epilogue font-bold text-[#C9A84C] text-2xl leading-tight">
                  7:00 PM
                </p>
                <p className="text-[#9CA3AF] text-xs mt-1.5 leading-snug">
                  Digging Deep &amp; Prayer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ──────────────────────────────────────── */}
      <section className="py-20 bg-[#F9F7FF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_4px_24px_rgba(107,33,168,0.06)] border border-purple-50">
              <div className="w-12 h-12 rounded-2xl bg-[#6B21A8]/10 flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-[#6B21A8]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-epilogue font-bold text-[#1a1a2e] text-2xl mb-4 tracking-[-0.01em]">
                Mission
              </h3>
              <p className="text-[#6B7280] leading-[1.7] text-base">
                To make heaven, to take as many people with us, to have churches
                all over the world and to accomplish the Great Commission
                through wholesome discipleship, equipping believers to impact
                their communities with the love of Christ.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_4px_24px_rgba(201,168,76,0.08)] border border-yellow-50">
              <div className="w-12 h-12 rounded-2xl bg-[#C9A84C]/10 flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-[#C9A84C]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="font-epilogue font-bold text-[#1a1a2e] text-2xl mb-4 tracking-[-0.01em]">
                Vision
              </h3>
              <p className="text-[#6B7280] leading-[1.7] text-base">
                To be a model church that demonstrates the kingdom of God in all
                its fullness — a lighthouse in the community where lives are
                transformed, families are restored, and destinies are fulfilled
                through the power of the Holy Spirit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMUNITY GROUPS ──────────────────────────────────────── */}
      <section id="groups" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-[#6B21A8] font-epilogue font-semibold text-xs tracking-[0.2em] uppercase mb-3">
              Connect &amp; Belong
            </p>
            <h2 className="font-epilogue font-bold text-[#1a1a2e] text-3xl lg:text-4xl tracking-[-0.02em]">
              Our Community Groups
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {communityGroups.slice(0, 3).map((group) => (
              <div
                key={group.name}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
              >
                <div className="relative h-72">
                  <Image
                    src={group.image}
                    alt={group.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#6B21A8]/20 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-epilogue font-bold text-white text-xl mb-1">
                    {group.name}
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {group.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-2/3 lg:mx-auto">
            {communityGroups.slice(3).map((group) => (
              <div
                key={group.name}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
              >
                <div className="relative h-72">
                  <Image
                    src={group.image}
                    alt={group.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-[#6B21A8]/20 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-epilogue font-bold text-white text-xl mb-1">
                    {group.name}
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {group.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION SECTION ──────────────────────────────────────── */}
      <section
        id="location"
        className="py-24 bg-[#F9F7FF] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6B21A8]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C9A84C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="text-center mb-14">
            <p className="text-[#6B21A8] font-epilogue font-semibold text-xs tracking-[0.2em] uppercase mb-3">
              Find Us
            </p>
            <h2 className="font-epilogue font-bold text-[#1a1a2e] text-3xl lg:text-4xl tracking-[-0.02em] mb-4">
              Our Location
            </h2>
            <p className="text-[#6B7280] text-base leading-[1.7] max-w-md mx-auto">
              We&apos;d love to meet you in person. Come worship with us —
              everyone is welcome.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-stretch">
            <div className="lg:col-span-2 flex flex-col gap-5">
              {/* Address */}
              <div className="bg-white rounded-2xl p-7 shadow-[0_4px_24px_rgba(107,33,168,0.07)] border border-purple-50 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#6B21A8] flex items-center justify-center flex-shrink-0 shadow-[0_4px_12px_rgba(107,33,168,0.3)]">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-epilogue font-bold text-[#1a1a2e] text-sm uppercase tracking-wider mb-1">
                    Address
                  </p>
                  <p className="text-[#374151] text-base font-medium leading-snug">
                    3927 Edmonton Trl
                  </p>
                  <p className="text-[#374151] text-base font-medium">
                    Calgary, AB T2E 6T1
                  </p>
                  <a
                    href="https://maps.google.com/?q=3927+Edmonton+Trl,+Calgary,+AB+T2E+6T1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-[#6B21A8] text-sm font-epilogue font-semibold hover:text-[#581c87] transition-colors duration-200 group"
                  >
                    Get Directions
                    <svg
                      className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Service times */}
              <div className="bg-white rounded-2xl p-7 shadow-[0_4px_24px_rgba(107,33,168,0.07)] border border-purple-50">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-[#C9A84C]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="font-epilogue font-bold text-[#1a1a2e] text-sm uppercase tracking-wider">
                    Service Times
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-epilogue font-bold text-[#1a1a2e] text-sm">
                        Sunday Service
                      </p>
                      <p className="text-[#9CA3AF] text-xs mt-0.5">
                        Worship, Word &amp; Prayer
                      </p>
                    </div>
                    <span className="font-epilogue font-bold text-[#6B21A8] text-sm whitespace-nowrap">
                      9:00 AM
                    </span>
                  </div>
                  <div className="h-px bg-gray-100" />
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-epilogue font-bold text-[#1a1a2e] text-sm">
                        Wednesday Study
                      </p>
                      <p className="text-[#9CA3AF] text-xs mt-0.5">
                        Digging Deep &amp; Prayer
                      </p>
                    </div>
                    <span className="font-epilogue font-bold text-[#C9A84C] text-sm whitespace-nowrap">
                      7:00 PM
                    </span>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=3927+Edmonton+Trl,+Calgary,+AB+T2E+6T1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-[#6B21A8] text-white font-epilogue font-bold text-sm tracking-wide hover:bg-[#581c87] active:scale-[0.98] transition-[background,transform] duration-200 shadow-[0_4px_18px_rgba(107,33,168,0.35)]"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Open in Google Maps
              </a>
            </div>

            {/* Map */}
            <div className="lg:col-span-3 rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(107,33,168,0.12)] border border-purple-100 min-h-[420px]">
              <iframe
                src="https://maps.google.com/maps?q=3927+Edmonton+Trail+NE,+Calgary,+AB+T2E+6T1,+Canada&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "420px", display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="RCCG King of Glory Chapel"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── GIVE SECTION ──────────────────────────────────────────── */}
      <section id="give" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-[#6B21A8] font-epilogue font-semibold text-xs tracking-[0.2em] uppercase mb-3">
            Support the Ministry
          </p>
          <h2 className="font-epilogue font-bold text-[#1a1a2e] text-4xl lg:text-5xl tracking-[-0.02em] mb-4">
            Give
          </h2>
          <p className="text-[#6B7280] text-base leading-[1.7] max-w-xl mx-auto mb-14">
            Your generous giving supports our church programs, outreach, and the
            spread of the Gospel. Every gift, large or small, makes a
            difference.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Interac */}
            <div className="bg-[#F9F7FF] rounded-2xl p-8 shadow-[0_4px_20px_rgba(107,33,168,0.06)] border border-purple-50 hover:shadow-[0_8px_32px_rgba(107,33,168,0.12)] hover:-translate-y-1 transition-[box-shadow,transform] duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-[#6B21A8]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#6B21A8]/15 transition-colors duration-300">
                <svg
                  className="w-7 h-7 text-[#6B21A8]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <h3 className="font-epilogue font-bold text-[#1a1a2e] text-lg mb-2">
                Interac e-Transfer
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-3">
                Send your e-Transfer to our church email. Quick, secure, and
                convenient.
              </p>
              <p className="font-epilogue text-[#6B21A8] text-sm">
                finance@kogchapel.ca
              </p>
            </div>

            {/* PayPal */}
            <div className="bg-[#FDF8EC] rounded-2xl p-8 shadow-[0_4px_20px_rgba(201,168,76,0.06)] border border-yellow-50 hover:shadow-[0_8px_32px_rgba(201,168,76,0.15)] hover:-translate-y-1 transition-[box-shadow,transform] duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-[#C9A84C]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#C9A84C]/15 transition-colors duration-300">
                <svg
                  className="w-7 h-7 text-[#C9A84C]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="font-epilogue font-bold text-[#1a1a2e] text-lg mb-2">
                PayPal
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Give online through PayPal — easy, secure, and available
                anywhere in the world.
              </p>
            </div>

            {/* Cheque */}
            <div className="bg-[#F9F7FF] rounded-2xl p-8 shadow-[0_4px_20px_rgba(107,33,168,0.06)] border border-purple-50 hover:shadow-[0_8px_32px_rgba(107,33,168,0.12)] hover:-translate-y-1 transition-[box-shadow,transform] duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-[#6B21A8]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#6B21A8]/15 transition-colors duration-300">
                <svg
                  className="w-7 h-7 text-[#6B21A8]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="font-epilogue font-bold text-[#1a1a2e] text-lg mb-2">
                Cheque
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Make your cheque payable to RCCG King of Glory Chapel and drop
                it at the church office.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="bg-[#0f0f1a] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <Image
                src="/kogc_logo.png"
                alt="RCCG King of Glory Chapel"
                width={160}
                height={56}
                className="h-14 w-auto object-contain mb-4"
              />
              <p className="text-white/60 text-sm leading-[1.7] max-w-xs mb-6">
                A Redeemed Christian Church of God family, bringing the kingdom
                of heaven to earth through worship, discipleship, and community.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/p/King-of-Glory-Chapel-100064316577251/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#6B21A8] transition-colors duration-200 group"
                >
                  <svg
                    className="w-4 h-4 text-white/70 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/kogchapel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#6B21A8] transition-colors duration-200 group"
                >
                  <svg
                    className="w-4 h-4 text-white/70 group-hover:text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="0.8"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@rccgkingofglorychapelcalga5619"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#6B21A8] transition-colors duration-200 group"
                >
                  <svg
                    className="w-4 h-4 text-white/70 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                    <polygon
                      fill="#0f0f1a"
                      points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <p className="font-epilogue font-bold text-white text-sm tracking-wider uppercase mb-4">
                Quick Links
              </p>
              <ul className="space-y-3">
                {[...navLinks, { label: "Give", href: "#give" }].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 text-sm hover:text-[#C9A84C] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="font-epilogue font-bold text-white text-sm tracking-wider uppercase mb-4">
                Contact
              </p>
              <ul className="space-y-4 text-sm text-white/60">
                <li>
                  <a
                    href="#location"
                    className="flex items-start gap-2 hover:text-[#C9A84C] transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4 mt-0.5 text-[#C9A84C] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>
                      3927 Edmonton Trl,
                      <br />
                      Calgary, AB T2E 6T1
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-4 h-4 mt-0.5 text-[#C9A84C] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>info@kogchapel.org</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col  items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} RCCG King of Glory Chapel. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
