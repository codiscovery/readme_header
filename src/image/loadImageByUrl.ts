import pkg from "canvas";
const { Image } = pkg;

const loadImageByUrl = (iconUrl: string): Promise<pkg.Image> =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      // ctx.drawImage(img, 0, 0);
      resolve(img as pkg.Image);
    };
    img.src = iconUrl;
  });

export default loadImageByUrl;
