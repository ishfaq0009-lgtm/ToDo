import multer from "multer"
import storage from "../cloudinary.config.js"



let upload = multer({
    storage: storage
})

export default upload