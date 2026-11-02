"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Emits a single project_view (and case_study_view for released work) per page load. */
export function ProjectViewTracker({ slug, status }: { slug: string; status: string }) {
  useEffect(() => {
    track("project_view", { project: slug, status });
    if (status === "production" || status === "live") track("case_study_view", { project: slug });
  }, [slug, status]);
  return null;
}
