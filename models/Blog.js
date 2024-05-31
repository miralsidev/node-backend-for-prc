const mongoose = require("mongoose")
const blogSchema = new mongoose.Schema({
    filename: {
        type: String,
        require: true
    },
    size: {
        type: String,
        require: true
    },
    conneteType: {
        type: String,
        require: true
    },
    path: {
        type: String,
        require: true
    },
    details: {
        type: String,
        required: true,
    },
    heading: {
        type: String,
        required: true,
    },
    deletedAt: {
        type: Date,
        default: null,
    }
}, { timestamps: true });
const blog = mongoose.model("blog", blogSchema);
module.exports = blog;