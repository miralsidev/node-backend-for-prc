const mongoose = require("mongoose")
const ContactSchema = new mongoose.Schema({
    Name: {
        type: String,
        require: true
    },
    Email: {
        type: String,
        require: true
    },
    Message: {
        type: String,
        require: true
    },
    deletedAt: {
        type: Date,
        default: null,
    }
}, { timestamps: true });
const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;