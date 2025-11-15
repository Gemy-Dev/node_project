import multer, { diskStorage } from 'multer';
import { extname } from 'path';



// Storage configuration
const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // folder to save images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + extname(file.originalname)); // rename image
  }
});

export default multer({ storage: storage });
