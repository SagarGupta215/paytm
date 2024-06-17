const { signupBody,signinBody, updateBody } = require("../config/zod");
const { Account } = require("../models/Accounts");
const User = require("../models/Users");
const jwt = require('jsonwebtoken')


const userSignup = async (req,res)=>{
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        return res.status(401).json({message: "Email already taken / Incorrect inputs"})
    }
    const existingUser = await User.findOne({
        username:req.body.username
    })
    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id

    /// ----- Create new account ------

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
        
    /// -----  ------
    const token = jwt.sign({
        userId
    }, process.env.JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
}

const userSignin = async(req,res) =>{
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(401).json({message: "Email already taken / Incorrect inputs"})
    }
    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    if(!user){
        return res.status(411).json({
            message: "User not present"
        })
    }
    if(user){
        const token = jwt.sign({
            userId:user._id
        },process.env.JWT_SECRET)
        return res.json({
            token:token
        })
    }

    return res.status(411).json({
        message:"error logging in"
    })

}

const updateUser = async (req,res) =>{
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        return res.status(401).json({message: "Email already taken / Incorrect inputs"})
    }


    await User.updateOne({_id : req.userId},req.body);
    
    return res.status(200).json({
        message: "Updated successfully"
    })
}

const getUserWithFilter = async(req,res)=>{
    const filter = req.query.filter || "";
    
    let users = await User.find({
        $or: [
            { firstName: {"$regex": filter}}, { lastName:  {"$regex": filter} }
            ]
    })
    users = users.filter((user)=>(user._id != req.userId))
    return res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
}
    


module.exports = {
    userSignup,
    userSignin,
    updateUser,
    getUserWithFilter
}

