"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function AskOpenTracker() {
  useEffect(() => {
    track("ai_assistant_open", { surface: "page" });
  }, []);
  return null;
}
