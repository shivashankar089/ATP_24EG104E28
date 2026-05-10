import cloudinary from "./cloudinary.js";

export const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    // Check if credentials are configured before attempting upload
    const config = cloudinary.config();
    if (!config.api_key || !config.cloud_name || !config.api_secret) {
      return reject(new Error(
        "Cloudinary credentials are not configured. " +
        "Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env file."
      ));
    }

    const stream = cloudinary.uploader.upload_stream(
      { folder: "blog_users_b2" },
      (err, result) => {
        if (err) {

          return reject(err);
        }
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};
