import express from 'express'
import { TenantControllers } from '../controllers/index.js';
import { getTenatApiKeys } from '../middlewares/tenats.middlewares.js';


export const router = express.Router()

router.get("/products", getTenatApiKeys,TenantControllers.getProductsData);
router.get("/branches",  getTenatApiKeys,TenantControllers.getBranches);
router.get("/storeconfig", getTenatApiKeys,TenantControllers.getStoreConfigs);
router.get("/branches/:id", getTenatApiKeys,TenantControllers.getBranchById);