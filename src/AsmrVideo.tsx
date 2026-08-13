import React from "react";
import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { CascadeText } from "./CascadeText";
import { LowerThirdCaption } from "./LowerThirdCaption";
import { OutroCard } from "./OutroCard";
import { ProgressBar } from "./ProgressBar";
import { Sparkles } from "./Sparkles";

export const AsmrVideo: React.FC = () => {
  const frame = useCurrentFrame();

  const hookOpacity = interpolate(frame, [0, 15, 95, 110], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const vignetteStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
    pointerEvents: "none",
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0a08" }}>
      <AbsoluteFill>
        <OffthreadVideo
          src={staticFile("asmr_source.mp4")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      <Sparkles opacity={0.9} />
      <div style={vignetteStyle} />

      {/* Hook inicial en cascada */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: hookOpacity,
        }}
      >
        <CascadeText
          lines={["POV:", "así se ve mi caos", "ordenado ✨"]}
          startDelay={4}
          staggerFrames={8}
          fontSize={46}
        />
      </div>

      <LowerThirdCaption
        text="Antes de que empiece la magia 🧡"
        enterAt={95}
        holdFrames={110}
      />
      <LowerThirdCaption
        text="Cada cosa en su lugar, para tu pieza"
        enterAt={255}
        holdFrames={120}
      />
      <LowerThirdCaption
        text="Así es mi mesa de trabajo ✋"
        enterAt={400}
        holdFrames={120}
      />

      <OutroCard startAt={560} />

      <ProgressBar />
    </AbsoluteFill>
  );
};
