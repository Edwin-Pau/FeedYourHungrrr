const path = require('path')
const express = require('express')
const userRouter = require('./routers/user.js')
const restaurantRouter = require('./routers/restaurant')
const statRouter = require('./routers/stat')
const itemRouter = require('./routers/item')
const cors = require('cors');

// Variable for the current directory is __dirname.
console.log(__dirname)

// Initializes express and sets up the paths.
const app = express()

app.use(cors());
app.disable('etag');

// Customizes server, automatically parse incoming json into an object
app.use(express.json())

// Sets up environmental variable used for Heroku (port)
const port = process.env.PORT || 3000

// Registers routers, allowing us to refactor routes into separate files
app.use('/api/v1/', restaurantRouter);
app.use('/api/v1/', itemRouter);
app.use('/api/v1/', userRouter);
app.use('/api/v1/', statRouter);

// Starts up the web server.
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
