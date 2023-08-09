const { MongoClient } = require('mongodb')
const url = "mongodb://localhost:2717"

/*
 * Reference for joke dataset:
 * Title: A dataset of English plaintext jokes.
 * URL: https://github.com/taivop/joke-dataset
 * Author: Taivo Pungas
 * Year: 2017
 * Publisher: GitHub
 * Journal: GitHub repository
 */

const getMongoClient = async (query) => {
    const client = new MongoClient(url)
    try {
        await query(client)
    }
    catch(err) {
        console.log(err)
    }
    finally {
        await client.close()
    }
}

const GetJoke = async (callback) => {
    getMongoClient(async (client) => {
        const database = client.db('jokesdb')
        const coll = database.collection('jokes')
        let aggCursor = await coll.aggregate([{$sample:{size:1}}])
        for await (const doc of aggCursor) {
            callback(doc)
        }
    })
}

const UpdateJoke = async (updatedJoke, callback) => {
    getMongoClient(async (client) => {
        const database = client.db('jokesdb')
        const coll = database.collection('jokes')
        await coll.updateOne(
            { id: updatedJoke.id },
            { $set: { 
                    title: updatedJoke.title, 
                    category: updatedJoke.category,
                    body: updatedJoke.body
                }
            })
        callback()
    })
}

const InsertJoke = async (newJoke, callback) => {
    getMongoClient(async (client) => {
        const database = client.db('jokesdb')
        const coll = database.collection('jokes')
        await coll.insertOne(newJoke)
        callback()
    })
}

const RemoveJoke = async (jokeId, callback) => {
    getMongoClient(async (client) => {
        const database = client.db('jokesdb')
        const coll = database.collection('jokes')
        await coll.deleteOne({ id: jokeId })
        callback()
    })
}

module.exports = {
    Get: GetJoke,
    Update: UpdateJoke,
    Insert: InsertJoke,
    Remove: RemoveJoke
}