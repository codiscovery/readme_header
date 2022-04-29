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
import md5 from "md5";
import updateImages from "./storage/updateImages.js";
import upload from "./storage/upload.js";
import generateImage from "./image/index.js";
dotenv.config();
var dirname = path.dirname(fileURLToPath(import.meta.url));
var _a = process.env, PORT = _a.PORT, NODE_ENV = _a.NODE_ENV, CLOUDINARY_BASE_URL = _a.CLOUDINARY_BASE_URL, IMAGE_HEIGHT = _a.IMAGE_HEIGHT, IMAGE_WIDTH = _a.IMAGE_WIDTH;
var fastify = Fastify({
    logger: {
        prettyPrint: NODE_ENV !== "production",
    },
});
fastify.register(fastifyStatic, {
    root: path.join(dirname, "..", "public"),
});
var images = [];
updateImages().then(function (img) {
    images = img;
    // console.log("🚀 ~ file: index.ts ~ line 35 ~ updateImages ~ images", images);
});
var getHashFromParams = function (params) {
    // let hash = "";
    var entries = Object.entries(params);
    var keyValEqual = entries.map(function (keyVal) { return "".concat(keyVal[0], "=").concat(keyVal[1]); });
    var keyValEncoded = keyValEqual.map(function (keyVal) { return encodeURI(keyVal); });
    var sorted = keyValEncoded.sort();
    var values = sorted.map(function (keyVal) { return keyVal.split("=")[1]; });
    var joined = values.join("");
    var hash = md5(joined);
    // console.log("hash", hash);
    return hash;
};
var getStorageAssetUrlByHash = function (hash) {
    return "".concat(CLOUDINARY_BASE_URL, "/").concat(hash, ".png");
};
var generateImageController = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var key, params, hash, storageAssetUrl, filePath, imageUrl;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                key = request.method === "POST" ? "body" : "query";
                params = request[key];
                hash = getHashFromParams(params);
                return [4 /*yield*/, images.includes(hash)];
            case 1:
                if (_d.sent()) {
                    storageAssetUrl = getStorageAssetUrlByHash(hash);
                    // console.log("CACHED IMAGE");
                    response.redirect(storageAssetUrl);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, generateImage({
                        hash: hash,
                        title: params.title,
                        technologies: (_a = params.technologies) === null || _a === void 0 ? void 0 : _a.split(","),
                        subtitleLine1: params.subtitleLine1,
                        subtitleLine2: params.subtitleLine2,
                        iconName: params.iconName,
                        iconColor: (_b = params.iconColor) === null || _b === void 0 ? void 0 : _b.split(","),
                        titleColor: (_c = params.titleColor) === null || _c === void 0 ? void 0 : _c.split(","),
                        iconUrl: params.iconUrl,
                        iconWidth: params.iconWidth ? Number(params.iconWidth) : undefined,
                        iconOffsetTop: params.iconOffsetTop,
                        iconOffsetBottom: params.iconOffsetBottom,
                        iconOffsetLeft: params.iconOffsetLeft,
                        iconOffsetRight: params.iconOffsetRight,
                        fontName: params.fontName,
                    })];
            case 2:
                filePath = _d.sent();
                // console.log("filePath", filePath);
                return [4 /*yield*/, upload(filePath, {
                        width: IMAGE_WIDTH,
                        height: IMAGE_HEIGHT,
                        hash: hash,
                    })];
            case 3:
                // console.log("filePath", filePath);
                _d.sent();
                imageUrl = getStorageAssetUrlByHash(hash);
                // console.log("NEWLY UPLOADED IMAGE");
                response.redirect(imageUrl);
                return [2 /*return*/];
        }
    });
}); };
fastify.get("/api/actions/generate-image", generateImageController);
fastify.post("/api/actions/generate-image", generateImageController);
fastify.listen({
    port: PORT || 3002,
}, function (err, address) {
    if (err) {
        throw err;
    }
    console.log("Server started");
});
