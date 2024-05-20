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

module.exports = {addUser}