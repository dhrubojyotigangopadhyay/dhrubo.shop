import { ImageResponse } from "next/og";

/**
 * Shared Open Graph renderer. Pure JSX for Satori: flexbox only, system
 * fonts (no network fetch at request time), 1200x630.
 */
export function renderOg({ title, kicker, footer }: { title: string; kicker: string; footer: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#f6f2ea",
          color: "#121417",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "ui-monospace, Menlo, monospace", fontSize: 24, letterSpacing: 2, textTransform: "uppercase", color: "#5c6168" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#e5571b" }} />
          {kicker}
        </div>
        <div style={{ display: "flex", fontSize: title.length > 60 ? 56 : 72, lineHeight: 1.05, letterSpacing: -1.5, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 26, color: "#2b2f36" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontWeight: 700 }}>Dhrubojyoti Gangopadhyay</div>
            <div style={{ color: "#5c6168" }}>Forward Deployed & Applied AI Engineer · Kolkata, India</div>
          </div>
          <div style={{ color: "#5c6168" }}>{footer}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
