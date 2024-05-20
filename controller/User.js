const { User } = require("../models/User");
const addUser = async (req, res) => {
  try {
    console.log("hello");
    const { fname, lname, email, password } = req.body;
    if (fname && lname && email && password) {
      const data = new User({
        fname: fname,
        lname: lname,
        email: email,
        password: password,
      });
      await data.save();
      res.json({ message: "succsessfully..!!" });
    } else {
      return res.json({ status: 400, message: "all filed are required" });
    }
  } catch (error) {
    console.error(error);
    return res.json({ status: 500, message: "internal server error " ,error});
  
  }
};

const getUser = async (req, res) => {
  try {
    const data = await User.find();
    return res.json({ message: "display all data ", data: data });
  } catch (error) {
    
  }

};
module.exports = { addUser, getUser };
