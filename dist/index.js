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
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Fastify from "fastify";
import fastifyStatic from "fastify-static";
import generateImage from "./image/index.js";
dotenv.config();
var dirname = path.dirname(fileURLToPath(import.meta.url));
var _a = process.env, PORT = _a.PORT, NODE_ENV = _a.NODE_ENV;
var fastify = Fastify({
    logger: {
        prettyPrint: NODE_ENV !== "production",
    },
});
fastify.register(fastifyStatic, {
    root: path.join(dirname, "..", "public"),
});
var generateImageController = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var key, params;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                key = request.method === "POST" ? "body" : "query";
                params = request[key];
                return [4 /*yield*/, generateImage({
                        // @ts-ignore
                        title: params.title,
                        // @ts-ignore
                        technologies: (_a = params.technologies) === null || _a === void 0 ? void 0 : _a.split(","),
                        // @ts-ignore
                        subtitleLine1: params.subtitleLine1,
                        // @ts-ignore
                        subtitleLine2: params.subtitleLine2,
                        // @ts-ignore
                        iconName: params.iconName,
                        // @ts-ignore
                        iconColor: (_b = params.iconColor) === null || _b === void 0 ? void 0 : _b.split(","),
                        // @ts-ignore
                        titleColor: (_c = params.titleColor) === null || _c === void 0 ? void 0 : _c.split(","),
                        // @ts-ignore
                        iconUrl: params.iconUrl,
                        // @ts-ignore
                        iconWidth: params.iconWidth ? Number(params.iconWidth) : undefined,
                        // @ts-ignore
                        iconOffsetTop: params.iconOffsetTop,
                        // @ts-ignore
                        iconOffsetBottom: params.iconOffsetBottom,
                        // @ts-ignore
                        iconOffsetLeft: params.iconOffsetLeft,
                        // @ts-ignore
                        iconOffsetRight: params.iconOffsetRight,
                    })];
            case 1:
                _d.sent();
                response.redirect("/images/test.png");
                return [2 /*return*/];
        }
    });
}); };
fastify.get("/api/actions/generate-image", generateImageController);
fastify.post("/api/actions/generate-image", generateImageController);
// fastify.post("/api/actions/generate-image", async (request, response) => {
//   await generateImage({
//     // @ts-ignore
//     title: request.body.title,
//     // @ts-ignore
//     technologies: request.body.technologies?.split(","),
//     // @ts-ignore
//     subtitleLine1: request.body.subtitleLine1,
//     // @ts-ignore
//     subtitleLine2: request.body.subtitleLine2,
//     // @ts-ignore
//     iconName: request.body.iconName,
//     // @ts-ignore
//     iconColor: request.body.iconColor?.split(","),
//     // @ts-ignore
//     titleColor: request.body.titleColor?.split(","),
//     // @ts-ignore
//     iconUrl: request.body.iconUrl,
//     // @ts-ignore
//     iconWidth: request.body.iconWidth
//       ? Number(request.body.iconWidth)
//       : undefined,
//     // @ts-ignore
//     iconOffsetTop: request.body.iconOffsetTop,
//     // @ts-ignore
//     iconOffsetBottom: request.body.iconOffsetBottom,
//     // @ts-ignore
//     iconOffsetLeft: request.body.iconOffsetLeft,
//     // @ts-ignore
//     iconOffsetRight: request.body.iconOffsetRight,
//   });
//   response.redirect("/images/test.png");
// });
fastify.listen({
    port: PORT || 3002,
}, function (err, address) {
    if (err) {
        throw err;
    }
    console.log("Server started");
});
