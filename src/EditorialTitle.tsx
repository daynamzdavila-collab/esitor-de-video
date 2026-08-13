import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { renderEmphasis } from "./EmphasisText";
import { FONT_CURSIVE, FONT_FINE_MEDIUM } from "./fonts";

/**
 * Titular editorial de dos tonos: una palabra grande en cursiva (firma)
 * y una linea en letra fina con tracking amplio. Fuerte contraste via
 * stroke + sombra (no caja) para que se lea sobre cualquier fondo.
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
  accentColor?: string;
}> = ({
  cursive,
  fine,
  startDelay = 0,
  align = "center",
  cursiveSize = 176,
  fineSize = 46,
  cursiveColor = "#fbf1e6",
  fineColor = "#f3ddc7",
  accentColor = "#e0a75e",
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
          WebkitTextStroke: "2.6px rgba(35,22,13,0.7)",
          textShadow:
            "0 6px 10px rgba(20,12,7,0.75), 0 14px 40px rgba(20,12,7,0.6)",
          lineHeight: 1,
        }}
      >
        {renderEmphasis(cursive, accentColor)}
      </div>
      <div
        style={{
          fontFamily: FONT_FINE_MEDIUM,
          fontSize: fineSize,
          color: fineColor,
          opacity: fineOpacity,
          transform: `translateX(${fineX}px) translateY(-2px)`,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          marginLeft: align === "center" ? 0 : 6,
          WebkitTextStroke: "0.6px rgba(35,22,13,0.5)",
          textShadow: "0 3px 12px rgba(20,12,7,0.75)",
        }}
      >
        {renderEmphasis(fine, accentColor)}
      </div>
    </div>
  );
};
