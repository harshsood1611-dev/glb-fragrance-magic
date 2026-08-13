import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const BottleScene = lazy(() => import("./BottleScene"));

/** Fixed full-screen 3D layer. Sits above the headline so the bottle occludes type. */
export function Stage3D() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20">
      <ClientOnly fallback={null}>
        <Suspense fallback={null}>
          <BottleScene />
        </Suspense>
      </ClientOnly>
    </div>
  );
}
