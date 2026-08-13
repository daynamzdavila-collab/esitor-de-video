import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { renderEmphasis } from "./EmphasisText";
import { FONT_CURSIVE, FONT_FINE_MEDIUM } from "./fonts";

/**
 * Caption editorial de dos tonos (palabra cursiva + frase en letra fina)
 * que entra en cascada. Contraste via stroke + sombra (sin caja ni borde).
 * Las palabras entre *asteriscos* salen resaltadas en color de acento.
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
        bottom: 220,
        left: side === "left" ? 56 : undefined,
        right: side === "right" ? 56 : undefined,
        maxWidth: "82%",
        opacity,
        transform: `translateX(${translateX}px)`,
        textAlign: side,
      }}
    >
      <div
        style={{
          fontFamily: FONT_CURSIVE,
          fontSize: 66,
          color: "#fbf1e6",
          transform: "rotate(-2deg)",
          lineHeight: 1,
          WebkitTextStroke: "1.6px rgba(35,22,13,0.6)",
          textShadow:
            "0 5px 10px rgba(20,12,7,0.7), 0 12px 30px rgba(20,12,7,0.5)",
        }}
      >
        {renderEmphasis(cursiveWord, "#e0a75e")}
      </div>
      <div
        style={{
          fontFamily: FONT_FINE_MEDIUM,
          fontSize: 32,
          color: "#f3ddc7",
          letterSpacing: "0.05em",
          marginTop: 6,
          WebkitTextStroke: "0.5px rgba(35,22,13,0.45)",
          textShadow: "0 3px 12px rgba(20,12,7,0.75)",
        }}
      >
        {renderEmphasis(fineText, "#e0a75e")}
      </div>
    </div>
  );
};
