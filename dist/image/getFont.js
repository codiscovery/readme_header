import path from "path";
import pkg from "canvas";
import { fileURLToPath } from "url";
import fonts from "./fonts.js";
var registerFont = pkg.registerFont;
var getFontName = function (name) {
    if (name === void 0) { name = ""; }
    var fontName = "lato";
    if (name.length === 0 || name === "random") {
        var fontNames = Object.keys(fonts);
        var randomFontIndex = Math.floor(Math.random() * fontNames.length);
        fontName = fontNames[randomFontIndex];
    }
    if (fonts.hasOwnProperty(name)) {
        fontName = name;
    }
    return fontName;
};
var getFont = function (name) {
    var fontName = getFontName(name);
    console.log("!!!!!!!! image/getFont fontName", fontName);
    var dirname = path.dirname(fileURLToPath(import.meta.url));
    var bodyFontLocation = path.join(dirname, "../..", "/public/fonts/".concat(fontName, "/").concat(fonts[fontName][0], ".ttf"));
    var titleFontLocation = path.join(dirname, "../..", "/public/fonts/".concat(fontName, "/").concat(fonts[fontName][1], ".ttf"));
    registerFont(bodyFontLocation, { family: "body" });
    registerFont(titleFontLocation, { family: "title" });
    //   console.log("-----image/getFont", titleFontLocation);
    //   console.log("-----image/getFont", bodyFontLocation);
};
export default getFont;
