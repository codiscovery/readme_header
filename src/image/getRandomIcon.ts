import path from "path";
import { fileURLToPath } from "url";
import glob from "glob-promise";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const ICONS_PATH = path.join(dirname, "../../public/icons/solid");

const getRandomIcon = async () => {
  const iconPaths = await glob(`${ICONS_PATH}/**.svg`);
  const icons = iconPaths.map((iconPath) =>
    iconPath.replace(`${ICONS_PATH}/`, "").replace(".svg", "")
  );
  //   console.log("icons.length", icons[349]);
  const randomIndex = Math.floor(Math.random() * icons.length);

  const iconName = icons[randomIndex];
  //   console.log("#getRandomIcon iconName", iconName);
  return iconName;
};

export default getRandomIcon;
