import express from 'express'
import { TenantControllers } from '../controllers/index.js';
import { getTenatApiKeys } from '../middlewares/tenats.middlewares.js';


export const router = express.Router()

router.get("/tenants/products", getTenatApiKeys,TenantControllers.getProductsData);
router.get("/tenants/branches",  getTenatApiKeys,TenantControllers.getBranches);
router.get("/tenants/storeconfig", getTenatApiKeys,TenantControllers.getStoreConfigs);
router.get("/tenants/branches/:id", getTenatApiKeys,TenantControllers.getBranchById);