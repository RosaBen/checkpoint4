const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const mediaStorage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "public/assets/medias");
    },
    filename(req, file, cb) {
        const mediaName = `${uuidv4()}-${path.extname(file.originalname)}`;
        req.body.url = mediaName;
        cb(null, mediaName);
    },
});

const uploadMedia = (req, res, next) => {
    const upload = multer({ storage: mediaStorage });
    return upload.single("url")(req, res, next);
};
module.exports = {
    uploadMedia
}