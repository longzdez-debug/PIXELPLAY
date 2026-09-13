"use client";

import Image from "next/image";
import { useState } from "react";

const CASES = [
  { title: "Кибер-вызов от «Белтелеком» ко Дню Победы", image: "/case1-3.webp", text: "Киберспортивная активность для молодёжи в формате открытого мероприятия по War Thunder. Игровая механика, соревновательный интерес и памятная дата были объединены в одном городском событии." },
  { title: "Корпоративный турнир ОАО «Зенит» по Counter-Strike 2", image: "/case1-2.webp", text: "Корпоративный турнир в компьютерном клубе Pixel в Могилёве. Командные матчи, игровая площадка и полноценный соревновательный формат для сотрудников." },
  { title: "Первый кибертурнир по Counter-Strike 2 для сотрудников", image: "/case2.webp", text: "Командное соревнование для коллег в клубной атмосфере. Формат помог участникам взаимодействовать вне привычных рабочих задач и создать живое корпоративное событие." },
] as const;

export default function PartnersCases() {
  const [active, setActive] = useState(0);
  const item = CASES[active];

  return (
    <section id="partner-panel-cases" role="tabpanel" className="page-reveal">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-white md:text-5xl">Наши <span className="text-brand">кейсы</span></h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/65">Проекты, в которых киберспорт становится инструментом маркетинга, корпоративной культуры и вовлечения аудитории.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-[minmax(0,1.25fr)_minmax(280px,.75fr)]">
        <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-black">
          <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" priority={active === 0} />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-24">
            <h3 className="text-2xl font-bold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/65">{item.text}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {CASES.map((item, index) => (
            <button key={item.title} type="button" onClick={() => setActive(index)} className={`rounded-xl border p-4 text-left transition-colors ${active === index ? "border-brand/60 bg-brand/10" : "border-white/10 bg-white/[0.025] hover:border-brand/30"}`}>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand/70">Кейс 0{index + 1}</span>
              <span className="mt-2 block font-semibold text-white">{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
