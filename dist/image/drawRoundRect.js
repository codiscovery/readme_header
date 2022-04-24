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
function drawRoundRect(ctx, x, y, width, height, radius, fill, stroke) {
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
export default drawRoundRect;
