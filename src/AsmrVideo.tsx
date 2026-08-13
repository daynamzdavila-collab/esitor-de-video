import React from "react";
import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { EditorialTitle } from "./EditorialTitle";
import { LowerThirdCaption } from "./LowerThirdCaption";
import { OutroCard } from "./OutroCard";
import { Sparkles } from "./Sparkles";
import { StudioLight } from "./StudioLight";

export const AsmrVideo: React.FC = () => {
  const frame = useCurrentFrame();

  const hookOpacity = interpolate(frame, [0, 15, 95, 110], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#241a12" }}>
      <AbsoluteFill>
        <OffthreadVideo
          src={staticFile("asmr_source.mp4")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      <StudioLight />
      <Sparkles opacity={0.85} />

      {/* Hook inicial, tipografia editorial (cursiva + letra fina) */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: hookOpacity,
        }}
      >
        <EditorialTitle cursive="mi caos" fine="ordenado" startDelay={4} />
      </div>

      <LowerThirdCaption
        cursiveWord="Antes"
        fineText="de que empiece la magia"
        enterAt={95}
        holdFrames={110}
        side="left"
      />
      <LowerThirdCaption
        cursiveWord="Su lugar"
        fineText="cada cosa, para tu pieza"
        enterAt={255}
        holdFrames={120}
        side="right"
      />
      <LowerThirdCaption
        cursiveWord="Mi mesa"
        fineText="asi es como trabajo"
        enterAt={400}
        holdFrames={120}
        side="left"
      />

      <OutroCard startAt={560} />
    </AbsoluteFill>
  );
};
