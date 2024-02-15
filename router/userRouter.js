const express = require('express')

const {createNewUser,getAllUsers, getUserById,login}= require("../controllers/userControll")

const router = express.Router()


router.post('/', createNewUser)
router.post("/login", login)
router.get('/', getAllUsers)
router.get('/:id', getUserById)


module.exports = router;