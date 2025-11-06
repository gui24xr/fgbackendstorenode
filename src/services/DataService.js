import ropaData from "../data/mock-tiendaropa2.json" assert { type: "json" };
import restaurantData from "../data/mock-restaurant.json" assert { type: "json" };;
import pizzeriaData from "../data/mock-pizzeria2.json" assert { type: "json" };;
import techData from "../data/mock-tech.json" assert { type: "json" };;
import bebidasData from "../data/mock-bebidas.json" assert { type: "json" };;
import hatsData from "../data/mock-hats.json" assert { type: "json" };
import verdurasData from "../data/mock-verduleria.json" assert { type: "json" };

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