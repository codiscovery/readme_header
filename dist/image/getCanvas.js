import pkg from "canvas";
var createCanvas = pkg.createCanvas;
var getCanvas = function (_a) {
    var width = _a.width, height = _a.height;
    var scale = 4;
    var canvas = createCanvas(width, height);
    var ctx = canvas.getContext("2d");
    canvas.width = width * scale;
    canvas.height = height * scale;
    ctx.scale(scale, scale);
    return {
        canvas: canvas,
        ctx: ctx,
    };
};
export default getCanvas;
