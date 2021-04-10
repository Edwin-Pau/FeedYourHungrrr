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

const checkUser = async (username, password) => {
    let hash = await hashPassword('hi')
    const match = await bcrypt.compare(password, hash);

    if (match) {
        console.log('matches')
    }
}

router.post('/users/signup', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    console.log(`POST request for creating a new user: ${username}\n`)
    try {
        password = hashPassword(password)

        await db.accessDB.incrementStatUsage("POST_User")
        const result = await db.accessDB.insert("User",
            "Username, Password", `'${username}', '${password}'`)
        console.log(result)

        const token = await generateAuthToken(username)
        res.status(201).send({ username, token })
    } catch (error) {
        res.status(400).send(error)
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
