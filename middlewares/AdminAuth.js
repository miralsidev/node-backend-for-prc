
const admin = require("../models/Admin")
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config();
let token;
const adminAuth = async(req,res,next)=>{
    const {authorization} = req.headers;
    if(authorization && authorization.startsWith('Bearer'))
    {
        try {
            token = authorization.split(' ')[1]
            const adminTokenData = jwt.verify(token,process.env.secret_key)
            console.log("adminTokenData =",adminTokenData);
            if(adminTokenData.id)
            {
                const admin = await admin.findOne({_id : adminTokenData.id})
                console.log("admin = ",admin);
                if(admin){
                    req.adminData={
                        id:admin._id,
                        username:admin.username
                    }
                }
                else{
                    res.status(401).json({status:200,message:"unauthorized user"})
                }
            }
            else{
                res.status(401).json({status:200,message:"unauthorized user"})
            }
            next()
        } catch (error) {
            return res.json({ status: 500, message: "internal server error" });
        }
   
    }
    if(!token){
       return res.json({status:400,message:"Sorry, only admins can insert products. Please log in as an admin to continue."})
    }
}
module.exports = { adminAuth }