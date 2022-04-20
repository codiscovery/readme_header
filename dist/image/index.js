// @ts-ignore
import fs from "fs";
// @ts-ignore
import path from "path";
// @ts-ignore
import pkg from "canvas";
import { fileURLToPath } from "url";
var createCanvas = pkg.createCanvas;
// const { createCanvas, loadImage } = require('canvas')
var generateImage = function (_a) {
    var _b = _a.title, title = _b === void 0 ? "Sans titre" : _b;
    return new Promise(function (resolve) {
        var WIDTH = 2560;
        var HEIGHT = 1440;
        var canvas = createCanvas(WIDTH, HEIGHT);
        var ctx = canvas.getContext("2d");
        var stream = canvas.createPNGStream();
        var dirname = path.dirname(fileURLToPath(import.meta.url));
        console.log("src/image dirname", dirname);
        var filename = path.join(dirname, "../..", "/public/images/test.png");
        var out = fs.createWriteStream(filename);
        // Write "Awesome!"
        var textHeight = 200;
        ctx.font = "".concat(textHeight, "px Arial");
        ctx.rotate(0.1);
        var titleDim = ctx.measureText(title);
        ctx.fillText(title, WIDTH * 0.5 - titleDim.width * 0.5, HEIGHT * 0.5 - textHeight * 0.5);
        // Draw line under text
        // var text = ctx.measureText("Awesome!");
        // ctx.strokeStyle = "rgba(0,0,0,0.5)";
        // ctx.beginPath();
        // ctx.lineTo(50, 102);
        // ctx.lineTo(50 + text.width, 102);
        // ctx.stroke();
        stream.pipe(out);
        out.on("finish", function () {
            console.log("The PNG file was created");
            resolve(filename);
        });
        // // Draw cat with lime helmet
        // loadImage('examples/images/lime-cat.jpg').then((image) => {
        //   ctx.drawImage(image, 50, 0, 70, 70)
        //   console.log('<img src="' + canvas.toDataURL() + '" />')
        // })
    });
};
export default generateImage;
