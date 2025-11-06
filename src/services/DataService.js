
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const loadJSON = (filename) => {
    const p = join(__dirname, '../data', filename)
    return JSON.parse(fs.readFileSync(p, 'utf8'))
}

const ropaData = loadJSON('mock-tiendaropa2.json')
const restaurantData = loadJSON('mock-restaurant.json')
const pizzeriaData = loadJSON('mock-pizzeria2.json')
const techData = loadJSON('mock-tech.json')
const bebidasData = loadJSON('mock-bebidas.json')
const hatsData = loadJSON('mock-hats.json')
const verdurasData = loadJSON('mock-verduleria.json')

const getData = (tenantId) => {
    console.log('tenantId solicitado en getData:', tenantId)
    if(tenantId === 'ropa') return ropaData
    if(tenantId === 'hotdog') return restaurantData
    if(tenantId === 'pizza') return pizzeriaData
    if(tenantId === 'tech') return techData
    if(tenantId === 'bebidas') return bebidasData
    if(tenantId === 'hats') return hatsData
    if(tenantId === 'verduras') return verdurasData
    return ropaData
}

const DataService = {
    
    async getStoreConfigs({tenant}) {
        try{
            const data = getData(tenant || "ropa")
            const storeConfigs= data.store
            return storeConfigs
        }catch(error){
            throw error
        }
        
    },
    async getProductsData({tenant}) {
        try{
            const data = getData(tenant || "ropa")
            const productsData = data.store.products
            const categoriesData = data.store.categories
            const stats = {
                totalProducts: productsData.length
            }
            return {
                products: productsData,
                categories:categoriesData,
                stats: stats
            }
        }catch(error){
            throw error
        }
        
    },

    async getBranches({tenant}) {
        try{
            const data = getData(tenant || "ropa")
            const branches = data.store.branches
            return branches
        }catch(error){
            throw error
        }
    },

    async getBranchById({tenant,branchId}) {
        try{
            const data = getData(tenant || "ropa")
            const foundedBranch = data.store.branches.find(branch => branch.id === branchId)
            return foundedBranch
        }catch(error){
            throw error
        }
       
    },
}


export default DataService