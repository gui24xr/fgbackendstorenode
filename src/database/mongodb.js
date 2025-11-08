import { MongoClient } from 'mongodb'


let cachedClient = null;
let cachedDb = null;

async function getDB() {
    if (cachedDb) {
        return cachedDb;
    }

    if (!cachedClient) {
        cachedClient = new MongoClient(process.env.MONGODB_URL);
        await cachedClient.connect();
    }

    cachedDb = cachedClient.db('fgstoretemplates');
    return cachedDb;
}


export {
    getDB
}