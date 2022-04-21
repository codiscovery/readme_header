// @ts-ignore
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

import Fastify from "fastify";
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

fastify.get("/api/actions/generate-image", async (request, response) => {
  await generateImage({
    // @ts-ignore
    title: request.query.title,
    // @ts-ignore
    technologies: request.query.technologies?.split(","),
    // @ts-ignore
    subtitleLine1: request.query.subtitleLine1,
    // @ts-ignore
    subtitleLine2: request.query.subtitleLine2,
    // @ts-ignore
    iconName: request.query.iconName,
    // @ts-ignore
    iconColor: request.query.iconColor?.split(","),
    // @ts-ignore
    titleColor: request.query.titleColor?.split(","),
    // @ts-ignore
    iconUrl: request.query.iconUrl,
    // @ts-ignore
    iconWidth: Number(request.body.iconWidth),
    // @ts-ignore
    iconOffsetTop: request.body.iconOffsetTop,
    // @ts-ignore
    iconOffsetBottom: request.body.iconOffsetBottom,
    // @ts-ignore
    iconOffsetLeft: request.body.iconOffsetLeft,
    // @ts-ignore
    iconOffsetRight: request.body.iconOffsetRight,
  });
  response.redirect("/images/test.png");
});
fastify.post("/api/actions/generate-image", async (request, response) => {
  await generateImage({
    // @ts-ignore
    title: request.body.title,
    // @ts-ignore
    technologies: request.body.technologies?.split(","),
    // @ts-ignore
    subtitleLine1: request.body.subtitleLine1,
    // @ts-ignore
    subtitleLine2: request.body.subtitleLine2,
    // @ts-ignore
    iconName: request.body.iconName,
    // @ts-ignore
    iconColor: request.body.iconColor?.split(","),
    // @ts-ignore
    titleColor: request.body.titleColor?.split(","),
    // @ts-ignore
    iconUrl: request.body.iconUrl,
    // @ts-ignore
    iconWidth: request.body.iconWidth,
    // @ts-ignore
    iconOffsetTop: request.body.iconOffsetTop,
    // @ts-ignore
    iconOffsetBottom: request.body.iconOffsetBottom,
    // @ts-ignore
    iconOffsetLeft: request.body.iconOffsetLeft,
    // @ts-ignore
    iconOffsetRight: request.body.iconOffsetRight,
  });
  response.redirect("/images/test.png");
});

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
