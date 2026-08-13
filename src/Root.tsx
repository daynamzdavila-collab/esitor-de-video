import { Composition } from "remotion";
import "./index.css";
import { AsmrVideo } from "./AsmrVideo";

const FPS = 30;
const DURATION_IN_FRAMES = 687; // ~22.9s, duracion del video original

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AsmrVideo"
        component={AsmrVideo}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
