import { ImageResponse } from "next/og";

// Preview image shown when the site is shared on WhatsApp, X, Telegram, etc.
export const alt = "Elite Ayomide — A crypto trader that makes you money";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse 60% 55% at 50% 0%, rgba(109,59,255,0.85), rgba(70,30,200,0.25) 55%, #000 80%)",
          backgroundColor: "#000",
          color: "#fff",
          padding: 80,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#F8A308",
            marginBottom: 28,
          }}
        >
          Elite Ayomide
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -3 }}>
          A crypto trader that makes you money.
        </div>
        <div style={{ fontSize: 30, color: "rgba(255,255,255,0.6)", marginTop: 32 }}>
          Mentorship · Consulting · Private trading
        </div>
      </div>
    ),
    size,
  );
}
