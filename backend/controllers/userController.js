const jwt = require('jsonwebtoken')
const bcrypt= require('bcryptjs')
const asyncHandler=require('express-async-handler')
const User=require('../model/userModel')

//DESC register new user 
//Route POST /api/users
//ACCESS Public 

const registerUser =asyncHandler(async(req,res)=>{
    const {name , email,password }=req.body
    
if (!name || !email || !password)
{
    res.status(400)
    throw new Error ('Please add all fields ')
}

    //check if user exists
    const userExists=await User.findOne({email})
if (userExists)
{
    res.status(400)
    throw new Error('User already exists')
}

    // hash password 
    const salt= await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(password, salt)

    //creat a user 
    const user= await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user)
    {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }else {
        res.status(400)
        throw new Error('INVALID USER DATA')
    }

})


//DESC Authentifié un utilisateur 
//Route POST /api/users/login
//ACCESS Public 

const loginUser =asyncHandler(async(req,res)=>{
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email })
  
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('INVALID CREDENTIALS')
    }
})

//DESC Get user data
//Route GET /api/users/me
//ACCESS Private 

const getMe =asyncHandler(async(req,res)=>{
    const {_id,name , email }= await User.findOne(req.user._id)
    res.status(200).json({
        id:_id,
        name,
        email,
    })
    
     //res.json({message: 'User data display'})
})

//generate JWAT 
const generateToken =(id) =>
{
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}


module.exports =
{
    registerUser,
    loginUser,
    getMe,
}