import { continueRender, delayRender, staticFile } from "remotion";

export const FONT_CURSIVE = "Alex Brush";
export const FONT_FINE = "Jost Light";
export const FONT_FINE_MEDIUM = "Jost Medium";

const fontsToLoad: [string, string, string][] = [
  [FONT_CURSIVE, "AlexBrush.woff2", "400"],
  [FONT_FINE, "Jost-Light.woff2", "300"],
  [FONT_FINE_MEDIUM, "Jost-Medium.woff2", "500"],
];

let started = false;

export const ensureFontsLoaded = () => {
  if (started) return;
  started = true;
  const handle = delayRender("Cargando tipografias locales");

  Promise.all(
    fontsToLoad.map(([family, file, weight]) => {
      const face = new FontFace(family, `url(${staticFile(`fonts/${file}`)})`, {
        weight,
      });
      return face.load().then((loaded) => {
        document.fonts.add(loaded);
      });
    }),
  )
    .then(() => continueRender(handle))
    .catch((err) => {
      console.error("Error cargando fuentes locales", err);
      continueRender(handle);
    });
};
