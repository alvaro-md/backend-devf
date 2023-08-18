const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getUserData} = require('../controllers/usersControllers')

// Add your routes here - above the module.exports line
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/getMe', getUserData)

module.exports = router