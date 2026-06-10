const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function registerUser(req,res){

    const {FullName,email,password} = req.body;
    const isUserExist = await userModel.findOne({
        email
    })
    if (isUserExist){
        return res.status(400).json({
            message:"User already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const User = await userModel.create({
        FullName,
        email,
        password:hashedPassword
    })

    const token = jwt.sign({
        id:User._id,

    },"09549538786a39c469fb0d1fe64ced7e")
    res.cookie("token",token)

    res.status(201).json({
        message:"User registerd successsfully",
        User:{
            _id:User._id,
            email:User.email,
            FullName:User.FullName

        }

    })




   

}

async function loginUser(req,res){

}

module.exports = {
    registerUser,
    loginUser
}