const express = require('express')
const dal = require('../jokedata.js')
const router = express.Router()

const get = (req, res) => {
    res.json({
        'joke': true,
        'punchline': 'your mother'
    })
}

router.get('/', get)
// router.patch('/', patch)

module.exports = router