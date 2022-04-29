// @ts-ignore
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyStatic from "fastify-static";
import md5 from "md5";

import updateImages from "./storage/updateImages.js";
import upload from "./storage/upload.js";
import generateImage from "./image/index.js";
import ImageParams from "./types/ImageParams";

dotenv.config();

const dirname = path.dirname(fileURLToPath(import.meta.url));

const { PORT, NODE_ENV, CLOUDINARY_BASE_URL, IMAGE_HEIGHT, IMAGE_WIDTH } =
  process.env;

const fastify = Fastify({
  logger: {
    prettyPrint: NODE_ENV !== "production",
  },
});

fastify.register(fastifyStatic, {
  root: path.join(dirname, "..", "public"),
});

let images: string[] = [];
updateImages().then((img) => {
  images = img;
  // console.log("🚀 ~ file: index.ts ~ line 35 ~ updateImages ~ images", images);
});

const getHashFromParams = (params: ImageParams) => {
  // let hash = "";
  const entries = Object.entries(params);
  const keyValEqual = entries.map((keyVal) => `${keyVal[0]}=${keyVal[1]}`);
  const keyValEncoded = keyValEqual.map((keyVal) => encodeURI(keyVal));
  const sorted = keyValEncoded.sort();
  const values = sorted.map((keyVal) => keyVal.split("=")[1]);
  const joined = values.join("");
  const hash = md5(joined);

  // console.log("hash", hash);

  return hash;
};

const getStorageAssetUrlByHash = (hash: string) => {
  return `${CLOUDINARY_BASE_URL}/${hash}.png`;
};

const generateImageController = async (
  request: FastifyRequest,
  response: FastifyReply
) => {
  const key = request.method === "POST" ? "body" : "query";
  const params: ImageParams = request[key] as ImageParams;

  const hash = getHashFromParams(params);

  if (await images.includes(hash)) {
    const storageAssetUrl = getStorageAssetUrlByHash(hash);
    // console.log("CACHED IMAGE");
    response.redirect(storageAssetUrl);
    return;
  }

  const filePath = await generateImage({
    hash,
    title: params.title,
    technologies: params.technologies?.split(","),
    subtitleLine1: params.subtitleLine1,
    subtitleLine2: params.subtitleLine2,
    iconName: params.iconName,
    iconColor: params.iconColor?.split(","),
    titleColor: params.titleColor?.split(","),
    iconUrl: params.iconUrl,
    iconWidth: params.iconWidth ? Number(params.iconWidth) : undefined,
    iconOffsetTop: params.iconOffsetTop,
    iconOffsetBottom: params.iconOffsetBottom,
    iconOffsetLeft: params.iconOffsetLeft,
    iconOffsetRight: params.iconOffsetRight,
    fontName: params.fontName,
  });
  // console.log("filePath", filePath);
  await upload(filePath, {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    hash,
  });
  const imageUrl = getStorageAssetUrlByHash(hash);
  // console.log("NEWLY UPLOADED IMAGE");
  response.redirect(imageUrl);
};

fastify.get("/api/actions/generate-image", generateImageController);
fastify.post("/api/actions/generate-image", generateImageController);

fastify.listen(
  {
    port: PORT || 3002,
  },
  (err, address) => {
    if (err) {
      throw err;
    }
    console.log("Server started");
  }
);
