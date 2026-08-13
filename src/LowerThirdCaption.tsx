import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_CURSIVE, FONT_FINE_MEDIUM } from "./fonts";

/**
 * Caption editorial de dos tonos (palabra cursiva + frase en letra fina)
 * que entra en cascada y se acomoda desplazada, sin caja ni borde,
 * solo un halo suave detras para legibilidad.
 */
export const LowerThirdCaption: React.FC<{
  cursiveWord: string;
  fineText: string;
  enterAt: number;
  holdFrames: number;
  side?: "left" | "right";
}> = ({ cursiveWord, fineText, enterAt, holdFrames, side = "left" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - enterAt;

  if (local < -5 || local > holdFrames + 20) return null;

  const enter = spring({
    frame: local,
    fps,
    config: { damping: 15, mass: 0.5, stiffness: 160 },
  });
  const exit = interpolate(local, [holdFrames, holdFrames + 18], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateX = interpolate(enter, [0, 1], [side === "left" ? -50 : 50, 0]);
  const opacity = Math.min(interpolate(enter, [0, 1], [0, 1]), exit);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 230,
        left: side === "left" ? 64 : undefined,
        right: side === "right" ? 64 : undefined,
        maxWidth: "78%",
        opacity,
        transform: `translateX(${translateX}px)`,
        textAlign: side,
        filter: "drop-shadow(0 8px 20px rgba(30,20,12,0.45))",
      }}
    >
      <div
        style={{
          fontFamily: FONT_CURSIVE,
          fontSize: 56,
          color: "#f3e3d3",
          transform: "rotate(-2deg)",
          lineHeight: 1,
        }}
      >
        {cursiveWord}
      </div>
      <div
        style={{
          fontFamily: FONT_FINE_MEDIUM,
          fontSize: 26,
          color: "#e8c9b4",
          letterSpacing: "0.08em",
          marginTop: 4,
        }}
      >
        {fineText}
      </div>
    </div>
  );
};
