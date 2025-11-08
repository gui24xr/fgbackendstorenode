import { getDB } from "../database/mongodb.js";

export default class BranchesServices {

    static async getBranches({ ownerId }) {
        console.log('ownerId en brancheID', ownerId) 
        try {
            const db = await getDB();
            const branches = await db.collection('branches').aggregate([
                 // 1. Filtrar por ownerId
                {$match: { ownerId }},

                 // 3. Renombrar _id a id y categoriesData a categories
                {
                    $addFields: {
                        id: '$_id',                    // _id → id
                    }
                },

                    // 4. Eliminar campos innecesarios
                {
                    $unset: ['_id']
                }
            ]).toArray();

            
            return branches
        } catch (error) {
            console.log('error en getBranches', error)
            throw error;
        }
    }
}