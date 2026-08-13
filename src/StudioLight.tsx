import React from "react";

/**
 * Simula un softbox de estudio: brillo calido difuso desde arriba,
 * en vez de una vineta que oscurece las esquinas.
 */
export const StudioLight: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        mixBlendMode: "soft-light",
        background:
          "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(255,244,230,0.9) 0%, rgba(255,244,230,0.25) 45%, rgba(255,244,230,0) 75%)",
      }}
    />
  );
};
