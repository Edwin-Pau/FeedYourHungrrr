const express = require('express')
const router = new express.Router()
const db = require('../db/sqlDB')

router.get('/stats', async (req, res) => {
    try {
        console.log("GET request for all stats")
        let rows = await db.accessDB.select("SELECT * FROM Stat")
    
        res.status(200).send(rows)
    }
    catch (error) {
        res.status(500).send({ "error": error.message })
    }
})

module.exports = router
