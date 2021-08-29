const util = require("util");
const multer = require("multer");

const DIR = '/Users/macbook/WebstormProjects/node_auth/public/uploads';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    },
});
let fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('File types allowed .jpeg, .jpg and .png!'));
    }
}

let upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

// let fileUploadMiddleware = util.promisify(upload);

module.exports = upload;




