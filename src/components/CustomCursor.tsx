"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (event: PointerEvent) => setPos({ x: event.clientX, y: event.clientY });
    const over = (event: PointerEvent) => setActive(Boolean((event.target as HTMLElement).closest("a, button, [data-cursor='card']")));
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  return <div className={`cursor ${active ? "cursor-active" : ""}`} style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }} />;
}
