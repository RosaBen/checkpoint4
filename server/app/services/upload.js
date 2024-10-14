const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const instructorStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/assets/images");
  },
  filename(req, file, cb) {
    const instructorName = `${uuidv4()}-${path.extname(file.originalname)}`;
    req.body.photo = instructorName;
    cb(null, instructorName);
  },
});

const uploadInstructor = (req, res, next) => {
  const upload = multer({ storage: instructorStorage });
  return upload.single("photo")(req, res, next);
};
module.exports = {
  uploadInstructor
}