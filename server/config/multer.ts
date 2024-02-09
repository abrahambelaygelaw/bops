import multer from "multer";

// Set storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination folder where files will be stored
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for each uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// Create the multer instance
const upload = multer({
  storage,
});

export default upload;
