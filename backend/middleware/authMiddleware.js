const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModels')

const protect = asyncHandler(async(req,res, next)=>{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try{
            //get the bearer token and remove Bearer from it    
            token = req.headers.authorization.split(' ')[1]
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //get token's user id
            req.user = await User.findById(decoded.id).select('-password')
            
            next()
        } catch (error){
            console.log(error)
            res.status(401)
            throw new Error ('Unauthorized!')

        }
    }
    if (!token){
        console.log(error)
        res.status(401)
        throw new Error ('Unauthorized! no token provided!')
    }
})

module.exports = {protect}