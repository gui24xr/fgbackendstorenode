import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import server from './src/server.js'
import { getDB } from './src/database/mongodb.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, 'dev.env') })

const PORT = process.env.NODE_ENV === 'production' 
    ? process.env.PORT 
    : process.env.PORT || 8080;

const db = await getDB()

const datos = await db.collection('products').find({}).toArray()

console.log(datos)

server.listen(PORT,()=>{
    console.log(`Server rodando en PORT ${PORT} en modo ${process.env.NODE_ENV || 'development'}`)
})