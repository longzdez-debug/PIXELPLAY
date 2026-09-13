"use client";

import { useEffect, useState } from "react";

export function DeferredHeroVideo() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches) return;

    const enable = () => setEnabled(true);
    const idle = "requestIdleCallback" in window
      ? window.requestIdleCallback(enable, { timeout: 1800 })
      : window.setTimeout(enable, 1200);

    return () => {
      if (typeof idle === "number") window.clearTimeout(idle);
      else window.cancelIdleCallback(idle);
    };
  }, []);

  if (!enabled) return null;

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster="/club-play.jpg"
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full object-cover opacity-70"
    >
      <source src="/hero-desktop.mp4" type="video/mp4" />
    </video>
  );
}
