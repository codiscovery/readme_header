// @ts-ignore
import fs from "fs";
// @ts-ignore
import path from "path";
// @ts-ignore
import pkg from "canvas";
import { fileURLToPath } from "url";
var createCanvas = pkg.createCanvas;
// const { createCanvas, loadImage } = require('canvas')
var generateImage = function () {
    return new Promise(function (resolve) {
        var canvas = createCanvas(200, 200);
        var ctx = canvas.getContext("2d");
        var stream = canvas.createPNGStream();
        var dirname = path.dirname(fileURLToPath(import.meta.url));
        console.log("src/image dirname", dirname);
        var filename = path.join(dirname, "../..", "/public/images/test.png");
        var out = fs.createWriteStream(filename);
        // Write "Awesome!"
        ctx.font = "30px Arial";
        ctx.rotate(0.1);
        ctx.fillText("Awesome!", 50, 100);
        // Draw line under text
        var text = ctx.measureText("Awesome!");
        ctx.strokeStyle = "rgba(0,0,0,0.5)";
        ctx.beginPath();
        ctx.lineTo(50, 102);
        ctx.lineTo(50 + text.width, 102);
        ctx.stroke();
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
