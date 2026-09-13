"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/ui/Logo";
import { SOCIAL_LINKS } from "@/lib/site-config";

const PartnersServices = dynamic(() => import("./PartnersServices"), { ssr: false });
const PartnersCases = dynamic(() => import("./PartnersCases"), { ssr: false });

const TABS = [
  { id: "partners", label: "Наши партнёры" },
  { id: "award", label: "Награда BGA" },
  { id: "services", label: "Услуги" },
  { id: "cases", label: "Кейсы" },
  { id: "contacts", label: "Контакты" },
] as const;

const MOBILE_NAV_ITEMS = [
  ["/services", "Услуги"], ["/promos", "Акции"], ["/tournaments", "Турниры"],
  ["/specs", "Железо"], ["/games", "Список игр"], ["/partners", "Партнёрам"], ["/pricing", "Цены"],
] as const;

const PARTNERS = [
  ["/partner1.png", "Белорусская Ассоциация Компьютерного спорта", "https://www.instagram.com/belarus_esports_association/"],
  ["/partner2.png", "Белорусская Федерация Киберспорта", "https://cybersport.by/"],
  ["/partner3.png", "Belarusian Esports League", "https://t.me/bel_cs2"],
  ["/partner4.png", "Ardor Gaming", "https://ardor-gaming.com/"],
  ["/partner5.png", "Kingstyle", "https://kingstyle.by/kresla/filter/manufacture-is-brave/"],
  ["/partner6.png", "Gorilla Game League", "https://cybergorilla.by"],
] as const;

const SOCIALS = [
  ["Instagram", SOCIAL_LINKS.instagram, "/instagram.svg"],
  ["TikTok", SOCIAL_LINKS.tiktok, "/tiktok.svg"],
  ["Telegram", SOCIAL_LINKS.telegram, "/telegram.svg"],
  ["YouTube", SOCIAL_LINKS.youtube, "/youtube.svg"],
] as const;

