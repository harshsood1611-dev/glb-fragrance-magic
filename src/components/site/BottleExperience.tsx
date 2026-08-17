import { Environment, Float, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Rotate3D } from "lucide-react";
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import * as THREE from "three";

import perfumeBottle from "@/assets/perfume_bottle.glb.asset.json";
import waterBottle from "@/assets/water_bottle.glb.asset.json";
import { Button } from "@/components/ui/button";

const MODELS = [
  { label: "Perfume", url: perfumeBottle.url, scale: 2.6 },
  { label: "Bottle 02", url: waterBottle.url, scale: 3.0 },
] as const;

const damp = (current: number, target: number, lambda: number, delta: number) =>
  THREE.MathUtils.damp(current, target, lambda, delta);

/** Shared mutable stage — avoids React re-renders on every frame. */
const stage = {
  pointer: { x: 0, y: 0 },
  dragActive: false,
  dragOffsetY: 0,
  dragOffsetZ: 0,
  dragVelocityY: 0,
  dragVelocityZ: 0,
  scroll: 0,
  spinZ: false,
};

function Bottle({ model }: { model: (typeof MODELS)[number] }) {
  const gltf = useGLTF(model.url);
  const group = useRef<THREE.Group>(null);
  const spin = useRef(-0.45);
  const spinZ = useRef(0);

  const scene = useMemo(() => {
    const clone = gltf.scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const unit = model.scale / Math.max(size.x, size.y, size.z);
    clone.scale.setScalar(unit);
    clone.position.set(-center.x * unit, -center.y * unit, -center.z * unit);

    clone.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh || Array.isArray(mesh.material)) return;
      const material = mesh.material as THREE.MeshStandardMaterial;
      if (!material) return;
      const name = `${material.name ?? ""} ${mesh.name ?? ""}`.toLowerCase();
      if (name.includes("glass")) {
        mesh.material = new THREE.MeshPhysicalMaterial({
          transmission: 1,
          thickness: 1.1,
          roughness: 0.03,
          ior: 1.5,
          metalness: 0,
          clearcoat: 1,
          color: new THREE.Color("#ffffff"),
        });
      } else if (name.includes("liquid")) {
        mesh.material = new THREE.MeshPhysicalMaterial({
          transmission: 0.85,
          thickness: 2.2,
          roughness: 0.12,
          ior: 1.45,
          color: new THREE.Color("#7cf5a8"),
        });
      } else {
        material.envMapIntensity = 1.4;
      }
    });

    return clone;
  }, [gltf, model.scale]);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 20);
    const node = group.current;
    if (!node) return;

    stage.dragOffsetY += stage.dragVelocityY * delta;
    stage.dragVelocityY *= Math.exp(-2.6 * delta);
    stage.dragOffsetZ += stage.dragVelocityZ * delta;
    stage.dragVelocityZ *= Math.exp(-2.6 * delta);
    if (!stage.dragActive) spin.current += delta * 0.16;
    if (stage.spinZ) spinZ.current += delta * 0.7;

    node.position.x = damp(node.position.x, stage.pointer.x * 0.14, 3, delta);
    node.position.y = damp(
      node.position.y,
      -stage.pointer.y * 0.1 - stage.scroll * 0.9,
      3,
      delta,
    );
    node.rotation.y = damp(
      node.rotation.y,
      spin.current + stage.dragOffsetY,
      4,
      delta,
    );
    node.rotation.x = damp(node.rotation.x, 0.05 + stage.pointer.y * 0.06, 3, delta);
    node.rotation.z = damp(
      node.rotation.z,
      spinZ.current + stage.dragOffsetZ,
      4,
      delta,
    );
    const s = damp(node.scale.x, 1 - stage.scroll * 0.14, 3, delta);
    node.scale.setScalar(s);
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.35}>
        <primitive object={scene} />
      </Float>
    </group>
  );
}

/** Scent-trail particles drifting upward past the bottle. */
function ScentTrail() {
  const points = useRef<THREE.Points>(null);
  const count = 220;

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 1.8;
      positions[i * 3 + 1] = Math.random() * 4 - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1.8;
      seeds[i] = Math.random();
    }
    return { positions, seeds };
  }, []);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 20);
    const node = points.current;
    if (!node) return;
    const attr = node.geometry.getAttribute("position") as THREE.BufferAttribute;
    const array = attr.array as Float32Array;
    for (let i = 0; i < count; i += 1) {
      const seed = seeds[i] ?? 0;
      array[i * 3 + 1] = (array[i * 3 + 1] ?? 0) + delta * (0.18 + seed * 0.3);
      array[i * 3] =
        (array[i * 3] ?? 0) +
        Math.sin(state.clock.elapsedTime * 0.7 + seed * 12) * delta * 0.06;
      if ((array[i * 3 + 1] ?? 0) > 3) array[i * 3 + 1] = -1.4;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#7cf5a8"
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function BottleExperience() {
  const [modelIndex, setModelIndex] = useState(0);
  const [spinZ, setSpinZ] = useState(false);
  const model = MODELS[modelIndex] ?? MODELS[0];

  useEffect(() => {
    stage.spinZ = spinZ;
  }, [spinZ]);

  useEffect(() => {
    const onScroll = () => {
      stage.scroll = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    };
    const onPointer = (event: PointerEvent) => {
      stage.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      stage.pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  const last = useRef({ x: 0, y: 0 });

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    stage.dragActive = true;
    last.current = { x: event.clientX, y: event.clientY };
  };

  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!stage.dragActive) return;
    const deltaX = event.clientX - last.current.x;
    const deltaY = event.clientY - last.current.y;
    stage.dragOffsetY += deltaX * 0.008;
    stage.dragOffsetZ += deltaY * 0.006;
    stage.dragVelocityY = deltaX * 0.09;
    stage.dragVelocityZ = deltaY * 0.06;
    last.current = { x: event.clientX, y: event.clientY };
  };

  const stopDrag = () => {
    stage.dragActive = false;
  };

  return (
    <div className="absolute inset-y-16 right-0 z-20 w-full sm:w-[60%] lg:w-[54%]">
      <div
        className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing"
        aria-label="Interactive 3D bottle. Drag horizontally to rotate and vertically to tumble."
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
      >
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, 7], fov: 38 }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.45} />
          <spotLight position={[4, 6, 5]} angle={0.5} penumbra={1} intensity={45} />
          <spotLight
            position={[-5, -2, 3]}
            angle={0.6}
            penumbra={1}
            intensity={22}
            color="#7cf5a8"
          />
          <Suspense fallback={null}>
            <Environment preset="studio" environmentIntensity={0.85} />
            <Bottle key={model.url} model={model} />
            <ScentTrail />
          </Suspense>
        </Canvas>
      </div>

      <div className="glass-panel absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-full p-1">
        {MODELS.map((entry, i) => (
          <Button
            key={entry.label}
            type="button"
            size="sm"
            className="rounded-full"
            variant={modelIndex === i ? "default" : "ghost"}
            onClick={() => setModelIndex(i)}
            aria-pressed={modelIndex === i}
          >
            {entry.label}
          </Button>
        ))}
        <Button
          type="button"
          size="sm"
          className="rounded-full"
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
