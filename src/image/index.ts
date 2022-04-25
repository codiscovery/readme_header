// @ts-ignore
import fs from "fs";
// @ts-ignore
import path from "path";
// @ts-ignore
import pkg from "canvas";
import { fileURLToPath } from "url";
const { registerFont, loadImage } = pkg;

import getCanvas from "./getCanvas.js";
import getFont from "./getFont.js";
import drawRoundRect from "./drawRoundRect.js";
import loadImageByUrl from "./loadImageByUrl.js";
import getRandomIcon from "./getRandomIcon.js";
import getRandomColor from "./getRandomIconColor.js";
import colors from "./colors.js";

const generateImage = (params: any) => {
  return new Promise(async (resolve) => {
    const {
      title = "Sans titre",
      technologies = [],
      subtitleLine1 = "",
      subtitleLine2 = "",
      iconColor = [],
      iconUrl = "",
      iconWidth = 80,
      iconOffsetTop = 0,
      iconOffsetBottom = 0,
      iconOffsetLeft = 0,
      iconOffsetRight = 0,
      fontName = "",
    }: {
      title?: string;
      technologies?: string[];
      subtitleLine1: string;
      subtitleLine2: string;
      iconColor: string[];
      iconUrl: string;
      iconWidth: number;
      iconOffsetTop: number;
      iconOffsetBottom: number;
      iconOffsetLeft: number;
      iconOffsetRight: number;
      fontName: string;
    } = params;

    let {
      iconName = "",
      titleColor = [],
    }: { iconName: string; titleColor: string[] } = params;

    // const WIDTH = 2560;
    // const HEIGHT = 1440;
    // const WIDTH = 320;
    // const HEIGHT = 160;
    const WIDTH = 1280;
    const HEIGHT = 640;

    getFont(fontName);

    const { canvas, ctx } = getCanvas({
      width: WIDTH,
      height: HEIGHT,
    });

    const cnv = getCanvas({
      width: WIDTH,
      height: HEIGHT,
    });
    const iconCanvas = cnv.canvas;
    const iconCtx = cnv.ctx;

    const stream = canvas.createPNGStream();
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    // console.log("src/image dirname", dirname);
    const filename = path.join(dirname, "../..", `/public/images/test.png`);
    const out = fs.createWriteStream(filename);

    // Background
    ctx.fillStyle = "white";
    drawRoundRect(ctx, 0, 0, WIDTH, HEIGHT, 10, true, false);

    let iconSelectedColor: string[] = [];

    if (titleColor.length > 0) {
      if (titleColor[0] === "random") {
        titleColor = getRandomColor();
      }
      // if color name is in the named colors
      if (Object.keys(colors).includes(titleColor[0])) {
        titleColor = colors[titleColor[0]];
      }
      if (iconColor.length === 0) {
        iconSelectedColor = titleColor;
      } else {
        iconSelectedColor = iconColor;
      }
    }

    // Load icon
    let iconY = 40;
    let iconH = 0;
    let icon: pkg.Image | null = null;
    if (iconName.length) {
      if (iconName === "random") {
        iconName = await getRandomIcon();
      }
      const iconFilename = path.join(
        dirname,
        "../..",
        `/public/icons/solid/${iconName}.svg`
      );
      icon = await loadImage(iconFilename);
      // console.log("---iconFilename", iconFilename);
    }
    if (iconUrl.length) {
      icon = await loadImageByUrl(iconUrl);
      // console.log("icon iconUrl", icon);
    }
    if (icon) {
      const iconW = iconWidth;

      iconH = (iconW / icon.width) * icon.height;
      const iconX = WIDTH * 0.5 - iconW * 0.5;
      iconY = 40;

      const iconGradientW = iconW;
      const iconGradientH = iconH;
      const iconGradientX = iconX;
      const iconGradientY = iconY;

      const iconGradient = iconCtx.createLinearGradient(
        iconGradientX + iconOffsetLeft,
        iconGradientY,
        iconGradientX + iconGradientW - iconOffsetRight,
        iconGradientY
      );

      iconSelectedColor.forEach((color, index, arr) =>
        iconGradient.addColorStop((1 / arr.length) * index, color)
      );

      // iconCtx.fillStyle = "black";
      iconCtx.fillStyle = iconGradient;
      iconCtx.fillRect(
        iconGradientX,
        iconGradientY - iconOffsetTop,
        iconGradientW,
        iconGradientH
      );
      iconCtx.globalCompositeOperation = "destination-atop";

      iconCtx.drawImage(
        icon,
        iconGradientX,
        iconGradientY - iconOffsetTop,
        iconGradientW,
        iconGradientH
      );

      iconH -= iconOffsetBottom;

      ctx.drawImage(iconCanvas, 0, iconOffsetTop, WIDTH, HEIGHT);
    }

    // const titleFontLocation = path.join(
    //   dirname,
    //   "../..",
    //   "/public/fonts/Montserrat/Montserrat-Bold.ttf"
    // );
    // const bodyFontLocation = path.join(
    //   dirname,
    //   "../..",
    //   "/public/fonts/Montserrat/Montserrat-Regular.ttf"
    // );
    // registerFont(bodyFontLocation, { family: "Montserrat" });
    // registerFont(titleFontLocation, { family: "Montserrat-Bold" });
    // const robotoTitleFontLocation = path.join(
    //   dirname,
    //   "../..",
    //   "/public/fonts/roboto/Roboto-Bold.ttf"
    // );
    // const robotoBodyFontLocation = path.join(
    //   dirname,
    //   "../..",
    //   "/public/fonts/roboto/Roboto-Medium.ttf"
    // );
    // console.log("robotoBodyFontLocation", robotoBodyFontLocation);
    // registerFont(robotoBodyFontLocation, { family: "body" });
    // registerFont(robotoTitleFontLocation, { family: "title" });

    ctx.fillStyle = "black";
    // Technology
    const technoHeight = 36;
    let technoY = 0;
    if (technologies.length) {
      const technoPadding = 120;
      ctx.font = `${technoHeight}px title`;
      let technoText = technologies.map((t) => `●  ${t}  `).join("") + "●";
      if (technologies.length === 1) {
        technoText = technologies[0];
      }
      const technoDim = ctx.measureText(technoText);
      const technoX = WIDTH * 0.5 - technoDim.width * 0.5;
      technoY = iconY + iconH + technoPadding;

      ctx.fillText(technoText, technoX, technoY);
    }
    // Title
    const textHeight = 100;
    const titlePadding = 120;
    ctx.font = `${textHeight}px title`;
    // ctx.rotate(0.1);
    const titleDim = ctx.measureText(title);
    const titleY = technoY + technoHeight + titlePadding;
    const titleX = WIDTH * 0.5 - titleDim.width * 0.5;
    const gradientX = titleX;
    const gradientY = titleY;
    const gradientW = titleDim.width;
    const gradientH = textHeight;
    const gradient = ctx.createLinearGradient(
      gradientX,
      gradientY,
      gradientX + gradientW,
      gradientY
    );

    titleColor.forEach((color, index, arr) =>
      gradient.addColorStop((1 / arr.length) * index, color)
    );
    // gradient.addColorStop(1, "green");

    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    // ctx.fillRect(gradientX, gradientY, gradientW, gradientH);

    ctx.fillText(title, titleX, titleY);

    ctx.fillStyle = "black";

    // http://localhost:3003/api/actions/generate-image?title=Turbo%20Secure%20Storage&technologies=React+Native&subtitleLine1=Turbo%20Module%20for%20securely%20storing%20data&subtitleLine2=via%20iOS%20Keychain%20and%20Android%20Keystore
    // Subtitle
    if (subtitleLine1.length) {
      const subtitleLine1Height = 20;
      const subtitleLine1Padding = 24;
      ctx.font = `${subtitleLine1Height}px body`;
      const subtitleLine1Text = subtitleLine1;
      const subtitleLine1Dim = ctx.measureText(subtitleLine1Text);
      const subtitleLine1X = WIDTH * 0.5 - subtitleLine1Dim.width * 0.5;
      const subtitleLine1Y = titleY + textHeight + subtitleLine1Padding;
      ctx.fillText(subtitleLine1Text, subtitleLine1X, subtitleLine1Y);
      if (subtitleLine2.length) {
        const subtitleLine2Height = 20;
        const subtitleLine2Padding = 8;
        ctx.font = `${subtitleLine2Height}px body`;
        const subtitleLine2Text = subtitleLine2;
        const subtitleLine2Dim = ctx.measureText(subtitleLine2Text);
        const subtitleLine2X = WIDTH * 0.5 - subtitleLine2Dim.width * 0.5;
        const subtitleLine2Y =
          subtitleLine1Y + subtitleLine2Height + subtitleLine2Padding;
        ctx.fillText(subtitleLine2Text, subtitleLine2X, subtitleLine2Y);
      }
    }

    stream.pipe(out);

    out.on("finish", () => {
      console.log("The PNG file was created");
      resolve(filename);
    });
    // });
  });
};

export default generateImage;

/**
 * bg-gradient-to-tl from-pink-500 via-red-500 to-yellow-500
 */
