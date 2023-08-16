const express = require ('express')
const router = express.Router()
const {getTareas, setTareas, updateTarea, deleteTarea} = require('../controllers/tareasControllers')

router.get('/', getTareas)

router.post('/', setTareas)

router.put('/:id', updateTarea)

router.delete('/:id', deleteTarea)


module.exports = router