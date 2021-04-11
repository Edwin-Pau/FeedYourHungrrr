const jwt = require('jsonwebtoken')
const db = require('../db/sqlDB')

// Middleware for auth before proceeding. Requires proper web token.
const auth = async (req, res, next) => {
    try {
        // Stores incoming token from the header and gets rid of Bearer in the string
        const token = req.header('Authorization').replace('Bearer ', '')

        const decodedToken = jwt.verify(token, process.env.JWT_KEY)
        const username = decodedToken.username

        const result = await db.accessDB.select(
            `SELECT * FROM User WHERE Username = '${username}'`
        )
        const storedToken = result[0].Token

        const match = storedToken === token ? true : false
        if (!match) {
            throw new Error()
        }

        req.username = username
        req.token = token

        next()
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth
