const mongoose = require('mongoose')
const { use } = require('../routes/tareasRoutes')

const tareaSchema = mongoose.Schema({
    texto: {
        type : String,
        required:[true,'El campo texto es obligatorio!']
    }, 
    user:{
        type: mongoose.Schema.Types.ObjectId,//id del usuario que creo la tarea
        ref:'User',//nombre de referencia a User
        require:true
    }, 
},{
    timestamps: true //crea dos campos automaticos en la base de datos _id y createdAt
})
module.exports = mongoose.model('tarea',tareaSchema)