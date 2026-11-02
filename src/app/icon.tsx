import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** Monogram favicon generated at build time; replaces the 500 KB animated GIF. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#121417",
          color: "#f6f2ea",
          fontSize: 320,
          fontFamily: "Georgia, serif",
          borderRadius: 96,
        }}
      >
        D
      </div>
    ),
    size,
  );
}
