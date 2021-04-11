const express = require('express')
const router = new express.Router()
const db = require('../db/sqlDB')
const auth = require('../middleware/auth')

router.get('/items', async (req, res) => {
    try {
        console.log("GET request for all items of a restaurant.")
        let id = req.query.id
        if (!id) {
            res.status(400).send({ error: "bad request, please check 'id'."})
        }

        await db.accessDB.incrementStatUsage("GET_Item")
        let rows = await db.accessDB.select(
            "SELECT * FROM Item " + 
            `WHERE RestaurantID = ${id}`
        )
    
        res.status(200).send(rows)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.post('/items', auth, async (req, res) => {
    console.log(`POST request for creating a new item: ${req.body.itemName}`)

    try {
        if (!req.body.itemName) {
            res.status(400).send({ error: "bad request, please check 'itemName'"})
        }

        if (!req.body.itemPrice) {
            res.status(400).send({ error: "bad request, please check 'itemPrice'"})
        }

        if (!req.body.restaurantID) {
            res.status(400).send({ error: "bad request, please check 'restaurantID'"})
        }

        let itemName = req.body.itemName;
        let itemPrice = req.body.itemPrice.toFixed(2);
        let restaurantID = req.body.restaurantID

        await db.accessDB.incrementStatUsage("POST_Item")
        const result = await db.accessDB.insert(
            "Item", 
            "ItemName, ItemPrice, RestaurantID",
            `'${itemName}', ${itemPrice}, '${restaurantID}'`
        )

        res.status(201).send(result)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.put('/items', auth, async (req, res) => {
    console.log(`PUT request for editing an item: ${req.body.itemName}`)

    try {
        if (!req.body.itemName) {
            res.status(400).send({ error: "bad request, please check 'itemName'"})
        }

        if (!req.body.itemPrice) {
            res.status(400).send({ error: "bad request, please check 'itemPrice'"})
        }

        if (!req.body.itemID) {
            res.status(400).send({ error: "bad request, please check 'itemID'"})
        }

        let itemName = req.body.itemName;
        let itemPrice = req.body.itemPrice.toFixed(2);
        let itemID = req.body.itemID

        await db.accessDB.incrementStatUsage("PUT_Item")
        const result = await db.accessDB.select(
            "UPDATE Item " +
            `SET ItemName = "${itemName}", ` + 
            `ItemPrice = ${itemPrice} ` + 
            `WHERE ItemID = ${itemID}`
        )

        res.status(204).send({result})
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.delete('/items', auth, async (req, res) => {
    console.log(`DELETE request for deleting an item: ${req.body.itemID}`)

    try {
        if (!req.body.itemID) {
            res.status(400).send({ error: "bad request, please check 'itemID'"})
        }

        await db.accessDB.incrementStatUsage("DELETE_Item")
        const result = await db.accessDB.select(
            "DELETE FROM Item " + 
            `WHERE ItemID = ${req.body.itemID}`
        )

        res.status(204).send({result})
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

module.exports = router
