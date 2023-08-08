const express = require('express')
const app = express()
const port = 2718

app.use(express.json())

const jokeRoutes = require('./routes/jokes.js')
app.use('/', jokeRoutes);

app.listen(port, () => {
    console.log("Listening at localhost:" + port)
})