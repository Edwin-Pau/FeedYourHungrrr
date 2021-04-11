const express = require('express')
const router = new express.Router()
const db = require('../db/sqlDB')
const auth = require('../middleware/auth')

router.get('/items', async (req, res) => {
    try {
        console.log("GET request for all items of a restaurant.")
        let id = req.query.id
        if (!id) {
            throw new Error("Restaurant ID is required to get items.")
        }

        await db.accessDB.incrementStatUsage("GET_Item")
        let rows = await db.accessDB.select(
            "SELECT * FROM Item " + 
            `WHERE RestaurantID = ${id}`
        )
    
        res.status(200).send(rows)
    } catch (error) {
        res.status(401).send({ error: error.message })
    }
})

router.post('/items', auth, async (req, res) => {
    console.log(`POST request for creating a new item: ${req.body.itemName}`)

    try {
        if (!req.body.itemName) {
            throw new Error("The key 'itemName' is required for an item.")
        }

        if (!req.body.itemPrice) {
            throw new Error("The key 'itemPrice' is required for an item.")
        }

        if (!req.body.restaurantID) {
            throw new Error("The key 'restaurantID' is required for an item.")
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
        res.status(401).send({ error: error.message })
    }
})

router.put('/items', auth, async (req, res) => {
    console.log(`PUT request for editing an item: ${req.body.itemName}`)

    try {
        if (!req.body.itemName) {
            throw new Error("The key 'itemName' is required for updating an item.")
        }

        if (!req.body.itemPrice) {
            throw new Error("The key 'itemPrice' is required for updating an item.")
        }

        if (!req.body.itemID) {
            throw new Error("The key 'itemID' is required for updating an item.")
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

        res.status(201).send({result})
    } catch (error) {
        res.status(401).send({ error: error.message })
    }
})

router.delete('/items', auth, async (req, res) => {
    console.log(`DELETE request for deleting an item: ${req.body.itemID}`)

    try {
        if (!req.body.itemID) {
            throw new Error("The key 'itemID' is required for an item.")
        }

        await db.accessDB.incrementStatUsage("DELETE_Item")
        const result = await db.accessDB.select(
            "DELETE FROM Item " + 
            `WHERE ItemID = ${req.body.itemID}`
        )

        res.status(201).send({result})
    } catch (error) {
        res.status(401).send({ error: error.message })
    }
})

module.exports = router
