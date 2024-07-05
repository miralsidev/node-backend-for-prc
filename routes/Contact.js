const router = require('express').Router();
const ContactController = require("../controller/Contact")
router.post('/addContact', ContactController.AddContact)
router.get('/displayContact', ContactController.displayContact)
router.put('/updateContact/:id', ContactController.updateContact)
router.delete('/deleteContact/:id', ContactController.deleteContact)

module.exports = router