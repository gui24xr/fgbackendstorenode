import { getDB } from "../database/mongodb.js";
export default class ProductsServices{

    static async getProductsDataForTenants({ownerId}){
        try{
            const db = await getDB()
            const products = await db.collection('products').aggregate([
                 // 1. Filtrar por ownerId
                {$match: { ownerId }},

                // 2. Lookup para traer categorías completas
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'categories',      // Array de category codes en products
                        foreignField: 'code',          // code en categories
                        as: 'categoriesData'
                    }
                },

                // 3. Renombrar _id a id y categoriesData a categories
                {
                    $addFields: {
                        id: '$_id',                    // _id → id
                        categories: '$categoriesData'   // categoriesData → categories (reemplaza)
                    }
                },

                // 4. Eliminar campos innecesarios
                {
                    $unset: ['_id', 'categoriesData']
                }

                


            ]).toArray()


            const categoriesData = await this.getCategoriesWithCount({ownerId})

            const stats = {
                totalProducts: products.length
            }
            //Aca transformaria eventualmente a dto
            return {
                products: products,
                categories: categoriesData,
                stats: stats
            }
        }catch(error){
            throw error
        }
    }



  static async getCategoriesWithCount({ownerId}){
        try{
            const db = await getDB()
            const categories = await db.collection('categories').aggregate([
                // 1. Filtrar por ownerId
                {$match: { ownerId }},

                // 2. Lookup para contar productos por categoría
                {
                    $lookup: {
                        from: 'products',
                        let: { categoryCode: '$code' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$ownerId', ownerId] },
                                            { $in: ['$$categoryCode', '$categories'] }
                                        ]
                                    }
                                }
                            },
                            { $count: 'total' }
                        ],
                        as: 'productCount'
                    }
                },

                // 3. Agregar campo count con el total de productos
                {
                    $addFields: {
                        id: '$_id',
                        itemsCount: {
                            $ifNull: [
                                { $arrayElemAt: ['$productCount.total', 0] },
                                0
                            ]
                        }
                    }
                },

                // 4. Eliminar campos innecesarios
                {
                    $unset: ['_id', 'productCount']
                }

            ]).toArray()
            return categories
        }catch(error){
            throw error
        }
    }
}