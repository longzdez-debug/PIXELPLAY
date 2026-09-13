"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useState } from "react";

const BookingModal = dynamic(
  () => import("./BookingModal").then((mod) => mod.BookingModal),
  { ssr: false },
);

type Props = {
  className?: string;
  children: ReactNode;
};

export function BookingTrigger({ className, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      {open && <BookingModal open onClose={() => setOpen(false)} />}
    </>
  );
}
