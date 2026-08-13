import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

const SPARKLE_SPOTS = [
  { x: 8, y: 14, delay: 0, size: 30 },
  { x: 88, y: 10, delay: 12, size: 22 },
  { x: 14, y: 78, delay: 24, size: 26 },
  { x: 90, y: 70, delay: 8, size: 18 },
  { x: 80, y: 40, delay: 30, size: 20 },
  { x: 6, y: 45, delay: 18, size: 16 },
];

/** Destellos dorados decorativos que titilan sobre el video (estetica ASMR/joyeria). */
export const Sparkles: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => {
  const frame = useCurrentFrame();

  return (
    <>
      {SPARKLE_SPOTS.map((s, i) => {
        const cycle = (frame + s.delay) % 90;
        const twinkle = interpolate(
          cycle,
          [0, 20, 40, 90],
          [0, 1, 0, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${s.x}%`,
              top: `${s.y}%`,
              fontSize: s.size,
              opacity: twinkle * opacity,
              transform: `scale(${0.6 + twinkle * 0.6}) rotate(${frame * 0.6}deg)`,
              filter: "drop-shadow(0 0 6px rgba(233,201,180,0.75))",
            }}
          >
            ✨
          </div>
        );
      })}
    </>
  );
};
