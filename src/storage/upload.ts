import cloudinary from "./base.js";
import updateImages from "./updateImages.js";

const upload = async (
  filePath: string,
  { hash, width, height }: { hash: string; width: number; height: number }
) => {
  await cloudinary.uploader.upload(filePath, {
    resource_type: "image",
    public_id: hash,
    width,
    height,
  });

  updateImages(hash);
};

export default upload;
