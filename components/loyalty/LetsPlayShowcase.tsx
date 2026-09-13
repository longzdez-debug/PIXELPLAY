"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const LetsPlayModal = dynamic(() => import("./LetsPlayModal").then((mod) => mod.LetsPlayModal), { ssr: false });

export function LetsPlayShowcase({ onOpen }: { onOpen?: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onOpen?.();
          setOpen(true);
        }}
        className="lets-play-float group relative flex w-full items-center justify-center whitespace-nowrap px-3 py-1.5 font-sans text-[17px] font-extrabold uppercase tracking-[0.12em] text-cyan-200 [text-shadow:0_0_8px_rgba(70,220,255,0.7),0_0_18px_rgba(70,220,255,0.35)] transition-all duration-300 hover:text-white hover:[text-shadow:0_0_14px_rgba(70,220,255,1),0_0_28px_rgba(70,220,255,0.7)] sm:w-auto sm:px-4 sm:text-xl sm:tracking-[0.2em]"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="LETS PLAY"
      >
        <span aria-hidden="true" className="relative z-10 flex flex-col items-center leading-none transition-colors duration-300">
          <span className="mb-0.5 whitespace-nowrap font-display text-[6px] font-bold uppercase tracking-[0.16em] text-white/55 sm:text-[7px] sm:tracking-[0.22em]">
            Программа лояльности
          </span>
          <span>
            {"LETS PLAY".split("").map((letter, index) => (
              <span key={`${letter}-${index}`} className="lets-play-letter inline-block" style={{ animationDelay: `${index * 0.08}s` }}>
                {letter === " " ? "\u00a0" : letter}
              </span>
            ))}
          </span>
        </span>
      </button>
      {open && <LetsPlayModal open onClose={() => setOpen(false)} />}
    </>
  );
}
