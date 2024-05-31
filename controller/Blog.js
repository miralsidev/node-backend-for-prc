const blog = require('../models/Blog')

const Blog = async (req, res) => {
    try {
        const {
            details,
            heading
        } = req.body;
        if (details && heading) {
            const data = new blog({
                filename: req.file.originalname,
                path: req.file.path,
                size: req.file.size,
                conneteType: req.file.mimetype,
                details: details,
                heading: heading
            })
            console.log("data", data)
            await data.save();
            return res.json({ status: 200, message: "add blog succesfully.!!" })
        } else {
            return res.json({ status: 400, message: "all field are required" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: "intrnal server error" });
    }

}
const  DisplayBlog = async(req,res)=>{
    try {
        const data = await blog.find({deletedAt:null});
        return res.status(200).json(data);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'An error occurred while fetching cars', error: error.message });
      }
}
const  DeleteBlog = async(req,res)=>{
    try {
        const blogId = req.params.id;
        console.log("cars id ==", blogId);
        date = new Date();
        const product = await blog.findOne({
          _id: blogId,
        });
        console.log("product===", product);
    
        const result = await blog.findOneAndUpdate(
          { _id: blogId },
          { $set: { deletedAt: date } }
        );
        console.log("result == ", result);
        if (!result) {
          res.json({status:400, message: "documnet is not found" });
        }
        res.json({status:200, message: "Documnet Deleted Successfully..!!" });
    } catch (error) {
        console.log(error);
        return res.json({message:'internal server erroor'})
    }
}
module.exports = { Blog,DisplayBlog ,DeleteBlog}