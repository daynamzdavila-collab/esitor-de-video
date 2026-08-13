import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const pct = Math.min(1, frame / durationInFrames);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 8,
        background: "rgba(255,255,255,0.15)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct * 100}%`,
          background: "linear-gradient(90deg, #d4af6a, #f4d99b)",
        }}
      />
    </div>
  );
};
