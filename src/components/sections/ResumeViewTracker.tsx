"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function ResumeViewTracker() {
  useEffect(() => {
    track("resume_view");
  }, []);
  return null;
}
