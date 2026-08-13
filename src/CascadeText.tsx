import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { renderEmphasis } from "./EmphasisText";
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
  accentColor?: string;
}> = ({
  lines,
  startDelay = 0,
  staggerFrames = 6,
  align = "center",
  fontSize = 40,
  color = "#f3e3d3",
  weight = 500,
  letterSpacing = "0.06em",
  accentColor = "#e0a75e",
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
              WebkitTextStroke: "0.6px rgba(35,22,13,0.5)",
              textShadow:
                "0 4px 10px rgba(20,12,7,0.7), 0 8px 24px rgba(20,12,7,0.45)",
              lineHeight: 1.25,
              letterSpacing,
            }}
          >
            {renderEmphasis(line, accentColor)}
          </div>
        );
      })}
    </div>
  );
};
