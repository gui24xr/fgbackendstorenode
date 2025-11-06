import { DataService } from "../services/index.js";

export default class TenantControllers {
    static getProductsData = async (req, res,next) => {  
        try{
            const tenant = req.query.tenant 
            if(!tenant) throw new Error('tenant is required')
            console.log('endpoint storeconfig pruducts tenant:', tenant)
            const productsData = await DataService.getProductsData({tenant})
            return res.status(200).json(productsData)
        }catch(error){
            return res.status(500).json({error: error.message})
        }
    }

    static getBranches = async (req, res,next) => {
        try{
            const tenant = req.query.tenant 
            if(!tenant) throw new Error('tenant is required')
            const branchesData = await DataService.getBranches({tenant})
            return res.status(200).json(branchesData)
        }catch(error){
            return res.status(500).json({error: error.message})
        }
    }
    
    static getBranchById = async (req, res,next) => {
        try{
            const {id: branchId} = req.params
            const tenant = req.query.tenant
            if(!branchId) throw new Error('branchId is required')
            if(!tenant) throw new Error('tenant is required')
            const branchesData = await DataService.getBranches({tenant,branchId})
            return res.status(200).json(branchesData)
        }catch(error){
            return res.status(500).json({error: error.message})
        }
    }
    
    static getStoreConfigs = async (req, res,next) => {
        try{
            const tenant = req.query.tenant 
            const storeConfigData = await DataService.getStoreConfigs({tenant})
            return res.status(200).json(storeConfigData)
        }catch(error){
            return res.status(500).json({error: error.message})
        }
    }
    
}