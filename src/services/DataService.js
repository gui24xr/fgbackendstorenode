
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

import { ProductsServices, BranchesServices, StoresConfigsServices } from "../services/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loadJSON = (filename) => {
  const p = join(__dirname, "../data", filename);
  return JSON.parse(fs.readFileSync(p, "utf8"));
};

/*

const ropaData = loadJSON("mock-tiendaropa.json");
const restaurantData = loadJSON("mock-restaurant.json");
const pizzeriaData = loadJSON("mock-pizzeria.json");
const techData = loadJSON("mock-tech.json");
const bebidasData = loadJSON("mock-bebidas.json");
const hatsData = loadJSON("mock-hats.json");
const verdurasData = loadJSON("mock-verduleria.json");

const getData = (tenantId) => {
  console.log("tenantId solicitado en getData:", tenantId);
  if (tenantId === "tiendaropa") return ropaData;
  if (tenantId === "hotdog") return restaurantData;
  if (tenantId === "pizzeria") return pizzeriaData;
  if (tenantId === "tech") return techData;
  if (tenantId === "bebidas") return bebidasData;
  if (tenantId === "hats") return hatsData;
  if (tenantId === "verduras") return verdurasData;
  return ropaData;
};

*/
const DataService = {
  tenants: {
    async getStoreConfigs({ ownerId }) {
      try {       
        const storeConfigs = await StoresConfigsServices.getStoreConfigs({ ownerId });
        return storeConfigs;
      } catch (error) {
        console.log('error en getStoreConfigsdataservice', error)
        throw error;
      }
    },

   
    async getProductsData({ ownerId }) {
        try {
            const productsData = await ProductsServices.getProductsDataForTenants({ownerId});
            return productsData;
        } catch (error) {
            console.log('error en getProductsData', error)
            throw error;
        }
    },

    async getBranches({ ownerId }) {
      try {
        const branches = await BranchesServices.getBranches({ ownerId });
        return branches;
      } catch (error) {
        throw error;
      }
    },

    async getBranchById({ ownerId, branchId }) {
      try {
        const branches = await BranchesServices.getBranches({ ownerId });
        const foundedBranch = branches.find((branch) => branch.id === branchId);
        return foundedBranch;
      } catch (error) {
        throw error;
      }
    },
  },
};
   




export default DataService;

/*


const DataService = {
    
    async getStoreConfigs({ownerId}) {
        try{
            console.log('Tenant en server', ownerId)
            const data = getData(ownerId || "tiendaropa")
            const storeConfigs= data.store
            return storeConfigs
        }catch(error){
            throw error
        }
        
    },
    async getProductsData({tenant: ownerId}) {
        try{
            const data = getData(ownerId || "ropa")

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

    

    async getBranches({ownerId}) {
        try{
            const data = getData(ownerId || "ropa")
            const branches = data.store.branches
            return branches
        }catch(error){
            throw error
        }
    },

    async getBranchById({ownerId,branchId}) {
        try{
            const data = getData(ownerId || "ropa")
            const foundedBranch = data.store.branches.find(branch => branch.id === branchId)
            return foundedBranch
        }catch(error){
            throw error
        }
       
    },
}

*/
