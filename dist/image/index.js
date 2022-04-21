var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// @ts-ignore
import fs from "fs";
// @ts-ignore
import path from "path";
// @ts-ignore
import pkg from "canvas";
import { fileURLToPath } from "url";
var registerFont = pkg.registerFont, createCanvas = pkg.createCanvas, loadImage = pkg.loadImage;
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
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    var radiusNum = null;
    var baseRadiusCorners = {};
    var radiusCorners = { tl: radius, tr: radius, br: radius, bl: radius };
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
    }
    else {
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
    ctx.quadraticCurveTo(x + width, y + height, x + width - radiusCorners.br, y + height);
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
var generateImage = function (params) {
    return new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, title, _b, technologies, _c, subtitleLine1, _d, subtitleLine2, _e, iconName, _f, iconColor, _g, titleColor, WIDTH, HEIGHT, canvas, ctx, scale, iconCanvas, iconCtx, stream, iconStream, dirname, filename, iconCanvasFilename, out, iconSelectedColor, iconY, iconH, iconFilename, icon, iconW, iconX, iconGradientW, iconGradientH, iconGradientX, iconGradientY, iconGradient_1, selectedFont, titleFontLocation, bodyFontLocation, robotoTitleFontLocation, robotoBodyFontLocation, technoHeight, technoY, technoPadding, technoText, technoDim, technoX, textHeight, titlePadding, titleDim, titleY, titleX, gradientX, gradientY, gradientW, gradientH, gradient, subtitleLine1Height, subtitleLine1Padding, subtitleLine1Text, subtitleLine1Dim, subtitleLine1X, subtitleLine1Y, subtitleLine2Height, subtitleLine2Padding, subtitleLine2Text, subtitleLine2Dim, subtitleLine2X, subtitleLine2Y;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _a = params.title, title = _a === void 0 ? "Sans titre" : _a, _b = params.technologies, technologies = _b === void 0 ? [] : _b, _c = params.subtitleLine1, subtitleLine1 = _c === void 0 ? "" : _c, _d = params.subtitleLine2, subtitleLine2 = _d === void 0 ? "" : _d, _e = params.iconName, iconName = _e === void 0 ? "" : _e, _f = params.iconColor, iconColor = _f === void 0 ? [] : _f, _g = params.titleColor, titleColor = _g === void 0 ? [] : _g;
                    WIDTH = 2560;
                    HEIGHT = 1440;
                    canvas = createCanvas(WIDTH, HEIGHT);
                    ctx = canvas.getContext("2d");
                    scale = 1;
                    canvas.width = WIDTH * scale;
                    canvas.height = HEIGHT * scale;
                    ctx.scale(scale, scale);
                    iconCanvas = createCanvas(WIDTH, HEIGHT);
                    iconCtx = iconCanvas.getContext("2d");
                    iconCanvas.width = WIDTH * scale;
                    iconCanvas.height = HEIGHT * scale;
                    iconCtx.scale(scale, scale);
                    stream = canvas.createPNGStream();
                    iconStream = iconCanvas.createPNGStream();
                    dirname = path.dirname(fileURLToPath(import.meta.url));
                    console.log("src/image dirname", dirname);
                    filename = path.join(dirname, "../..", "/public/images/test.png");
                    iconCanvasFilename = path.join(dirname, "../..", "/public/images/test_icon.png");
                    out = fs.createWriteStream(filename);
                    // const outIcon = fs.createWriteStream(iconCanvasFilename);
                    // Background
                    // ctx.save();
                    ctx.fillStyle = "white";
                    roundRect(ctx, 0, 0, WIDTH, HEIGHT, 50, true, false);
                    iconSelectedColor = [];
                    if (titleColor.length > 0) {
                        if (iconColor.length === 0) {
                            iconSelectedColor = titleColor;
                        }
                        else {
                            iconSelectedColor = iconColor;
                        }
                    }
                    iconY = 300;
                    iconH = 0;
                    if (!iconName.length) return [3 /*break*/, 2];
                    iconFilename = path.join(dirname, "../..", "/public/icons/solid/".concat(iconName, ".svg")
                    // `/public/images/test.png`
                    );
                    return [4 /*yield*/, loadImage(iconFilename)];
                case 1:
                    icon = _h.sent();
                    console.log("icon", icon.width);
                    console.log("icon", icon.height);
                    iconW = 150;
                    iconH = (iconW / icon.width) * icon.height;
                    iconX = WIDTH * 0.5 - iconW * 0.5;
                    iconY = 150;
                    iconGradientW = iconW;
                    iconGradientH = iconH;
                    iconGradientX = iconX;
                    iconGradientY = iconY;
                    iconGradient_1 = iconCtx.createLinearGradient(iconGradientX, iconGradientY, iconGradientX + iconGradientW, iconGradientY);
                    // Add three color stops
                    // gradient.addColorStop(0, "red");
                    // gradient.addColorStop(1, "orange");
                    iconSelectedColor.forEach(function (color, index, arr) {
                        return iconGradient_1.addColorStop(index * arr.length, color);
                    });
                    // gradient.addColorStop(1, "green");
                    // Set the fill style and draw a rectangle
                    // ctx.save();
                    iconCtx.fillStyle = iconGradient_1;
                    iconCtx.fillRect(iconGradientX, iconGradientY, iconGradientW, iconGradientH);
                    iconCtx.globalCompositeOperation = "destination-atop";
                    // iconCtx.globalCompositeOperation = source as GlobalCompositeOperation;
                    iconCtx.drawImage(icon, iconGradientX, iconGradientY, iconGradientW, iconGradientH);
                    // iconStream.pipe(outIcon);
                    ctx.drawImage(iconCanvas, 0, 0, WIDTH, HEIGHT);
                    _h.label = 2;
                case 2:
                    selectedFont = "Roboto";
                    titleFontLocation = path.join(dirname, "../..", "/public/fonts/Montserrat/Montserrat-Bold.ttf");
                    bodyFontLocation = path.join(dirname, "../..", "/public/fonts/Montserrat/Montserrat-Regular.ttf");
                    registerFont(bodyFontLocation, { family: "Montserrat" });
                    registerFont(titleFontLocation, { family: "Montserrat-Bold" });
                    robotoTitleFontLocation = path.join(dirname, "../..", "/public/fonts/Roboto/Roboto-Bold.ttf");
                    robotoBodyFontLocation = path.join(dirname, "../..", "/public/fonts/Roboto/Roboto-Medium.ttf");
                    registerFont(robotoBodyFontLocation, { family: "Roboto" });
                    registerFont(robotoTitleFontLocation, { family: "Roboto-Bold" });
                    ctx.fillStyle = "black";
                    technoHeight = 70;
                    technoY = 0;
                    if (technologies.length) {
                        technoPadding = 250;
                        ctx.font = "".concat(technoHeight, "px ").concat(selectedFont, "-Bold");
                        technoText = technologies.map(function (t) { return "\u25CF  ".concat(t, "  "); }).join("") + "●";
                        technoDim = ctx.measureText(technoText);
                        technoX = WIDTH * 0.5 - technoDim.width * 0.5;
                        // console.log("iconY", iconY);
                        technoY = iconY + iconH + technoPadding;
                        ctx.fillText(technoText, technoX, technoY);
                    }
                    textHeight = 200;
                    titlePadding = 150;
                    ctx.font = "".concat(textHeight, "px ").concat(selectedFont, "-Bold");
                    titleDim = ctx.measureText(title);
                    titleY = technoY + technoHeight + titlePadding;
                    titleX = WIDTH * 0.5 - titleDim.width * 0.5;
                    gradientX = titleX;
                    gradientY = titleY;
                    gradientW = titleDim.width;
                    gradientH = textHeight;
                    gradient = ctx.createLinearGradient(gradientX, gradientY, gradientX + gradientW, gradientY);
                    // Add three color stops
                    // gradient.addColorStop(0, "red");
                    // gradient.addColorStop(1, "orange");
                    titleColor.forEach(function (color, index, arr) {
                        return gradient.addColorStop(index * arr.length, color);
                    });
                    // gradient.addColorStop(1, "green");
                    // Set the fill style and draw a rectangle
                    ctx.fillStyle = gradient;
                    // ctx.fillRect(gradientX, gradientY, gradientW, gradientH);
                    ctx.fillText(title, titleX, titleY);
                    ctx.fillStyle = "black";
                    // http://localhost:3003/api/actions/generate-image?title=Turbo%20Secure%20Storage&technologies=React+Native&subtitleLine1=Turbo%20Module%20for%20securely%20storing%20data&subtitleLine2=via%20iOS%20Keychain%20and%20Android%20Keystore
                    // Subtitle
                    if (subtitleLine1.length) {
                        subtitleLine1Height = 40;
                        subtitleLine1Padding = 50;
                        ctx.font = "".concat(subtitleLine1Height, "px ").concat(selectedFont);
                        subtitleLine1Text = subtitleLine1;
                        subtitleLine1Dim = ctx.measureText(subtitleLine1Text);
                        subtitleLine1X = WIDTH * 0.5 - subtitleLine1Dim.width * 0.5;
                        subtitleLine1Y = titleY + textHeight + subtitleLine1Padding;
                        ctx.fillText(subtitleLine1Text, subtitleLine1X, subtitleLine1Y);
                        if (subtitleLine2.length) {
                            subtitleLine2Height = 40;
                            subtitleLine2Padding = 10;
                            ctx.font = "".concat(subtitleLine2Height, "px ").concat(selectedFont);
                            subtitleLine2Text = subtitleLine2;
                            subtitleLine2Dim = ctx.measureText(subtitleLine2Text);
                            subtitleLine2X = WIDTH * 0.5 - subtitleLine2Dim.width * 0.5;
                            subtitleLine2Y = subtitleLine1Y + subtitleLine2Height + subtitleLine2Padding;
                            ctx.fillText(subtitleLine2Text, subtitleLine2X, subtitleLine2Y);
                        }
                    }
                    // outIcon.on("finish", async () => {
                    // console.log("The ICON PNG file was created");
                    // resolve(filename);
                    // const img = await loadImage(iconCanvasFilename);
                    // console.log("img", img);
                    // ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
                    stream.pipe(out);
                    out.on("finish", function () {
                        console.log("The PNG file was created");
                        resolve(filename);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
};
export default generateImage;
/**
 * bg-gradient-to-tl from-pink-500 via-red-500 to-yellow-500
 */
