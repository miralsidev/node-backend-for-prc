const router = require('express').Router();
const {upload} = require('../Helper/FileUpload')
const adminController = require("../controller/Blog")

router.post("/addblog",upload.single('Image'),adminController.Blog)
router.get('/displayBlog',adminController.DisplayBlog)
router.delete('/DeleteBlog/:id',adminController.DeleteBlog)
module.exports = router