const { User } = require("../models/User");
const addUser = async (req, res) => {
  console.log("hello");
  const { fname, lname, email } = req.body;
    const data = new User({
      fname: fname,
      lname: lname,
      email: email,
    });
    await data.save();
    res.json({ message: "succsessfully..!!" });
  }
  const getUser = async(req,res)=>{
    const data = await User.find();
    return res.json({message:"display all data ",data:data})
  }
module.exports = {addUser,getUser}