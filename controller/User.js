const { User } = require("../models/User");

const addUser = async (req, res) => {
  console.log("hello");
  const { fname, lname, email } = req.body;
  // const hashpassword = await bcrypt.hash(password, 10);
  // const findName = await User.findOne({ fname: fname });
  // console.log("find name =", findName);
  // if (findName) {
  //   res.json({ message: "fname already exist" });
  // } else {
    const data = new User({
      fname: fname,
      lname: lname,
      // addres: addres,
      // password: password,
      email: email,
    });
    // const mailTransporter = nodemailer.createTransport({
    //   host: process.env.EMAIL_HOST,
    //   port: process.env.EMAIL_PORT,
    //   secure: false,
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });
    // const mailoption = {
    //   form: process.env.EMAIL_FORM,
    //   to: email,
    //   subject: "reg details",
    //   text: "registartion succsfully",
    // };
    // mailTransporter.sendMail(mailoption, (error, info) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("email sent = ", info.response);
    //   }
    // });
    await data.save();
    res.json({ message: "succsessfully..!!" });
    // UserServices.create(data).then((data) => {
    //   res.json({ message: "succsessfully..!!" });
    // });
  }
// };
module.exports = {addUser}