const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
 
  email:String,
  password: String,
});
const adminModels = mongoose.model("admin", adminSchema);
module.exports = adminModels