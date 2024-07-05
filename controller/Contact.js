const Contact = require('../models/Contact')
const { mail } = require('../Helper/mail')
const AddContact = async (req, res) => {
    try {
        const { Name, Email, Message } = req.body
        if (Name && Email && Message) {
            const data = new Contact({
                Name: Name,
                Email: Email,
                Message: Message
            })
            console.log('data-', data);
            await data.save();
            subject = `Contact Inquiry:${Name}`
            text = `A new message has been received:\n\nSender's Email: ${Email}\n\nMessage:\n${Message}`,
                mail(Email, subject, text)
            return res.json({ status: 200, message: 'contact succesfully' })
        } else {
            return res.json({ status: 400, message: "all field are required" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: "intrnal server error" });
    }
}
const displayContact = async (req, res) => {
    try {
        const data = await Contact.find();
        return res.json({ message: "display all data ", data: data });
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "internal server error ", error });

    }
}
const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Email, Message } = req.body;
        if (Name && Email && Message) {
            const contact = await Contact.findByIdAndUpdate(
                id,
                {
                    $set: {
                        Name: Name,
                        Email: Email,
                        Message: Message
                    }
                }
            );
            // const contact = await Contact.findByIdAndUpdate(id, { Name, Email, Message }, { new: true });
            if (contact) {
                return res.json({ status: 200, message: 'contact updated successfully', data: contact });
            } else {
                return res.json({ status: 404, message: 'contact not found' });
            }
        } else {
            return res.json({ status: 400, message: "all fields are required" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: "internal server error" });
    }
}
const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);
        if (contact) {
            return res.json({ status: 200, message: 'Contact deleted successfully', data: contact });
        } else {
            return res.json({ status: 404, message: 'Contact not found' });
        }
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: 'Internal server error', error });
    }
}
module.exports = { AddContact, displayContact, updateContact,deleteContact }