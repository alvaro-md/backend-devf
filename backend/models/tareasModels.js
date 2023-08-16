const mongoose = require('mongoose')

const tareaSchema = mongoose.Schema({
    texto: {
        type : String,
        required:[true,'El campo texto es obligatorio!']
    }
}, {
    timestamps: true //crea dos campos automaticos en la base de datos _id y createdAt
})
module.exports = mongoose.model('tarea',tareaSchema)