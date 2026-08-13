import { continueRender, delayRender } from "remotion";
import {
  FONT_CURSIVE_B64,
  FONT_FINE_B64,
  FONT_FINE_MEDIUM_B64,
} from "./fontData";

export const FONT_CURSIVE = "Alex Brush";
export const FONT_FINE = "Jost Light";
export const FONT_FINE_MEDIUM = "Jost Medium";

// Fuentes incrustadas en base64 (sin fetch de red: evita timeouts en render concurrente).
const fontsToLoad: [string, string][] = [
  [FONT_CURSIVE, FONT_CURSIVE_B64],
  [FONT_FINE, FONT_FINE_B64],
  [FONT_FINE_MEDIUM, FONT_FINE_MEDIUM_B64],
];

let started = false;

export const ensureFontsLoaded = () => {
  if (started) return;
  started = true;
  const handle = delayRender("Cargando tipografias locales (base64)");
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    continueRender(handle);
  };

  // Seguro: nunca bloquear el render mas de 3s, aunque la carga de fuentes falle.
  const safety = setTimeout(finish, 3000);

  Promise.all(
    fontsToLoad.map(([family, b64]) => {
      const face = new FontFace(
        family,
        `url(data:font/woff2;base64,${b64}) format("woff2")`,
      );
      return face.load().then((loaded) => {
        document.fonts.add(loaded);
      });
    }),
  )
    .then(() => {
      clearTimeout(safety);
      finish();
    })
    .catch((err) => {
      console.error("Error cargando fuentes locales", err);
      clearTimeout(safety);
      finish();
    });
};
