// @ts-ignore
import fs from "fs";
// @ts-ignore
import path from "path";
// @ts-ignore
import pkg from "canvas";
import { fileURLToPath } from "url";
const { createCanvas } = pkg;
// const { createCanvas, loadImage } = require('canvas')

const generateImage = () => {
  return new Promise((resolve) => {
    const canvas = createCanvas(200, 200);
    const ctx = canvas.getContext("2d");
    const stream = canvas.createPNGStream();
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    console.log("src/image dirname", dirname);
    const filename = path.join(dirname, "../..", "/public/images/test.png");
    const out = fs.createWriteStream(filename);

    // Write "Awesome!"
    ctx.font = "30px Impact";
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

    out.on("finish", () => {
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
