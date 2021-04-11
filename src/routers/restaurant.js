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
        res.status(500).send({ error: error.message })
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
        res.status(500).send({ error: error.message })
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
        res.status(500).send({ error: error.message })
    }
})

router.put('/restaurants', auth, async (req, res) => {
    console.log(`PUT request for editing a restaurant: ${req.body.name}`)

    try {
        if (!req.body.name) {
            res.status(400).send({ error: "bad request, please check 'name'"})
        }

        if (!req.body.id) {
            res.status(400).send({ error: "bad request, please check 'id'"})
        }
        let id = req.body.id
        let restaurantName = req.body.name
        let description = ""
        if (req.body.description) {
            description = req.body.description
        }

        await db.accessDB.incrementStatUsage("PUT_Restaurant")
        const result = await db.accessDB.select(
            "UPDATE Restaurant " +
            `SET RestaurantName = "${restaurantName}", ` + 
            `Description = "${description}" ` + 
            `WHERE RestaurantID = ${id}`
        )

        res.status(204).send({result})
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.delete('/restaurants', auth, async (req, res) => {
    console.log(`DELETE request for deleting a restaurant: ${req.body.id}`)

    try {
        if (!req.body.id) {
            res.status(400).send({ error: "bad request, please check 'id'"})
        }

        await db.accessDB.incrementStatUsage("DELETE_Restaurant")
        const result = await db.accessDB.select(
            "DELETE FROM Restaurant " + 
            `WHERE RestaurantID = ${req.body.id}`
        )

        res.status(204).send({result})
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

module.exports = router
