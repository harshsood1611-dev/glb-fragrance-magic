import { useEffect, useSyncExternalStore } from "react";
import {
  getModelIndex,
  getSpinZ,
  subscribeSpinZ,
  getVariantIndex,
  lerp,
  stage,
  subscribeModel,
  subscribeVariant,
  VARIANTS,
} from "@/lib/stage";
import { MODELS } from "@/lib/models";

export function useVariant() {
  const index = useSyncExternalStore(
    (fn) => subscribeVariant(fn),
    getVariantIndex,
    () => 0,
  );
  return { index, variant: VARIANTS[index] ?? VARIANTS[0]! };
}

/**
 * Reads every [data-stage] section and interpolates the 3D model's target
 * position / scale / rotation from the viewport's position between them.
 * This is the scroll-scrubbed "product travels through the page" effect.
 */
export function useStageScroll() {
  useEffect(() => {
    let frame = 0;

    const read = (el: HTMLElement, key: string, fallback: number) => {
      const raw = el.dataset[key];
      const value = raw === undefined ? NaN : Number.parseFloat(raw);
      return Number.isFinite(value) ? value : fallback;
    };

    const update = () => {
      frame = 0;
      const anchors = Array.from(
        document.querySelectorAll<HTMLElement>("[data-stage]"),
      );
      if (anchors.length === 0) return;

      const focus = window.scrollY + window.innerHeight / 2;
      const centers = anchors.map((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top + window.scrollY + rect.height / 2;
      });

      let i = 0;
      while (i < centers.length - 1 && focus >= (centers[i + 1] ?? 0)) i += 1;
      const j = Math.min(i + 1, anchors.length - 1);
      const a = anchors[i]!;
      const b = anchors[j]!;
      const ca = centers[i] ?? 0;
      const cb = centers[j] ?? 0;
      const span = cb - ca;
      const t = span > 0 ? Math.min(1, Math.max(0, (focus - ca) / span)) : 0;
      const ease = t * t * (3 - 2 * t);

      stage.target = {
        x: lerp(read(a, "x", 0), read(b, "x", 0), ease),
        y: lerp(read(a, "y", 0), read(b, "y", 0), ease),
        scale: lerp(read(a, "scale", 1), read(b, "scale", 1), ease),
        rotY: lerp(read(a, "roty", 0), read(b, "roty", 0), ease),
        rotX: lerp(read(a, "rotx", 0), read(b, "rotx", 0), ease),
        rotZ: lerp(read(a, "rotz", 0), read(b, "rotz", 0), ease),
      };
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    const onPointer = (event: PointerEvent) => {
      stage.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      stage.pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onPointer, { passive: true });
    const settle = window.setTimeout(update, 600);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointer);
      window.clearTimeout(settle);
      window.clearTimeout(settle);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}

/** Inertia drag-to-rotate, armed only while the pointer starts on a [data-rotate-zone]. */
export function useDragRotate() {
  useEffect(() => {
    let active = false;
    let lastX = 0;
    let lastY = 0;

    const down = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest("[data-rotate-zone]")) return;
      active = true;
      lastX = event.clientX;
      lastY = event.clientY;
      document.body.classList.add("is-grabbing");
    };

    const move = (event: PointerEvent) => {
      if (!active) return;
      const delta = (event.clientX - lastX) / window.innerWidth;
      const deltaY = (event.clientY - lastY) / window.innerHeight;
      lastX = event.clientX;
      lastY = event.clientY;
      stage.dragVelocity += delta * 6;
      // Vertical drag tumbles the bottle around its Z axis.
      stage.dragVelocityZ += deltaY * 6;
    };

    const up = () => {
      active = false;
      document.body.classList.remove("is-grabbing");
    };

    window.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);

    return () => {
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, []);
}

/** Blur-in reveal for every [data-reveal] element. */
export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );

    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

/** Smooth momentum scrolling so every scrubbed animation feels weighted. */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let stop = false;
    let cleanup = () => {};

    void import("lenis").then(({ default: Lenis }) => {
      if (stop) return;
      const lenis = new Lenis({ duration: 1.1, wheelMultiplier: 0.9 });
      let raf = 0;
      const loop = (time: number) => {
        lenis.raf(time);
        raf = window.requestAnimationFrame(loop);
      };
      raf = window.requestAnimationFrame(loop);
      cleanup = () => {
        window.cancelAnimationFrame(raf);
        lenis.destroy();
      };
    });

    return () => {
      stop = true;
      cleanup();
    };
  }, []);
}

export function useModel() {
  const index = useSyncExternalStore(
    (fn) => subscribeModel(fn),
    getModelIndex,
    () => 0,
  );
  return { index, model: MODELS[index] ?? MODELS[0]! };
}

export function useSpinZ() {
  const on = useSyncExternalStore(
    (fn) => subscribeSpinZ(fn),
    getSpinZ,
    () => false,
  );
  return on;
}
