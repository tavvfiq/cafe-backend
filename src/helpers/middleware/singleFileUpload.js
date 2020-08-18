const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const nameFormat = `${Date.now()}-${req.body.name.replace(
      " ",
      "-"
    )}${path.extname(file.originalname)}`;
    cb(null, nameFormat);
  },
});

const limits = {
  fileSize: 1e6,
};

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpg|jpeg|gif|png/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  if (extName) {
    cb(null, true);
  } else {
    cb("Error: Images Only");
  }
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

const singleFileUpload = {
  singleUpload: (req, res, next) => {
    const singleUpload = upload.single("image");
    singleUpload(req, res, (err) => {
      if (err) {
        res.json({
          msg: err,
        });
      } else {
        try {
          req.body.image_path = `${process.env.API_URL}/images/${req.file.filename}`;
        } catch(err){
          console.log(err);
        } finally{
          next();
        }
      }
    });
  },
};

module.exports = singleFileUpload;
