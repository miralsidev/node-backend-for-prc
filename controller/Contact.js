const Contact = require('../models/Contact')
const {mail} = require('../Helper/mail')
const AddContact = async (req, res) => {
    try {
        const { Name, Email, Message } = req.body
        if(Name && Email&& Message){
            const data = new Contact({
                Name:Name,
                Email:Email,
                Message:Message
            })
            await data.save();
            subject= `Contact Inquiry:${Name}`
            text= `A new message has been received:\n\nSender's Email: ${Email}\n\nMessage:\n${Message}`,
            mail(Email,subject,text)
            return res.json({status:200,message:'contact succesfully'})
        }else{
            return res.json({ status: 400, message: "all field are required" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: "intrnal server error" });
    }
}
const displayContact = async(req,res)=>{
    try {
        const data = await Contact.find();
        return res.json({ message: "display all data ", data: data });
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "internal server error ", error });
    
    }
}
module.exports = { AddContact,displayContact }