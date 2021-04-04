const path = require('path')
const express = require('express')
const reviewRouter = require('./routers/review.js')
const restaurantRouter = require('./routers/restaurant')

// Variable for the current directory is __dirname.
console.log(__dirname)

// Initializes express and sets up the paths.
const app = express()

// Customizes server, automatically parse incoming json into an object
app.use(express.json())

// Sets up environmental variable used for Heroku (port)
const port = process.env.PORT || 3000

// Registers routers, allowing us to refactor routes into separate files
app.use('/api/v1/', restaurantRouter)
app.use('/api/v1/', reviewRouter);

// Starts up the web server.
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
