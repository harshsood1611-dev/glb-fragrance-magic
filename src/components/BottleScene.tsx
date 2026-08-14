import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, Float, useProgress } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { useModel, useVariant } from "@/hooks/use-stage";
import { damp, stage, VARIANTS, type ModelOption } from "@/lib/stage";

function Bottle({ model }: { model: ModelOption }) {
  const gltf = useLoader(GLTFLoader, model.url);
  const group = useRef<THREE.Group>(null);
  const spin = useRef(0);


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
      if (!mesh.isMesh) return;
      const material = mesh.material as THREE.MeshStandardMaterial;
      if (!material || Array.isArray(mesh.material)) return;
      const name = (material.name ?? "").toLowerCase();
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
          color: new THREE.Color(VARIANTS[0]!.liquid),
        });
        mesh.userData["isLiquid"] = true;
      } else {
        material.envMapIntensity = 1.4;
      }
    });

    return clone;
  }, [gltf, model.scale]);

  const liquidMaterials = useMemo(() => {
    const found: THREE.MeshPhysicalMaterial[] = [];
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.userData?.["isLiquid"]) {
        found.push(mesh.material as THREE.MeshPhysicalMaterial);
      }
    });
    return found;
  }, [scene]);

  const targetColor = useMemo(() => new THREE.Color(VARIANTS[0]!.liquid), []);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 20);
    const node = group.current;
    if (!node) return;

    stage.dragOffset += stage.dragVelocity * delta;
    stage.dragVelocity *= Math.exp(-2.6 * delta);
    spin.current += delta * 0.16;

    const t = stage.target;
    node.position.x = damp(node.position.x, t.x + stage.pointer.x * 0.12, 3, delta);
    node.position.y = damp(node.position.y, t.y - stage.pointer.y * 0.08, 3, delta);
    node.rotation.y = damp(
      node.rotation.y,
      t.rotY + spin.current + stage.dragOffset,
      4,
      delta,
    );
    node.rotation.x = damp(node.rotation.x, t.rotX + stage.pointer.y * 0.05, 3, delta);
    const s = damp(node.scale.x, t.scale, 3, delta);
    node.scale.setScalar(s);

    targetColor.set(VARIANTS[stage.variantIndex]!.liquid);
    liquidMaterials.forEach((material) => {
      material.color.lerp(targetColor, 1 - Math.exp(-3 * delta));
    });
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.35}>
        <primitive object={scene} />
      </Float>
    </group>
  );
}

/** Scent-trail particles drifting upward from the bottle's neck. */
function ScentTrail({ color }: { color: string }) {
  const points = useRef<THREE.Points>(null);
  const count = 220;

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 1.6;
      positions[i * 3 + 1] = Math.random() * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1.6;
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
      if ((array[i * 3 + 1] ?? 0) > 4) array[i * 3 + 1] = -0.6;
    }
    attr.needsUpdate = true;
    node.position.x = stage.target.x;
    node.position.y = stage.target.y - 1.4;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={color}
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Loader() {
  const { progress, active } = useProgress();
  if (!active && progress >= 100) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-10 flex justify-center">
      <span className="font-mono text-[0.65rem] tracking-[0.4em] text-muted-foreground uppercase">
        Composing {Math.round(progress)}%
      </span>
    </div>
  );
}

export default function BottleScene() {
  const { variant } = useVariant();
  const { model } = useModel();

  return (
    <>
      <Canvas
        className="!pointer-events-none"
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 7], fov: 38 }}
      >
        <ambientLight intensity={0.45} />
        <spotLight position={[4, 6, 5]} angle={0.5} penumbra={1} intensity={45} />
        <spotLight
          position={[-5, -2, 3]}
          angle={0.6}
          penumbra={1}
          intensity={22}
          color={variant.glow}
        />
        <Suspense fallback={null}>
          <Environment preset="studio" environmentIntensity={0.85} />
          <Bottle key={model.id} model={model} />
          <ScentTrail color={variant.glow} />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}
