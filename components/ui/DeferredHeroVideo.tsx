"use client";

import { useEffect, useState } from "react";

export function DeferredHeroVideo() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches) return;

    const timeoutId = window.setTimeout(() => setEnabled(true), 1200);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/club-play.jpg')" }}
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