function SocialLinks() {
  return <div className="flex items-center gap-1 sm:gap-2">
    {SOCIALS.map(([label, href, icon]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className="group flex h-9 w-9 items-center justify-center sm:h-10 sm:w-10"><Image src={icon} alt="" width={20} height={20} className="h-5 w-5 object-contain invert opacity-70 transition-opacity group-hover:opacity-100" /></a>)}
  </div>;
}

export default function PartnersInteractive() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("partners");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const selectTab = (tab: (typeof TABS)[number]["id"]) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-brand/15 bg-void/85 backdrop-blur-md">
        <div className="relative flex h-20 items-center justify-between px-3 sm:px-4 md:px-8">
          <Logo priority size={100} href="/" className="h-auto w-[92px] shrink-0 sm:w-[120px]" />
          <nav aria-label="Разделы партнёрства" role="tablist" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 lg:flex">
            {TABS.map((tab) => <TabButton key={tab.id} tab={tab} active={activeTab === tab.id} onClick={() => selectTab(tab.id)} />)}
          </nav>
          <div className="flex h-full min-w-0 items-center gap-1.5 sm:gap-5">
            <SocialLinks />
            <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md border border-brand/30 lg:hidden" aria-label="Меню" aria-expanded={mobileMenuOpen} aria-controls="partners-mobile-navigation">
              <span className={`h-0.5 w-6 bg-brand transition-transform ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-6 bg-white transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-6 bg-brand transition-transform ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
        {mobileMenuOpen && <nav id="partners-mobile-navigation" aria-label="Мобильная навигация" className="border-x border-b border-brand/20 bg-[#090b10]/[0.98] px-4 py-5 shadow-[0_24px_60px_rgba(0,0,0,0.55)] lg:hidden"><div className="flex flex-col gap-2">{MOBILE_NAV_ITEMS.map(([href, label]) => <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)} className={`flex min-h-12 items-center justify-center rounded-xl border px-3 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] ${href === "/partners" ? "border-brand/70 bg-brand/10 text-brand" : "border-white/10 bg-white/[0.025] text-white/90"}`}>{label}</Link>)}</div></nav>}
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 md:px-8">
        <div aria-label="Разделы партнёрства" role="tablist" className="mb-8 grid grid-cols-2 gap-2 lg:hidden">
          {TABS.map((tab) => <TabButton key={tab.id} tab={tab} active={activeTab === tab.id} onClick={() => selectTab(tab.id)} compact />)}
        </div>

        {activeTab === "partners" && <section id="partner-panel-partners" role="tabpanel" className="page-reveal">
          <div className="mb-6 text-center"><h1 className="text-4xl font-bold text-white md:text-5xl">Наши <span className="text-brand">Партнёры</span></h1><p className="mx-auto mt-4 max-w-2xl text-base text-white/70">Мы сотрудничаем с ведущими компаниями и организациями в сфере киберспорта, технологий и развлечений.</p></div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {PARTNERS.map(([img, name, link]) => <article key={name} className="group flex flex-col items-center gap-3"><a href={link} target="_blank" rel="noopener noreferrer" className="relative flex h-56 w-full overflow-hidden rounded-xl border border-white/10 bg-black transition-colors group-hover:border-brand/40 sm:h-52"><Image src={img} alt={name} fill sizes="(max-width: 768px) 50vw, (max-width: 1280px) 16vw, 240px" className="object-contain transition-transform duration-500 group-hover:scale-105" /></a><span className="text-center text-sm font-semibold text-white/70 group-hover:text-white">{name}</span><span className="h-px w-8 bg-brand/30 transition-all group-hover:w-14 group-hover:bg-brand/70" /></article>)}
          </div>
        </section>}

        {activeTab === "award" && <section id="partner-panel-award" role="tabpanel" className="page-reveal"><div className="mx-auto max-w-4xl text-center"><h2 className="text-4xl font-bold text-white md:text-5xl">Награда <span className="text-brand">BGA</span></h2><p className="mx-auto mt-5 max-w-2xl leading-7 text-white/65">PIXEL развивает киберспортивное направление и сотрудничает с профильными организациями, создавая площадку для турниров, команд и партнёрских проектов.</p><div className="mt-10 rounded-2xl border border-brand/20 bg-brand/[0.06] p-8"><p className="text-sm uppercase tracking-[0.2em] text-brand">Киберспорт • Партнёрство • Развитие</p><p className="mt-4 text-white/70">Раздел подготовлен как отдельный информационный блок и не требует загрузки тяжёлых данных услуг или кейсов.</p></div></div></section>}

        {activeTab === "services" && <PartnersServices />}
        {activeTab === "cases" && <PartnersCases />}

        {activeTab === "contacts" && <section id="partner-panel-contacts" role="tabpanel" className="page-reveal"><div className="mb-8 text-center"><h2 className="text-4xl font-bold text-white md:text-5xl">Связаться с <span className="text-brand">нами</span></h2><p className="mx-auto mt-4 max-w-2xl text-white/60">Обсудим партнёрство, маркетинг, турниры и развитие компьютерного клуба.</p></div><div className="grid gap-4 md:grid-cols-3"><ContactCard title="Email" value="info@pixelplay.by" href="mailto:info@pixelplay.by" note="Ответим в течение рабочего дня" /><ContactCard title="Телефон" value="+375 29 319 30 15" href="tel:+375293193015" note="Ежедневно с 10:00 до 22:00" /><ContactCard title="Telegram" value="@pixelplay_mogilev" href={SOCIAL_LINKS.telegram} note="Самый быстрый способ связи" /></div><div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/15 bg-[#0d0d12]/90 p-6 md:flex-row md:px-8"><p className="text-sm text-white/50">Мы в соцсетях — новости, турниры и акции</p><SocialLinks /></div></section>}
      </main>

      {showModal && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={() => setShowModal(false)}><div role="dialog" aria-modal="true" aria-labelledby="partnership-modal-title" className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0f0f0f] p-6 md:p-8" onClick={(event) => event.stopPropagation()}><div className="flex items-start justify-between gap-4"><h3 id="partnership-modal-title" className="text-xl font-bold text-white">Оставьте заявку на <span className="text-brand">Партнёрство</span></h3><button type="button" onClick={() => setShowModal(false)} aria-label="Закрыть форму партнёрства" className="text-white/50 hover:text-white">✕</button></div><form className="mt-6 space-y-4" onSubmit={(event) => { event.preventDefault(); alert("Заявка отправлена!"); setShowModal(false); }}><input aria-label="Имя" required className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-white outline-none focus:border-brand/50" placeholder="Ваше имя" /><input aria-label="Компания" required className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-white outline-none focus:border-brand/50" placeholder="Компания / должность" /><input aria-label="Номер телефона" type="tel" required className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-white outline-none focus:border-brand/50" placeholder="+375 (__) ___-__-__" /><input aria-label="Email" type="email" required className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-white outline-none focus:border-brand/50" placeholder="email@example.com" /><p className="text-xs text-white/40">Отправляя форму, вы соглашаетесь с <Link href="/terms" className="text-brand underline">пользовательским соглашением</Link></p><button type="submit" className="w-full rounded-lg border-2 border-brand bg-brand/15 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white">Отправить заявку</button></form></div></div>}
    </div>
  );
}

function TabButton({ tab, active, onClick, compact = false }: { tab: (typeof TABS)[number]; active: boolean; onClick: () => void; compact?: boolean }) {
  return <button type="button" onClick={onClick} role="tab" aria-selected={active} aria-controls={`partner-panel-${tab.id}`} className={`relative overflow-hidden rounded-md border px-3 py-2 text-xs uppercase tracking-[0.12em] transition-colors ${compact ? "min-h-10 px-2 text-[10px] sm:px-4 sm:text-sm" : ""} ${active ? "border-brand/70 bg-brand/15 text-brand shadow-[0_0_16px_rgba(255,106,0,0.25)]" : "border-white/10 bg-white/[0.04] text-white/80 hover:border-brand/40 hover:text-white"}`}><span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />{tab.label}</button>;
}

function ContactCard({ title, value, href, note }: { title: string; value: string; href: string; note: string }) {
  return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="group rounded-2xl border border-white/15 bg-[#0d0d12]/90 p-6 transition-colors hover:border-brand/50"><p className="text-xs uppercase tracking-[0.2em] text-white/40">{title}</p><p className="mt-2 font-semibold text-white transition-colors group-hover:text-brand">{value}</p><p className="mt-3 text-xs text-white/35">{note}</p></a>;
}
