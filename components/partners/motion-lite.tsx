"use client";

import { Fragment, forwardRef, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";

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

function createMotionComponent<T extends ElementType>(Component: T) {
  return forwardRef<unknown, ComponentPropsWithoutRef<T>>((props, ref) => (
    <Component {...stripMotionProps(props as Record<string, unknown>)} ref={ref} />
  ));
}

type MotionFactory = {
  <T extends ElementType>(component: T): ReturnType<typeof createMotionComponent<T>>;
  [key: string]: ReturnType<typeof createMotionComponent>;
};

const motion = new Proxy(
  ((component: ElementType) => createMotionComponent(component)) as MotionFactory,
  {
    get: (_target, property: string) => createMotionComponent(property as ElementType),
  },
);

export function AnimatePresence({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function MotionConfig({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>;
}

export { motion };
