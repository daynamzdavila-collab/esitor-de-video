import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_CURSIVE, FONT_FINE_MEDIUM } from "./fonts";

/**
 * Titular editorial de dos tonos: una palabra grande en cursiva (firma)
 * y una linea en letra fina con tracking amplio, superpuestas con un leve
 * giro para una composicion mas llamativa que un bloque de texto plano.
 */
export const EditorialTitle: React.FC<{
  cursive: string;
  fine: string;
  startDelay?: number;
  align?: "left" | "center";
  cursiveSize?: number;
  fineSize?: number;
  cursiveColor?: string;
  fineColor?: string;
}> = ({
  cursive,
  fine,
  startDelay = 0,
  align = "center",
  cursiveSize = 128,
  fineSize = 30,
  cursiveColor = "#f3e3d3",
  fineColor = "#e8c9b4",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cursiveSpring = spring({
    frame: frame - startDelay,
    fps,
    config: { damping: 13, mass: 0.7, stiffness: 120 },
  });
  const fineSpring = spring({
    frame: frame - startDelay - 10,
    fps,
    config: { damping: 15, mass: 0.5, stiffness: 150 },
  });

  const cursiveY = interpolate(cursiveSpring, [0, 1], [-40, 0]);
  const cursiveOpacity = interpolate(cursiveSpring, [0, 1], [0, 1]);
  const fineX = interpolate(fineSpring, [0, 1], [-24, 0]);
  const fineOpacity = interpolate(fineSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
      }}
    >
      <div
        style={{
          fontFamily: FONT_CURSIVE,
          fontSize: cursiveSize,
          color: cursiveColor,
          opacity: cursiveOpacity,
          transform: `translateY(${cursiveY}px) rotate(-4deg)`,
          textShadow: "0 6px 24px rgba(40,25,15,0.35)",
          lineHeight: 1,
        }}
      >
        {cursive}
      </div>
      <div
        style={{
          fontFamily: FONT_FINE_MEDIUM,
          fontSize: fineSize,
          color: fineColor,
          opacity: fineOpacity,
          transform: `translateX(${fineX}px) translateY(-10px)`,
          letterSpacing: "0.42em",
          textTransform: "uppercase",
          marginLeft: align === "center" ? 0 : 6,
        }}
      >
        {fine}
      </div>
    </div>
  );
};
