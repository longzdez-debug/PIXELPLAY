"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function DeferredHeroVideo() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;

    if (connection?.saveData || connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g") {
      return;
    }

    const device = navigator as Navigator & { deviceMemory?: number };
    const lowEndDevice =
      device.deviceMemory !== undefined &&
      device.deviceMemory <= 4 &&
      navigator.hardwareConcurrency !== undefined &&
      navigator.hardwareConcurrency <= 4;

    if (lowEndDevice) return;

    const start = () => setEnabled(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }

    const timeoutId = setTimeout(start, 2200);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <Image
        src="/club-play.jpg"
        alt=""
        fill
        priority
        quality={70}
        sizes="100vw"
        className="object-cover object-center"
      />
      {enabled && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        >
          <source src="/hero-desktop.mp4" type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(0,0,0,0.18)_48%,rgba(0,0,0,0.72)_100%)]" />
    </div>
  );
}
