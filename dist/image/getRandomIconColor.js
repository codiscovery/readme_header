var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import namedColors from "./colors.js";
var getRandomColor = function () {
    var colors = __spreadArray([
        ["#fad0c4", "#ffd1ff"]
    ], Object.values(namedColors), true);
    var randomColorIndex = Math.floor(Math.random() * colors.length);
    var color = colors[randomColorIndex];
    return color;
};
export default getRandomColor;
