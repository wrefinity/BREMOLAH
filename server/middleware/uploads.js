import multer from "multer";

const multerConfig = multer.diskStorage({
   destination: (req, file, callback) => {
      callback(null, "public/");
   },
   filename: (req, file, callback) => {
      const ext = file.mimetype.split("/")[1];
      callback(null, `img-${Date.now()}.${ext}`);
   },
});
const isImg = (req, file, callback) => {
   if (file.mimetype.startsWith("image")) {
      callback(null, true);
   } else {
      callback(new Error("Only image allowed"));
   }
};

// req.file

const upload = multer({
   storage: multerConfig,
   fileFilter: isImg,
});
const uploadImage = upload;

export default uploadImage;
