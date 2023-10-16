import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../src/utils/AppError.js";

const createMulterUploader = (folderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // console.log(file);
      cb(null, `uploads/${folderName}`);
    },
    filename: (req, file, cb) => {
      // console.log(file);
      cb(null, uuidv4() + " - " + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      // To accept the file pass `true`, like so:
      cb(null, true);
    } else {
      // To reject this file pass `false`, like so:
      cb(new AppError("Not supporting this mimetype", 401), false);
    }
  }

  const upload = multer({ storage, fileFilter });

  return upload;
};

//For Single upload
export const uploadSingleFile = (fieldName, folderName) => {
  return createMulterUploader(folderName).single(fieldName);
};

//Fir Multiple fields upload
export const uploadMultipleFiles = (arrayOfFields, folderName) => {
  return createMulterUploader(folderName).fields(arrayOfFields);
};
