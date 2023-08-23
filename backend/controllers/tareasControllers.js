const asyncHandler = require('express-async-handler')
const Tarea = require("../models/tareasModels.js")

const getTareas = asyncHandler(async(req, res) => {
    const tareas = await Tarea.find({user: req.user.id})

    res.status(200).json(tareas)
})

const setTareas = asyncHandler(async(req, res) => {
    //console.log(req.body)
    if(!req.body.texto){
        res.status(400)
        throw new Error('teclea una tarea')
    }
    const tarea = await Tarea.create({
        texto: req.body.texto,
        user : req.user.id

    })

    res.status(201).json(tarea)
})

const updateTarea = asyncHandler(async(req, res) => {
    const tarea = await Tarea.findById(req.params.id)
    if(!tarea){
        res.status(400)
        throw new Error ('tarea no encontrada')
    }
    //verify task belongs to logged user
    if(tarea.user.toString() !== req.user.id){
        res.status(403);
        throw new Error("No tiene permisos para editar esta tarea");
    }else{
    const updatedTarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(200).json(updatedTarea)
    }
})

const deleteTarea = asyncHandler(async(req, res) => {
    const tarea = await Tarea.findById(req.params.id)
    if(tarea.user.toString() !== req.user.id){
        res.status(403);
        throw new Error("No tiene permisos para borrar esta tarea");
    }else{
    //const deletedTarea = await Tarea.findByIdAndDelete(req.params.id)
    tarea.deleteOne()
    res.status(200).json({id: tarea._id})
    }
})

module.exports = {
    getTareas, 
    setTareas,
    updateTarea, 
    deleteTarea
}