/* eslint-disable no-undef */
const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(buffer) {
  try {
    const result = await imagekit.files.upload({
      file: buffer.toString("base64"), // ✅ correct
      fileName: `movie-${Date.now()}.jpg`, // unique name
    });

    return result;
  } catch (error) {
    console.log("IMAGEKIT ERROR:", error);
    throw error;
  }
}

module.exports = uploadFile;