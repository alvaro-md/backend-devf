const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModels')

const registerUser = asyncHandler(async(req, res) =>{
    const {name , email, password}  = req.body
    if (!name ||!email||!password){
        res.status(400)
        throw new Error('Please enter all fields')
    }
    //check for existing user with same email address in database
    const userExists= await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('user already exists')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword =await bcrypt.hash(password,salt);

    //create user in the DB
    const user = await User.create ({ 
        name,
        email, 
        password: hashedPassword
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            name : user.name,
            email: user.email,
            //token:"Bearer "+generateToken(_id),
        })
    }else{
        res.status(400)
        throw new Error('user could not be created, verify info')
    }
        
    //res.json({message: 'crear usuario'})
})

const loginUser = asyncHandler(async(req, res) =>{
    const {email, password} = req.body
    //verify email & password
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id:user._id,
            name : user.name,
            email: user.email,
            token: generateToken(user.id, user.name)
        })
    }else{
        res.status(400)
        throw new Error('incorrect combination')
    }
    //res.json({message: 'login usuario'})
})
//generate JWT
const generateToken = (id, name) =>{
    //return jwt.sign({ id }, process.env.JWT_SECRET,{expiresIn:'7d'})
    return jwt.sign({ id, name }, process.env.JWT_SECRET,{expiresIn:'7d'})
}

const getUserData = asyncHandler(async(req, res) =>{
    res.json({message: 'mis datos usuario'})
})
module.exports = {registerUser, loginUser, getUserData}