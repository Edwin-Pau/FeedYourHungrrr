const express = require('express')
const router = new express.Router()
const db = require('../db/sqlDB')
const auth = require('../middleware/auth')

router.get('/restaurants', async (req, res) => {
    let rows;

    try {
        console.log("GET request for all restaurants.")
        await db.accessDB.incrementStatUsage("GET_Restaurant")
        rows = await db.accessDB.select("SELECT * FROM Restaurant")
    
        res.status(200).send(rows)
    } catch (error) {
        res.status(401).send({ error: error.message })
    }
})

router.get('/restaurants/me', auth, async (req, res) => {
    console.log(`GET request for getting own restaurants: ${req.username}`)

    try {
        await db.accessDB.incrementStatUsage("GET_Restaurant_Me")
        let result = await db.accessDB.select(
            `SELECT * FROM Restaurant WHERE Username = "${req.username}"`
        )

        res.status(201).send(result)
    } catch (error) {
        res.status(401).send({ error: error.message })
    }
})

router.post('/restaurants', auth, async (req, res) => {
    console.log(`POST request for creating a new restaurant: ${req.body.name}`)

    try {
        if (!req.body.name) {
            throw new Error("The key 'name' is required for a restaurant.")
        }
        let restaurantName = req.body.name
        let description = ""
        if (req.body.description) {
            description = req.body.description
        }

        await db.accessDB.incrementStatUsage("POST_Restaurant")
        const result = await db.accessDB.insert(
            "Restaurant", 
            "RestaurantName, Description, Username",
            `'${restaurantName}', '${description}', '${req.username}'`
        )

        res.status(201).send(result)
    } catch (error) {
        res.status(401).send({ error: error.message })
    }
})

module.exports = router
