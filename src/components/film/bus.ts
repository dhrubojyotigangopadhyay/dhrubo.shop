import type { SceneApi } from "@/components/film/scene";

/**
 * The one WebGL scene lives in the root layout (SceneHost) and survives page
 * navigation. Pages reach it through this module: the homepage film drives it
 * with scroll, every other route parks it on that route's formation.
 */
export const filmBus: { scene: SceneApi | null; target: number; focus: number } = { scene: null, target: 0, focus: 0 };

export function setSceneProgress(f: number) {
  filmBus.target = f;
  filmBus.scene?.setProgress(f);
}

export function setSceneFocus(group: number) {
  filmBus.focus = group;
  filmBus.scene?.setFocus(group);
}

/** Which formation each route rests on, and how bright the field is behind its text. */
export function sceneForRoute(pathname: string): { chapter: number; gain: number } {
  if (pathname === "/about") return { chapter: 1, gain: 0.8 };
  if (pathname === "/services") return { chapter: 2, gain: 0.75 };
  if (pathname === "/projects") return { chapter: 3, gain: 1.5 };
  if (pathname.startsWith("/projects/")) return { chapter: 5, gain: 0.45 };
  if (pathname === "/writing") return { chapter: 4, gain: 0.5 };
  if (pathname.startsWith("/writing/")) return { chapter: 4, gain: 0.4 };
  if (pathname === "/resume") return { chapter: 5, gain: 0.5 };
  if (pathname === "/ask") return { chapter: 6, gain: 0.7 };
  if (pathname === "/contact") return { chapter: 7, gain: 0.9 };
  return { chapter: 0, gain: 0.9 };
}
