// @ts-ignore
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyStatic from "fastify-static";

import generateImage from "./image/index.js";

dotenv.config();

const dirname = path.dirname(fileURLToPath(import.meta.url));

const { PORT, NODE_ENV } = process.env;

const fastify = Fastify({
  logger: {
    prettyPrint: NODE_ENV !== "production",
  },
});

fastify.register(fastifyStatic, {
  root: path.join(dirname, "..", "public"),
});

const generateImageController = async (
  request: FastifyRequest,
  response: FastifyReply
) => {
  const key = request.method === "POST" ? "body" : "query";
  const params = request[key];
  await generateImage({
    // @ts-ignore
    title: params.title,
    // @ts-ignore
    technologies: params.technologies?.split(","),
    // @ts-ignore
    subtitleLine1: params.subtitleLine1,
    // @ts-ignore
    subtitleLine2: params.subtitleLine2,
    // @ts-ignore
    iconName: params.iconName,
    // @ts-ignore
    iconColor: params.iconColor?.split(","),
    // @ts-ignore
    titleColor: params.titleColor?.split(","),
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
    // @ts-ignore
    fontName: params.fontName,
  });
  response.redirect("/images/test.png");
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
