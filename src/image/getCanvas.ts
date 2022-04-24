import pkg from "canvas";
import { hasUncaughtExceptionCaptureCallback } from "process";

const { createCanvas } = pkg;

const getCanvas = ({ width, height }: { width: number; height: number }) => {
  const scale = 4;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  canvas.width = width * scale;
  canvas.height = height * scale;
  ctx.scale(scale, scale);

  return {
    canvas,
    ctx,
  };
};

export default getCanvas;
