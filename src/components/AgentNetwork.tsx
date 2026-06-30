"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { memo, useMemo, useRef } from "react";
import type { Group } from "three";
import { BufferAttribute, BufferGeometry, Color, Vector3 } from "three";

const nodeCount = 42;

function Network() {
  const group = useRef<Group>(null);
  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }, (_, i) => {
      const ring = i % 3;
      const angle = (i / nodeCount) * Math.PI * 2 * (ring + 1.2);
      const radius = 1.4 + ring * 0.55 + Math.sin(i * 1.7) * 0.18;
      return new Vector3(
        Math.cos(angle) * radius,
        Math.sin(i * 0.93) * 0.72,
        Math.sin(angle) * radius * 0.56,
      );
    });
  }, []);

  const lineGeometry = useMemo(() => {
    const positions: number[] = [];
    nodes.forEach((node, i) => {
      const next = nodes[(i + 5) % nodes.length];
      const near = nodes[(i + 13) % nodes.length];
      positions.push(node.x, node.y, node.z, next.x, next.y, next.z);
      if (i % 3 === 0) positions.push(node.x, node.y, node.z, near.x, near.y, near.z);
    });
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(new Float32Array(positions), 3));
    return geometry;
  }, [nodes]);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = t * 0.06 + pointer.x * 0.08;
    group.current.rotation.x = Math.sin(t * 0.18) * 0.08 - pointer.y * 0.04;
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={new Color("#66f0d8")} transparent opacity={0.22} />
      </lineSegments>
      {nodes.map((node, i) => (
        <mesh key={i} position={node} scale={i % 7 === 0 ? 1.35 : 1}>
          <sphereGeometry args={[0.024 + (i % 5) * 0.004, 14, 14]} />
          <meshBasicMaterial color={i % 7 === 0 ? "#f6c85f" : "#7bf7df"} transparent opacity={0.86} />
        </mesh>
      ))}
    </group>
  );
}

function AgentNetwork() {
  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas camera={{ position: [0, 0.2, 5.4], fov: 52 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
        <fog attach="fog" args={["#05070a", 5, 9]} />
        <Network />
      </Canvas>
    </div>
  );
}

export default memo(AgentNetwork);
