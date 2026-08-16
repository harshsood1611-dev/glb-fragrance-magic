import { Bounds, Center, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Rotate3D } from "lucide-react";
import {
  Suspense,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { Group } from "three";
import * as THREE from "three";

import perfumeBottle from "@/assets/perfume_bottle.glb.asset.json";
import waterBottle from "@/assets/water_bottle.glb.asset.json";
import { Button } from "@/components/ui/button";

const MODELS = [
  { label: "Perfume", url: perfumeBottle.url },
  { label: "Bottle 02", url: waterBottle.url },
] as const;

type DragState = {
  active: boolean;
  lastX: number;
  lastY: number;
  targetY: number;
  targetZ: number;
};

function BottleModel({
  url,
  spinZ,
  drag,
}: {
  url: string;
  spinZ: boolean;
  drag: React.MutableRefObject<DragState>;
}) {
  const model = useGLTF(url);
  const scene = useMemo(() => model.scene.clone(true), [model.scene]);
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    const bottle = group.current;
    if (!bottle) return;

    bottle.rotation.y = THREE.MathUtils.damp(
      bottle.rotation.y,
      drag.current.targetY,
      5,
      delta,
    );
    bottle.rotation.z = THREE.MathUtils.damp(
      bottle.rotation.z,
      drag.current.targetZ,
      5,
      delta,
    );

    if (!drag.current.active) {
      drag.current.targetY += delta * 0.22;
      if (spinZ) drag.current.targetZ += delta * 0.42;
    }
  });

  return (
    <Bounds fit clip observe margin={1.22}>
      <Center>
        <group ref={group} rotation={[0.05, -0.45, 0]}>
          <primitive object={scene} />
        </group>
      </Center>
    </Bounds>
  );
}

export function BottleExperience() {
  const [modelUrl, setModelUrl] = useState(MODELS[0].url);
  const [spinZ, setSpinZ] = useState(false);
  const drag = useRef<DragState>({
    active: false,
    lastX: 0,
    lastY: 0,
    targetY: -0.45,
    targetZ: 0,
  });

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current.active = true;
    drag.current.lastX = event.clientX;
    drag.current.lastY = event.clientY;
    document.body.classList.add("is-grabbing");
  };

  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const deltaX = event.clientX - drag.current.lastX;
    const deltaY = event.clientY - drag.current.lastY;
    drag.current.targetY += deltaX * 0.012;
    drag.current.targetZ += deltaY * 0.01;
    drag.current.lastX = event.clientX;
    drag.current.lastY = event.clientY;
  };

  const stopDrag = () => {
    drag.current.active = false;
    document.body.classList.remove("is-grabbing");
  };

  return (
    <div className="absolute inset-y-24 right-0 z-20 w-full sm:w-[58%] lg:w-[52%]">
      <div
        className="absolute inset-0 cursor-grab touch-none"
        aria-label="Interactive 3D bottle. Drag horizontally to rotate and vertically to tilt."
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
      >
        <Canvas
          dpr={[1, 1.7]}
          camera={{ position: [0, 0, 5], fov: 34 }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={1.8} />
          <directionalLight position={[4, 6, 5]} intensity={4.5} />
          <directionalLight position={[-5, 1, 3]} intensity={2.5} />
          <pointLight position={[0, -3, 4]} intensity={2.8} />
          <Suspense fallback={null}>
            <BottleModel
              key={modelUrl}
              url={modelUrl}
              spinZ={spinZ}
              drag={drag}
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="glass-panel absolute right-4 bottom-1 z-30 flex items-center gap-1 rounded-md p-1 sm:right-8 sm:bottom-4">
        {MODELS.map((model) => (
          <Button
            key={model.label}
            type="button"
            size="sm"
            variant={modelUrl === model.url ? "default" : "ghost"}
            onClick={() => setModelUrl(model.url)}
            aria-pressed={modelUrl === model.url}
          >
            {model.label}
          </Button>
        ))}
        <Button
          type="button"
          size="sm"
          variant={spinZ ? "secondary" : "ghost"}
          onClick={() => setSpinZ((active) => !active)}
          aria-pressed={spinZ}
          title="Toggle Z-axis rotation"
        >
          <Rotate3D />
          Z spin
        </Button>
      </div>
    </div>
  );
}

useGLTF.preload(perfumeBottle.url);
useGLTF.preload(waterBottle.url);