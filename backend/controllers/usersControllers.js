const registerUser = (req, res) =>{
    res.json({message: 'crear usuario'})
}

const loginUser = (req, res) =>{
    res.json({message: 'login usuario'})
}

const getUserData = (req, res) =>{
    res.json({message: 'mis datos usuario'})
}
module.exports = {registerUser, loginUser, getUserData}