"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { memo, useMemo, useRef } from "react";
import type { Group } from "three";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, Vector3 } from "three";

const nodeCount = 70;

function Network() {
  const group = useRef<Group>(null);
  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }, (_, i) => {
      const ring = i % 5;
      const angle = (i / nodeCount) * Math.PI * 2 * (ring + 1.15);
      const radius = 1.05 + ring * 0.38 + Math.sin(i * 1.7) * 0.16;
      return new Vector3(
        Math.cos(angle) * radius * 1.16,
        Math.sin(i * 0.93) * 0.86,
        Math.sin(angle) * radius * 0.7,
      );
    });
  }, []);

  const lineGeometry = useMemo(() => {
    const positions: number[] = [];
    nodes.forEach((node, i) => {
      const next = nodes[(i + 4) % nodes.length];
      const near = nodes[(i + 17) % nodes.length];
      positions.push(node.x, node.y, node.z, next.x, next.y, next.z);
      if (i % 2 === 0) positions.push(node.x, node.y, node.z, near.x, near.y, near.z);
    });
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(new Float32Array(positions), 3));
    return geometry;
  }, [nodes]);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = t * 0.08 + pointer.x * 0.16;
    group.current.rotation.x = Math.sin(t * 0.18) * 0.1 - pointer.y * 0.08;
    group.current.position.y = Math.sin(t * 0.5) * 0.05;
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={new Color("#66f0d8")} transparent opacity={0.3} blending={AdditiveBlending} />
      </lineSegments>
      {nodes.map((node, i) => (
        <mesh key={i} position={node} scale={i % 7 === 0 ? 1.35 : 1}>
          <sphereGeometry args={[0.024 + (i % 5) * 0.004, 14, 14]} />
          <meshBasicMaterial color={i % 11 === 0 ? "#ff8f5f" : i % 7 === 0 ? "#b7ff7a" : "#7bf7df"} transparent opacity={0.92} blending={AdditiveBlending} />
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
