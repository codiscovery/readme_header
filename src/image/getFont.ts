import path from "path";
import pkg from "canvas";
import { fileURLToPath } from "url";
import fonts from "./fonts.js";

const { registerFont } = pkg;

const getFontName = (name: string = "") => {
  let fontName = "lato";
  if (name === "random") {
    const fontNames = Object.keys(fonts);
    const randomFontIndex = Math.floor(Math.random() * fontNames.length);
    fontName = fontNames[randomFontIndex];
  }
  if (fonts.hasOwnProperty(name)) {
    fontName = name;
  }
  return fontName;
};

const getFont = (name: string) => {
  const fontName = getFontName(name);
  const dirname = path.dirname(fileURLToPath(import.meta.url));

  const bodyFontLocation = path.join(
    dirname,
    "../..",
    `/public/fonts/${fontName}/${fonts[fontName][0]}.ttf`
  );
  const titleFontLocation = path.join(
    dirname,
    "../..",
    `/public/fonts/${fontName}/${fonts[fontName][1]}.ttf`
  );
  registerFont(bodyFontLocation, { family: "body" });
  registerFont(titleFontLocation, { family: "title" });

  //   console.log("-----image/getFont", titleFontLocation);
  //   console.log("-----image/getFont", bodyFontLocation);
};

export default getFont;
