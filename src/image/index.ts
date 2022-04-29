// @ts-ignore
import fs from "fs";
// @ts-ignore
import path from "path";
// @ts-ignore
import pkg from "canvas";
import { fileURLToPath } from "url";
const { loadImage } = pkg;

import getCanvas from "./getCanvas.js";
import getFont from "./getFont.js";
import drawRoundRect from "./drawRoundRect.js";
import loadImageByUrl from "./loadImageByUrl.js";
import getRandomIcon from "./getRandomIcon.js";
import getRandomColor from "./getRandomIconColor.js";
import colors from "./colors.js";
import ImageConfig from "../types/ImageConfig.js";

const generateImage = (params: any): Promise<string> => {
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
      hash,
    }: ImageConfig = params;

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
    const publicDir = path.join(dirname, "../../public");
    const filename = path.join(publicDir, `/images/${hash}.png`);
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
    }
    if (iconUrl.length) {
      icon = await loadImageByUrl(iconUrl);
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

    ctx.fillStyle = gradient;

    ctx.fillText(title, titleX, titleY);

    ctx.fillStyle = "black";

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
      // console.log("The PNG file was created");
      resolve(filename);
    });
    // });
  });
};

export default generateImage;
