import Link from "next/link";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { DeferredHeroVideo } from "@/components/ui/DeferredHeroVideo";
import { CLUBS, SITE_STATS, clubStatusLabel, getLowestClubPrice, getMaxRefreshRate, totalNetworkPcCount, totalPcCount } from "@/lib/site-data";

export default function HomePage() {
  const maxRefreshRate = getMaxRefreshRate(CLUBS);

  return (
    <main className="relative overflow-hidden">
      <DeferredHeroVideo />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-void/30 via-void/25 to-void" aria-hidden="true" />

      <section className="home-hero mx-auto flex max-w-5xl flex-col items-center px-4 pb-20 pt-16 text-center sm:px-6 md:pt-24 page-reveal">
        <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-brand sm:mb-6 sm:text-xs sm:tracking-[0.4em] page-reveal-delay-1">
          Сеть компьютерных клубов PIXEL
        </p>

        <h1 className="max-w-[15ch] font-display text-[28px] font-black leading-[1.1] text-white sm:max-w-none sm:text-5xl sm:leading-tight md:text-7xl page-reveal-delay-1">
          ИГРАЙ НА
          <br />
          <span className="text-gradient-brand" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", filter: "drop-shadow(0 0 12px rgba(255,106,0,0.6))" }}>
            МАКСИМУМЕ
          </span>
        </h1>

        <p className="mt-7 max-w-xl text-xs leading-relaxed text-white/60 sm:mt-8 sm:text-base page-reveal-delay-2">
          Атмосферные киберпространства в Могилеве. Игровые ПК разных конфигураций, мониторы до {maxRefreshRate} Hz,
          программа лояльности LETS PLAY с кешбэком до 25% и живые турниры.
        </p>

        <div className="mt-7 mb-5 flex w-full max-w-[26rem] flex-col gap-2.5 md:hidden page-reveal-delay-3">
          <BookingTrigger className="cyber-button w-full py-4 text-sm shadow-[0_0_26px_rgba(255,106,0,0.35)]">
            ЗАБРОНИРОВАТЬ
          </BookingTrigger>
        </div>

        <div className="home-club-grid mx-auto grid w-full max-w-5xl gap-4 md:grid-cols-3 page-reveal-delay-3">
          {CLUBS.map((club) => (
            <div key={club.slug} className="cyber-panel flex flex-col p-3.5 text-left sm:p-5 transition-transform duration-300 hover:-translate-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-bold uppercase tracking-widest text-white">
                  {club.name}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-emerald-400" />
                  {clubStatusLabel(club.status)}
                </span>
              </div>
              <p className="mt-1 text-xs text-white/35">{club.address}</p>
              <p className="mt-3 font-display text-lg font-bold text-brand sm:text-2xl">
                от {getLowestClubPrice(club)} <span className="text-sm font-medium text-white/50">BYN/час</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="border border-white/10 px-2 py-1 text-[10px] uppercase tracking-wider text-white/60">
                  {totalPcCount(club)} ПК
                </span>
                {club.features.map((feature) => (
                  <span key={feature} className="border border-white/10 px-2 py-1 text-[10px] uppercase tracking-wider text-white/60">
                    {feature}
                  </span>
                ))}
              </div>
              <Link
                href="/clubs"
                className="mt-4 inline-block border-t border-white/5 pt-3 text-xs font-semibold uppercase tracking-[0.15em] text-brand transition-colors hover:text-brand-light"
              >
                Подробнее о клубе →
              </Link>
              <a
                href={club.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-brand"
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" className="text-red-500" />
                  <circle cx="12" cy="10" r="3" className="text-red-500" fill="currentColor" />
                </svg>
                Проложить маршрут
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 hidden w-full max-w-[26rem] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center md:flex page-reveal-delay-3">
          <BookingTrigger className="cyber-button w-full sm:w-auto">
            ЗАБРОНИРОВАТЬ
          </BookingTrigger>
          <Link
            href="/clubs"
            className="inline-flex w-full items-center justify-center rounded-md border-2 border-brand bg-brand/15 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_16px_rgba(255,106,0,0.25)] transition-all hover:border-brand hover:bg-brand hover:text-white hover:shadow-[0_0_28px_rgba(255,106,0,0.5)] sm:w-auto"
          >
            Выбрать клуб
          </Link>
        </div>

        <div className="mt-4 flex justify-center page-reveal-delay-4">
          <Link
            href="/rules"
            className="inline-block rounded-md border border-white/15 bg-white/[0.03] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white/60 transition-all hover:border-brand/40 hover:text-white"
          >
            Правила
          </Link>
        </div>

        <div className="home-stats mx-auto mt-10 grid w-full max-w-5xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 page-reveal-delay-4">
          {[
            { value: `${totalNetworkPcCount(CLUBS)}+`, label: "игровых ПК" },
            { value: `${maxRefreshRate}Hz`, label: "мониторы в VIP" },
            { value: SITE_STATS.cashbackLegend, label: "кешбэк Legend" },
            { value: SITE_STATS.networkHours, label: "ОТКРЫТЫ" },
          ].map((stat) => (
            <div key={stat.label} className="border-l-2 border-brand/40 py-2 pl-3 text-center sm:pl-4">
              <p className="font-display text-2xl font-bold text-white sm:text-3xl">{stat.value}</p>
              <p className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
