const fs = require("fs");
const path = require("path");
const multer = require("multer");

const uploadDirectory = path.join(process.cwd(), "uploads");
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDirectory),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "-");
    cb(null, `${Date.now()}-${safeName}`);
  }
});

<<<<<<< HEAD
// Image file filter (original)
const imageFileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image uploads are allowed"));
  }
  cb(null, true);
};

// Lab file filter (images + PDFs for test reports)
const labFileFilter = (req, file, cb) => {
  const allowedMimes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf"
  ];
  
  if (!allowedMimes.includes(file.mimetype)) {
    return cb(new Error("Only image and PDF files are allowed"));
  }
=======
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image uploads are allowed"));
  }

>>>>>>> 445617f4568e9ef3ae030c04dd1a67cb6df1ee75
  cb(null, true);
};

const upload = multer({
  storage,
<<<<<<< HEAD
  fileFilter: imageFileFilter,
=======
  fileFilter,
>>>>>>> 445617f4568e9ef3ae030c04dd1a67cb6df1ee75
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

<<<<<<< HEAD
// Lab file upload (images + PDFs)
const labUpload = multer({
  storage,
  fileFilter: labFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB for PDFs
  }
});

module.exports = upload;
module.exports.labUpload = labUpload;
=======
module.exports = upload;
>>>>>>> 445617f4568e9ef3ae030c04dd1a67cb6df1ee75
