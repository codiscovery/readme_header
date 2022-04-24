import namedColors from "./colors.js";

const getRandomColor = () => {
  const colors = [
    ["#fad0c4", "#ffd1ff"], // light red, pastel pink
    ...Object.values(namedColors),
  ];

  const randomColorIndex = Math.floor(Math.random() * colors.length);

  const color = colors[randomColorIndex];

  return color;
};

export default getRandomColor;
