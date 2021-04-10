// Imports
const express = require('express')
const db = require('../db/sqlDB')
const router = new express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const generateAuthToken = async (username) => {
    const token = jwt.sign({ username: username }, 'hungrrr')
    await db.accessDB.update(
        'User', 'Token', `"${token}"`, "Username", `"${username}"`
    )

    return token
}

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds)

    return hash
}

const checkPasswordHash = async (username, password) => {
    let storedHash = await db.accessDB.select(
        `SELECT * FROM User WHERE Username = '${username}'`
    )
    const match = await bcrypt.compare(password, storedHash[0].Password);
    console.log(match)

    if (match) {
        return true;
    }

    return false;
}

router.post('/users/signup', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    console.log(`POST request for creating a new user: ${username}\n`)

    try {
        await db.accessDB.incrementStatUsage("POST_User_Signup")

        // Check if username exists first
        let queryResult = await db.accessDB.select(
            `SELECT * FROM User WHERE Username = "${username}"` 
        )

        if (queryResult.length > 0) {
            throw new Error("Cannot create new user. User exists already!")
        }

        password = await hashPassword(password)
        await db.accessDB.insert("User",
            "Username, Password", `'${username}', '${password}'`)

        const token = await generateAuthToken(username)
        res.status(201).send({ username, token })
    } catch (error) {
        res.status(400).send({ "error": error.message })
    }
})

router.post('/users/login', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    console.log(`POST request for signing in a user: ${username}\n`)

    try {
        await db.accessDB.incrementStatUsage("POST_User_Login")
        const passwordMatches = await checkPasswordHash(username, password)

        if (!passwordMatches) {
            throw new Error("Passwords do not match.")
        }

        const token = await generateAuthToken(username)
        res.send({ username, token })
    } catch (error) {
        res.status(400).send({ "error": "" + error.message });
    }
})

module.exports = router
