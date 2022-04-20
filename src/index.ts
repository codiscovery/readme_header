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

console.log("NODE_ENV", NODE_ENV);

const fastify = Fastify({
  logger: {
    prettyPrint: NODE_ENV !== "production",
  },
});

fastify.register(fastifyStatic, {
  root: path.join(dirname, "..", "public"),
});

fastify.get("/api/actions/generate-image", async (request, response) => {
  await generateImage();
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
