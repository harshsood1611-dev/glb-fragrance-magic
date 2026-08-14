import perfumeAsset from "@/assets/perfume_bottle.glb.asset.json";
import waterAsset from "@/assets/water_bottle.glb.asset.json";
import type { ModelOption } from "./stage";

export const MODELS: ModelOption[] = [
  { id: "perfume", label: "Perfume", url: perfumeAsset.url, scale: 2.6 },
  { id: "water", label: "Bottle 02", url: waterAsset.url, scale: 3 },
];
