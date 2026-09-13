"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Главная" },
  { href: "/clubs", label: "Клубы" },
  { href: "/games", label: "Игры" },
  { href: "/pricing", label: "Цены" },
  { href: "/promos", label: "Акции" },
  { href: "/services", label: "Услуги" },
  { href: "/specs", label: "Характеристики" },
  { href: "/tournaments", label: "Турниры" },
  { href: "/partners", label: "Партнёрам" },
];

const SOCIALS = [
  { label: "Telegram", href: "https://t.me/pixelplay", file: "telegram", filter: "none" },
  { label: "VK", href: "https://vk.com/pixelplay", file: "vk", filter: "none" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 16);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    firstMobileLinkRef.current?.focus();
  }, [mobileOpen]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-void/85 backdrop-blur-md py-3" : "bg-transparent py-5"}`}>
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" aria-label="Основная навигация">
          <Link href="/" className="shrink-0" aria-label="PIXEL PLAY — главная">
            <span className="font-display text-sm font-black tracking-[0.18em] text-white">PIXEL <span className="text-brand">PLAY</span></span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
          </div>

          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-white lg:hidden" aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"} onClick={() => setMobileOpen((value) => !value)}>
            <span aria-hidden="true" className="text-lg">{mobileOpen ? "×" : "☰"}</span>
          </button>
        </nav>

        {mobileOpen && (
          <div id="mobile-navigation" className="mx-4 mt-3 rounded-2xl border border-brand/20 bg-void/95 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:hidden">
            <div className="grid gap-2">
              {NAV_ITEMS.map((item, index) => (
                <NavLink key={item.href} item={item} pathname={pathname} onClick={() => setMobileOpen(false)} firstRef={index === 0 ? firstMobileLinkRef : undefined} mobile />
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex gap-2">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={`flex h-9 w-9 items-center justify-center transition-colors group ${s.hover ?? ""}`}>
                    <Image src={`/${s.file}.svg`} alt={s.label} width={20} height={20} style={{ filter: s.filter }} />
                  </a>
                ))}
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">PIXEL PLAY</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

function NavLink({ item, pathname, firstRef, onClick, mobile = false }: { item: { href: string; label: string }; pathname: string; firstRef?: React.RefObject<HTMLAnchorElement | null>; onClick?: () => void; mobile?: boolean }) {
  const active = isActive(pathname, item.href);
  const className = mobile
    ? `group relative flex min-h-12 items-center justify-center overflow-hidden rounded-xl border px-3 py-3 text-center transition-all ${active ? "border-brand/70 bg-brand/10 text-brand shadow-[0_0_20px_rgba(255,106,0,0.12)]" : "border-white/10 bg-white/[0.025] text-white/90 hover:border-brand/45 hover:bg-brand/5"}`
    : `group relative flex min-w-[80px] items-center justify-center overflow-hidden whitespace-nowrap rounded-md border px-2 py-1.5 text-[10px] uppercase tracking-[0.14em] ${active ? "border-brand/70 bg-gradient-to-b from-brand/40 to-brand/15 text-brand shadow-[0_0_16px_rgba(255,106,0,0.35)]" : "border-white/10 bg-gradient-to-b from-white/[0.09] via-white/[0.04] to-brand/[0.06] text-white/90 hover:border-brand/40 hover:from-brand/20 hover:to-brand/[0.08] hover:text-white hover:shadow-[0_0_14px_rgba(255,106,0,0.2)]"}`;
  return <Link ref={firstRef} href={item.href} onClick={onClick} className={className}>{mobile && <span className="relative z-10 block font-display text-xs font-black uppercase tracking-[0.18em] text-white/90 transition-all group-hover:text-brand">{item.label}</span>}{!mobile && item.label}</Link>;
}
