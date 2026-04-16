import multer from "multer"; // install multer to save file req.file
const storage = multer.memoryStorage(); // ram stoage temp storage before uplaod to cloudinary;
const uplaod = multer({storage}) // this is the methord use to store file come from frontend
export default uplaod;