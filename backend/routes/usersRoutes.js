const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getUserData} = require('../controllers/usersControllers')
const {protect} = require ('../middleware/authMiddleware')

// Add your routes here - above the module.exports line
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/getMe', protect, getUserData)

module.exports = router