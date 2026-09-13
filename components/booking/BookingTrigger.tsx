"use client";

import { useState } from "react";
import { BookingModal } from "./BookingModal";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export function BookingTrigger({ className, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
