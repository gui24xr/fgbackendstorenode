import express from 'express'
import { TenantControllers } from '../controllers/index.js';
import { checkTenantAndAuth } from '../middlewares/tenats.middlewares.js';


const tenantRouter = express.Router()

tenantRouter.get("/tenants/products", checkTenantAndAuth,TenantControllers.getProductsData);
tenantRouter.get("/tenants/branches",  checkTenantAndAuth,TenantControllers.getBranches);
tenantRouter.get("/tenants/storeconfig", checkTenantAndAuth,TenantControllers.getStoreConfigs);
tenantRouter.get("/tenants/branches/:id", checkTenantAndAuth,TenantControllers.getBranchById);

export default tenantRouter