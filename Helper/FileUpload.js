const multer = require("multer");

// const path = require("path"); //aa  kya use karyu/? kav'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename)
    }
})
const fileFilter = (req, file, cb) => {
    console.log("fileFilter");
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Only JPG, JPEG, and PNG files are allowed'), false);
    }
};
const upload = multer({ storage, fileFilter })

module.exports = { upload }

// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (req, file, cb) => {
//         const filename = `${Date.now()}-${file.originalname}`;
//         cb(null, filename);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     console.log("fileFilter");
//     const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//     if (allowedMimeTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error('Only JPG, JPEG, and PNG files are allowed'), false);
//     }
// };

// const upload = multer({
//     storage,
//     fileFilter,
//     limits: { fileSize: 1024 * 1024 * 5 } // Optional: Limit file size to 5MB
// });

// module.exports = { upload };
