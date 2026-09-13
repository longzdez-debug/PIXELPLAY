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

    // Avoid starting the ~11.5 MB background video on low-end desktops.
    const device = navigator as Navigator & {
      deviceMemory?: number;
    };
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
    <>
      <Image
        src="/club-play.jpg"
        alt=""
        fill
        priority
        quality={70}
        sizes="100vw"
        className="fixed inset-0 -z-10 object-cover object-center"
        aria-hidden="true"
      />
      {enabled && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className="fixed inset-0 -z-10 h-full w-full object-cover opacity-70"
        >
          <source src="/hero-desktop.mp4" type="video/mp4" />
        </video>
      )}
    </>
  );
}
