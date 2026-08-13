export type StageTarget = {
  x: number;
  y: number;
  scale: number;
  rotY: number;
  rotX: number;
};

export type Variant = {
  id: string;
  name: string;
  notes: string;
  price: number;
  liquid: string;
  accent: string;
  glow: string;
};

export const VARIANTS: Variant[] = [
  {
    id: "oud",
    name: "Oud Nocturne",
    notes: "Cambodian oud, saffron, smoked amber",
    price: 890,
    liquid: "#8a4a12",
    accent: "0.82 0.13 78",
    glow: "#e0a44a",
  },
  {
    id: "rose",
    name: "Rose Taif",
    notes: "Taif rose, lychee, white musk",
    price: 740,
    liquid: "#a52a4e",
    accent: "0.75 0.16 12",
    glow: "#e8759a",
  },
  {
    id: "musk",
    name: "Desert Musk",
    notes: "Green cardamom, vetiver, cashmeran",
    price: 660,
    liquid: "#1f6b52",
    accent: "0.78 0.11 165",
    glow: "#5fd0a6",
  },
];

/** Mutable render state read inside the r3f frame loop (never triggers React renders). */
export const stage = {
  target: { x: 0, y: 0, scale: 1, rotY: 0, rotX: 0 } as StageTarget,
  dragVelocity: 0,
  dragOffset: 0,
  pointer: { x: 0, y: 0 },
  variantIndex: 0,
};

const listeners = new Set<() => void>();

export function subscribeVariant(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function setVariant(index: number) {
  if (stage.variantIndex === index) return;
  stage.variantIndex = index;
  listeners.forEach((fn) => fn());
}

export function getVariantIndex() {
  return stage.variantIndex;
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const damp = (a: number, b: number, lambda: number, dt: number) =>
  lerp(a, b, 1 - Math.exp(-lambda * dt));
