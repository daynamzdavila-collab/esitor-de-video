import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CascadeText } from "./CascadeText";

/** Tarjeta final de cierre (CTA) que se desliza y oscurece el fondo para resaltar el texto. */
export const OutroCard: React.FC<{ startAt: number }> = ({ startAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startAt;
  if (local < 0) return null;

  const dim = spring({ frame: local, fps, config: { damping: 20 } });
  const bgOpacity = interpolate(dim, [0, 1], [0, 0.78]);

  const items = [
    "Un vistazo rápido a mi mesa",
    "de trabajo antes de que",
    "empiece la magia ✨",
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(circle at 50% 40%, rgba(40,28,14,${bgOpacity}) 0%, rgba(10,7,4,${bgOpacity}) 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 36,
      }}
    >
      <CascadeText
        lines={["EVANGELINE", "ACCESORIOS"]}
        startDelay={8}
        staggerFrames={8}
        fontSize={66}
        color="#f4d99b"
      />
      <div style={{ marginTop: 10 }}>
        <CascadeText
          lines={items}
          startDelay={26}
          staggerFrames={7}
          fontSize={34}
          color="#fff8ec"
          weight={600}
        />
      </div>
      <div style={{ marginTop: 18 }}>
        <CascadeText
          lines={["👉 Descubre más en el link de mi bio"]}
          startDelay={52}
          staggerFrames={0}
          fontSize={30}
          color="#d4af6a"
          weight={700}
        />
      </div>
    </div>
  );
};
