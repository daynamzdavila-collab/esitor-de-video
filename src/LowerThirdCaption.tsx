import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/** Caption tipo pill que entra en cascada desde abajo y se desvanece antes de salir. */
export const LowerThirdCaption: React.FC<{
  text: string;
  enterAt: number;
  holdFrames: number;
  accent?: string;
}> = ({ text, enterAt, holdFrames, accent = "#d4af6a" }) => {
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

  const translateY = interpolate(enter, [0, 1], [40, 0]);
  const opacity = Math.min(interpolate(enter, [0, 1], [0, 1]), exit);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 220,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          background: "rgba(20,16,12,0.72)",
          border: `2px solid ${accent}`,
          borderRadius: 999,
          padding: "18px 34px",
          maxWidth: "84%",
          backdropFilter: "blur(4px)",
        }}
      >
        <span
          style={{
            fontFamily: "Poppins, Arial, sans-serif",
            fontSize: 38,
            fontWeight: 700,
            color: "#fff8ec",
            textAlign: "center",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};
