import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FINE_MEDIUM } from "./fonts";

/**
 * Bloque de texto que entra linea por linea en cascada (efecto waterfall):
 * cada linea cae desde arriba con un pequeno retraso respecto a la anterior.
 */
export const CascadeText: React.FC<{
  lines: string[];
  startDelay?: number;
  staggerFrames?: number;
  align?: "left" | "center" | "right";
  fontSize?: number;
  color?: string;
  weight?: number;
  letterSpacing?: string;
}> = ({
  lines,
  startDelay = 0,
  staggerFrames = 6,
  align = "center",
  fontSize = 40,
  color = "#f3e3d3",
  weight = 500,
  letterSpacing = "0.06em",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems:
          align === "center" ? "center" : align === "left" ? "flex-start" : "flex-end",
        gap: 6,
      }}
    >
      {lines.map((line, i) => {
        const localFrame = frame - startDelay - i * staggerFrames;
        const drop = spring({
          frame: localFrame,
          fps,
          config: { damping: 14, mass: 0.6, stiffness: 140 },
        });
        const translateY = interpolate(drop, [0, 1], [-60, 0]);
        const opacity = interpolate(drop, [0, 1], [0, 1]);
        return (
          <div
            key={i}
            style={{
              fontFamily: FONT_FINE_MEDIUM,
              fontSize,
              fontWeight: weight,
              color,
              textAlign: align,
              opacity,
              transform: `translateY(${translateY}px)`,
              textShadow: "0 3px 14px rgba(40,25,15,0.4)",
              lineHeight: 1.25,
              letterSpacing,
            }}
          >
            {line}
          </div>
        );
      })}
    </div>
  );
};
