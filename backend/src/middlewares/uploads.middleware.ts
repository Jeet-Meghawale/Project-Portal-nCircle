import multer from "multer";

const storage = multer.memoryStorage(); // file stays in RAM

export const upload = multer({ storage }); // no limit on file size, can be set with limits: { fileSize: maxSizeInBytes }