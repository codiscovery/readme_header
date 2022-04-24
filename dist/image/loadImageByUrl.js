import pkg from "canvas";
var Image = pkg.Image;
var loadImageByUrl = function (iconUrl) {
    return new Promise(function (resolve) {
        var img = new Image();
        img.onload = function () {
            // ctx.drawImage(img, 0, 0);
            resolve(img);
        };
        img.src = iconUrl;
    });
};
export default loadImageByUrl;
