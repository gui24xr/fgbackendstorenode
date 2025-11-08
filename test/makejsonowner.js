import { ProductsServices, BranchesServices, StoresConfigsServices } from "../src/services/index.js";
import fs from 'fs';



async function makeJsonOwner(ownerId) {
 
    try{
        const productsData = await ProductsServices.getProductsDataForTenants({ ownerId });
        const categoriesData = await ProductsServices.getCategoriesWithCount({ ownerId });
        const branchesData = await BranchesServices.getBranches({ ownerId} );
        const storeConfigs = await StoresConfigsServices.getStoreConfigs({ ownerId });

    const data = {
        ...storeConfigs,
        branches: branchesData,
        categories: categoriesData,
        products: productsData.products,
        
    }

    const JSONData = JSON.stringify(data, null, 2);
    fs.writeFileSync(`./src/data/mock-${ownerId}.json`, JSONData);
    return JSONData
    }catch(error){
        console.log('error en makeJsonOwner', error)
        throw error
    }
 

}

export default makeJsonOwner