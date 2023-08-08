const { MongoClient } = require('mongodb')
const url = "mongodb://localhost:2717"

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
        let jokeData = await coll.findOne();
        callback(jokeData)
    })
}

module.exports = {
    Get: GetJoke
}