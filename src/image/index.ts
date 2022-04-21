// @ts-ignore
import fs from "fs";
// @ts-ignore
import path from "path";
// @ts-ignore
import pkg from "canvas";
import { fileURLToPath } from "url";
const { registerFont, createCanvas, loadImage, Image } = pkg;
// const { createCanvas, loadImage } = require('canvas')

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(
  ctx: any,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fill: boolean,
  stroke: boolean
) {
  let radiusNum = null;
  let baseRadiusCorners = {};
  let radiusCorners = { tl: radius, tr: radius, br: radius, bl: radius };
  if (typeof stroke === "undefined") {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radiusNum = 5;
  }
  if (typeof radius === "number") {
    baseRadiusCorners = {
      tl: radiusNum,
      tr: radiusNum,
      br: radiusNum,
      bl: radiusNum,
    };
  } else {
    var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
    for (var side in defaultRadius) {
      // @ts-ignore
      radiusCorners[side] = baseRadiusCorners[side] || defaultRadius[side];
    }
  }

  // console.log("radiusCorners", radiusCorners);

  ctx.beginPath();
  ctx.moveTo(x + radiusCorners.tl, y);
  ctx.lineTo(x + width - radiusCorners.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radiusCorners.tr);
  ctx.lineTo(x + width, y + height - radiusCorners.br);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radiusCorners.br,
    y + height
  );
  ctx.lineTo(x + radiusCorners.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radiusCorners.bl);
  ctx.lineTo(x, y + radiusCorners.tl);
  ctx.quadraticCurveTo(x, y, x + radiusCorners.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}

const loadImageByUrl = (iconUrl: string): Promise<pkg.Image> =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      // ctx.drawImage(img, 0, 0);
      resolve(img as pkg.Image);
    };
    img.src = iconUrl;
  });

const generateImage = (params: any) => {
  return new Promise(async (resolve) => {
    const {
      title = "Sans titre",
      technologies = [],
      subtitleLine1 = "",
      subtitleLine2 = "",
      iconName = "",
      iconColor = [],
      titleColor = [],
      iconUrl = "",
      iconWidth = 150,
      iconOffsetTop = 0,
      iconOffsetBottom = 0,
      iconOffsetLeft = 0,
      iconOffsetRight = 0,
    }: {
      title?: string;
      technologies?: string[];
      subtitleLine1: string;
      subtitleLine2: string;
      iconName: string;
      iconColor: string[];
      titleColor: string[];
      iconUrl: string;
      iconWidth: number;
      iconOffsetTop: number;
      iconOffsetBottom: number;
      iconOffsetLeft: number;
      iconOffsetRight: number;
    } = params;

    const WIDTH = 2560;
    const HEIGHT = 1440;
    // const WIDTH = 640;
    // const HEIGHT = 360;

    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");
    const scale = 1;
    canvas.width = WIDTH * scale;
    canvas.height = HEIGHT * scale;
    ctx.scale(scale, scale);

    const iconCanvas = createCanvas(WIDTH, HEIGHT);
    const iconCtx = iconCanvas.getContext("2d");
    iconCanvas.width = WIDTH * scale;
    iconCanvas.height = HEIGHT * scale;
    iconCtx.scale(scale, scale);

    const stream = canvas.createPNGStream();
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    console.log("src/image dirname", dirname);
    const filename = path.join(dirname, "../..", `/public/images/test.png`);
    const out = fs.createWriteStream(filename);
    // const outIcon = fs.createWriteStream(iconCanvasFilename);

    // Background
    // ctx.save();
    ctx.fillStyle = "white";
    roundRect(ctx, 0, 0, WIDTH, HEIGHT, 50, true, false);
    // ctx.clip();
    // ctx.save();
    // ctx.restore();

    let iconSelectedColor: string[] = [];

    if (titleColor.length > 0) {
      if (iconColor.length === 0) {
        iconSelectedColor = titleColor;
      } else {
        iconSelectedColor = iconColor;
      }
    }

    // Load icon
    let iconY = 300;
    let iconH = 0;
    let icon: pkg.Image | null = null;
    if (iconName.length) {
      const iconFilename = path.join(
        dirname,
        "../..",
        `/public/icons/solid/${iconName}.svg`
        // `/public/images/test.png`
      );
      icon = await loadImage(iconFilename);
      // console.log("icon", icon.width);
      // console.log("icon", icon.height);
    }
    if (iconUrl.length) {
      icon = await loadImageByUrl(iconUrl);
      console.log("icon iconUrl", icon);
    }
    if (icon) {
      const iconW = iconWidth;

      iconH = (iconW / icon.width) * icon.height;
      const iconX = WIDTH * 0.5 - iconW * 0.5;
      iconY = 150;

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
        iconGradient.addColorStop(index * arr.length, color)
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

    const selectedFont = "Roboto";

    const titleFontLocation = path.join(
      dirname,
      "../..",
      "/public/fonts/Montserrat/Montserrat-Bold.ttf"
    );
    const bodyFontLocation = path.join(
      dirname,
      "../..",
      "/public/fonts/Montserrat/Montserrat-Regular.ttf"
    );
    registerFont(bodyFontLocation, { family: "Montserrat" });
    registerFont(titleFontLocation, { family: "Montserrat-Bold" });
    const robotoTitleFontLocation = path.join(
      dirname,
      "../..",
      "/public/fonts/Roboto/Roboto-Bold.ttf"
    );
    const robotoBodyFontLocation = path.join(
      dirname,
      "../..",
      "/public/fonts/Roboto/Roboto-Medium.ttf"
    );
    registerFont(robotoBodyFontLocation, { family: "Roboto" });
    registerFont(robotoTitleFontLocation, { family: "Roboto-Bold" });

    ctx.fillStyle = "black";
    // Technology
    const technoHeight = 70;
    let technoY = 0;
    if (technologies.length) {
      const technoPadding = 250;
      ctx.font = `${technoHeight}px ${selectedFont}-Bold`;
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
    const textHeight = 200;
    const titlePadding = 150;
    ctx.font = `${textHeight}px ${selectedFont}-Bold`;
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
      gradient.addColorStop(index * arr.length, color)
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
      const subtitleLine1Height = 40;
      const subtitleLine1Padding = 50;
      ctx.font = `${subtitleLine1Height}px ${selectedFont}`;
      const subtitleLine1Text = subtitleLine1;
      const subtitleLine1Dim = ctx.measureText(subtitleLine1Text);
      const subtitleLine1X = WIDTH * 0.5 - subtitleLine1Dim.width * 0.5;
      const subtitleLine1Y = titleY + textHeight + subtitleLine1Padding;
      ctx.fillText(subtitleLine1Text, subtitleLine1X, subtitleLine1Y);
      if (subtitleLine2.length) {
        const subtitleLine2Height = 40;
        const subtitleLine2Padding = 10;
        ctx.font = `${subtitleLine2Height}px ${selectedFont}`;
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
