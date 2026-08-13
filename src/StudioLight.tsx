import React from "react";

/**
 * Simula un softbox de estudio: brillo calido difuso desde arriba mas un
 * ligero grading calido en toda la imagen, para una iluminacion mas
 * profesional y pareja (sin oscurecer bordes, sin vineta).
 */
export const StudioLight: React.FC = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          mixBlendMode: "soft-light",
          background:
            "radial-gradient(ellipse 100% 70% at 50% 0%, rgba(255,247,235,1) 0%, rgba(255,247,235,0.4) 45%, rgba(255,247,235,0) 78%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          mixBlendMode: "overlay",
          background:
            "linear-gradient(180deg, rgba(255,238,214,0.16) 0%, rgba(255,228,196,0.08) 50%, rgba(255,214,176,0.14) 100%)",
        }}
      />
    </>
  );
};
