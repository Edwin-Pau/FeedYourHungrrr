const express = require('express')
const router = new express.Router()
const db = require('../db/sqlDB')

router.get('/restaurants', async (req, res) => {
    let rows;
    if (req.query.id) {
        console.log("GET request for one restaurant.")
    } else {
        console.log("GET request for all restaurants.")
        await db.accessDB.incrementStatUsage("GET_Restaurant")
        rows = await db.accessDB.select("SELECT * FROM Restaurant")
    }

    res.status(200).send(rows)
})

router.post('/restaurants', async (req, res) => {
    console.log(`POST request for creating a new restaurant: ${req.body.name}`)
    await db.accessDB.incrementStatUsage("POST_Restaurant")
    const result = await db.accessDB.insert("Restaurant", "RestaurantName", `'${req.body.name}'`)

    res.status(201).send(result)
})

module.exports = router
