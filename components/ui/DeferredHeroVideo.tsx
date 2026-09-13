import Image from "next/image";

export function DeferredHeroVideo() {
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
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(0,0,0,0.18)_48%,rgba(0,0,0,0.72)_100%)]" />
    </div>
  );
}
