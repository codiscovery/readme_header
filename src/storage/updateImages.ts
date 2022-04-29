import cloudinary from "./base.js";

let images: null | string[] = null;

const getInitialImages = (): Promise<string[]> =>
  new Promise((resolve, reject) => {
    // console.log("cloudinary", cloudinary);
    cloudinary.search
      .expression(
        "resource_type:image" // add your folder
      )
      .sort_by("public_id", "desc")
      .max_results(500)
      .with_field("context")
      .execute()
      .then((results) => {
        // console.log("results", results);
        const publicIds = results.resources.map(
          (resource: { public_id: string }) => resource.public_id
        );
        resolve(publicIds);
      })
      .catch(reject);
  });

const updateImages = async (hash?: string) => {
  if (images === null) {
    images = await getInitialImages();
    return images;
  }
  if (hash) {
    images?.push(hash);
  }

  return images;
};

export default updateImages;
