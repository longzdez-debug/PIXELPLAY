"use client";

import {
  Fragment,
  forwardRef,
  type ElementType,
  type ReactNode,
} from "react";

const MOTION_PROPS = new Set([
  "animate",
  "initial",
  "exit",
  "variants",
  "transition",
  "whileHover",
  "whileTap",
  "whileFocus",
  "whileInView",
  "viewport",
  "layout",
  "layoutId",
  "drag",
  "dragConstraints",
  "dragElastic",
  "onAnimationStart",
  "onAnimationComplete",
]);

function stripMotionProps(props: Record<string, unknown>) {
  const clean = { ...props };
  for (const prop of MOTION_PROPS) delete clean[prop];
  return clean;
}

// This is intentionally a tiny compatibility shim for the partners page.
// The real animation runtime is removed from the bundle; animation props are
// accepted and discarded while the underlying element renders normally.
function createMotionComponent(Component: ElementType) {
  const MotionComponent = forwardRef<any, any>((props, ref) => (
    <Component {...stripMotionProps(props)} ref={ref} />
  ));

  MotionComponent.displayName =
    typeof Component === "string" ? `Motion(${Component})` : "MotionComponent";

  return MotionComponent;
}

const motion = new Proxy(
  ((component: ElementType) => createMotionComponent(component)) as any,
  {
    get: (_target, property: string) => createMotionComponent(property as ElementType),
  },
);

export function AnimatePresence({
  children,
  mode,
}: {
  children: ReactNode;
  mode?: string;
}) {
  void mode;
  return <>{children}</>;
}

export function MotionConfig({
  children,
  reducedMotion,
  mode,
}: {
  children: ReactNode;
  reducedMotion?: string;
  mode?: string;
}) {
  void reducedMotion;
  void mode;
  return <Fragment>{children}</Fragment>;
}

export { motion };
