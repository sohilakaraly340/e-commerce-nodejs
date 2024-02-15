const asyncHandler = require('express-async-handler')
const userModule = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')


const createNewUser = asyncHandler(async (req, res) => {
    const { name, email,password, phone, isAdmin, city } = req.body
    
    if (!email || !password) {
        return res.status(422).send({ massage: "wrong email or password" })
    }

    const user = await userModule.findOne({email})
    if (user) {
        return res.send({ massage: "this email already exist" })
    }
    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = await userModule.create({ name,email,city,isAdmin,phone,passwordHash })

    res.status(201).json({ user: newUser })
})


const getAllUsers = asyncHandler(async (req, res) => {
    const user = await userModule.find();
    res.status(200).json({ data: user });
})


const getUserById = asyncHandler(async (req, res) => {
    const user = await userModule.findById(req.params.id)
    res.status(200).json({ user: user });
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send({ massage: "wrong email or password" })
    }


    const user = await userModule.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: "Email not found" });
    }


    if (user && bcrypt.compareSync(password, user.passwordHash)) {
        const token = jwt.sign({ userId: user._id }, 'myjwtsecret', { expiresIn: '1w' })
        res.header({ jwt: token }).send({ token: token,email, massage: "access granted" })
    } else {
        res.status(200).send(' unAuthenticated');
    }

})

module.exports = {
    createNewUser,
    getAllUsers,
    getUserById,
    login,
}