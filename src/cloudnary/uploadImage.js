import cloudinary from "./cloudConfig";

let options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
  resource_type: "auto",
};

const uploadImage = async (imagePath, option) => {
  options = { ...options, ...option };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.secure_url;
  } catch (error) {
    console.error(error);
    return new Error(error);
  }
};

export default uploadImage;
