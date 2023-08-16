const mongoose = require('mongoose')

const tareaSchema = mongoose.Schema({
    text: {
        type : String,
        required:[true,'El campo texto es obligatorio!']
    }
}, {
    timestamps: true //crea dos campos automaticos en la base de datos _id y createdAt
})
module.exports = mongoose.model('tarea',tareaSchema)