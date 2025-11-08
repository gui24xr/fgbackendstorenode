import { getDB } from "../database/mongodb.js";


const getStoreConfigDTO = (storeConfig) => {
    const { _id, ...rest } = originalStoreConfig;
    const storeConfigDTO = { id: _id, ...rest };
    return storeConfigDTO;

}
    

export default class StoresConfigsServices {
    static async getStoreConfigs({ ownerId }) {
        try {
            const db = await getDB();
            const storeConfigs = await db.collection('storesconfigs').findOne({ ownerId })
            if (!storeConfigs) return null
            return storeConfigs
        } catch (error) {
            console.log('error en getStoresConfigs', error)
            throw error;
        }
    }
}