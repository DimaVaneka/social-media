import { db } from "../connect.js";
import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
const upload = multer({ storage: storage });

export const postUpload = (upload.single("file"), (req,res) => {
        const file = req.file;
        res.status(200).json(file.filename);
    });