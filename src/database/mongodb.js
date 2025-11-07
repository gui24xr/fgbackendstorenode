import { MongoClient } from 'mongodb'



async function getDB() {
    const client = new MongoClient(process.env.MONGODB_URL)
    await client.connect()
    return client.db('commerce24')
}


export {
    
    getDB 
}