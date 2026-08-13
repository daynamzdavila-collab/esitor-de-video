import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CascadeText } from "./CascadeText";
import { EditorialTitle } from "./EditorialTitle";

/** Tarjeta final de cierre (CTA): scrim parejo color cafe (sin esquinas oscuras) para resaltar el texto. */
export const OutroCard: React.FC<{ startAt: number }> = ({ startAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startAt;
  if (local < 0) return null;

  const dim = spring({ frame: local, fps, config: { damping: 20 } });
  const scrimOpacity = interpolate(dim, [0, 1], [0, 0.62]);

  const items = [
    "Un vistazo rápido a mi mesa",
    "de trabajo antes de que",
    "empiece la magia",
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `rgba(48,34,24,${scrimOpacity})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
      }}
    >
      <EditorialTitle
        cursive="Evangeline"
        fine="Accesorios"
        startDelay={8}
        cursiveSize={104}
        fineSize={26}
      />
      <div style={{ marginTop: 4 }}>
        <CascadeText
          lines={items}
          startDelay={26}
          staggerFrames={7}
          fontSize={30}
          color="#f3e3d3"
          weight={300}
        />
      </div>
      <div style={{ marginTop: 14 }}>
        <CascadeText
          lines={["👉 Descubre más en el link de mi bio"]}
          startDelay={52}
          staggerFrames={0}
          fontSize={26}
          color="#c9a27e"
          weight={500}
        />
      </div>
    </div>
  );
};
