const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type : String,
        required:[true,'ingresa tu nombre']
    },
    email: {
        type : String,
        required:[true,'ingresa tu nombre'],
        unique: true
    },
    password: {
        type : String,
        required:[true,'ingresa tu password'],
    }
    
}, {
    timestamps: true //crea dos campos automaticos en la base de datos _id y createdAt
})
module.exports = mongoose.model('User',userSchema)