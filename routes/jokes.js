const express = require('express')
const dal = require('../jokedata.js')
const router = express.Router()

const get = (req, res) => {
    try {
        dal.Get((joke) => {
            res.json(joke)
        })
    } catch(err) {
        res.sendStatus(500)
    }
}

const patch = (req, res) => {
    try {
        dal.Update(req.body, () => {
            res.sendStatus(200)
        })
    } catch(err) {
        res.sendStatus(500)
    }
}

const post = (req, res) => {
    try {
        dal.Insert(req.body, () => {
            res.sendStatus(200)
        })
    } catch(err) {
        res.sendStatus(500)
    }
}

const remove = (req, res) => {
    try {
        dal.Remove(req.body.id, () => {
            res.sendStatus(200)
        })
    } catch(err) {
        res.sendStatus(500)
    }
}

router.get('/', get)
router.patch('/', patch)
router.put('/', patch)
router.post('/', post)
router.delete('/', remove)

module.exports = router