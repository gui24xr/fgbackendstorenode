import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import server from './src/server.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, 'dev.env') })

const PORT = process.env.NODE_ENV === 'production' 
    ? process.env.PORT 
    : process.env.PORT || 8080;

server.listen(PORT,()=>{
    console.log(`Server rodando en PORT ${PORT} en modo ${process.env.NODE_ENV || 'development'}`)
})