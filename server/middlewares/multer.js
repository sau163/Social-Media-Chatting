import path from "path";

import multer from "multer";

//const storage = multer.memoryStorage();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 100 * 1024 * 1024 },
  //storage:storage // 50 mb in size max limit
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (_req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  // fileFilter: (_req, file, cb) => {
  //   let ext = path.extname(file.originalname);

  //   if (
  //     ext !== ".jpg" &&
  //     ext !== ".jpeg" &&
  //     ext !== ".webp" &&
  //     ext !== ".png" &&
  //     ext !== ".mp4"
  //   ) {
  //     cb(new Error(`Unsupported file type! ${ext}`), false);
  //     return;
  //   }

  //   cb(null, true);
  // },
});

const multerUpload= multer({
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 mb in size max limit
})






export { upload,multerUpload };
