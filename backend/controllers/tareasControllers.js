const asyncHandler = require('express-async-handler')
const Tarea = require("../models/tareasModels.js")

const getTareas = asyncHandler(async(req, res) => {
    const tareas = await Tarea.find()

    res.status(200).json(tareas)
})

const setTareas = asyncHandler(async(req, res) => {
    //console.log(req.body)
    if(!req.body.texto){
        res.status(400)
        throw new Error('teclea una tarea')
    }
    const tarea = await Tarea.create({
        texto: req.body.texto })

    res.status(201).json(tarea)
})

const updateTarea = asyncHandler(async(req, res) => {
    const tarea = await Tarea.findById(req.params.id)
    if(!tarea){
        res.status(400)
        throw new Error ('tarea no encontrada')
    }
    const updatedTarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new:true})
    
    res.status(200).json(updatedTarea)
})

const deleteTarea = asyncHandler(async(req, res) => {
    const tarea = await Tarea.findById(req.params.id)
    if(!tarea){
        res.status(400)
        throw new Error ('tarea no encontrada')
    }
    //const deletedTarea = await Tarea.findByIdAndDelete(req.params.id)
    tarea.deleteOne()
    res.status(200).json({id: tarea._id})
})

module.exports = {
    getTareas, 
    setTareas,
    updateTarea, 
    deleteTarea
}