// Imports
const express = require('express')
const db = require('../db/sqlDB')
const router = new express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const generateAuthToken = async (username) => {
    const token = jwt.sign({ username: username }, 'hungrrr')

    return token
}

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds)

    return hash
}

const checkPasswordHash = async (password) => {
    let hash = await hashPassword('hi')
    const match = await bcrypt.compare(password, hash);

    if (match) {
        console.log('Password hash matches!\n')
        return true;
    }
    return false;
}

router.post('/users/signup', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    console.log(`POST request for creating a new user: ${username}\n`)

    try {
        // Check if username exists first
        let queryResult = await db.accessDB.select(
            `SELECT * FROM User WHERE Username = "${username}"` 
        )
        
        if (queryResult.length > 0) {
            throw new Error("Cannot create new user. User exists already!")
        }

        password = await hashPassword(password)

        await db.accessDB.incrementStatUsage("POST_User_Signup")
        const result = await db.accessDB.insert("User",
            "Username, Password", `'${username}', '${password}'`)

        const token = await generateAuthToken(username)
        res.status(201).send({ username, token })
    } catch (error) {
        res.status(400).send({ "error": error.message })
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send({ "error": "" + error });
    }
})

module.exports = router
