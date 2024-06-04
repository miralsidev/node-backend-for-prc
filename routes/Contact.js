const router = require('express').Router();
const  ContactController = require("../controller/Contact")
router.post('/addContact', ContactController.AddContact)
router.get('/displayContact',ContactController.displayContact)
module.exports = router