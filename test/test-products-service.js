import ProductsServices from '../src/services/ProductsService.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar variables de entorno
dotenv.config({ path: join(__dirname, '../dev.env') });

async function testGetProductsDataForTenants() {
    console.log('🧪 Testing getProductsDataForTenants...\n');

    const testCases = [
        { ownerId: 'tiendaropa', description: 'Tienda de Ropa' },
        { ownerId: 'hotdog', description: 'Hot Dog Restaurant' },
        { ownerId: 'pizzeria', description: 'Pizzeria' },
        { ownerId: 'tech', description: 'Tech Store' },
        { ownerId: 'bebidas', description: 'Bebidas Store' },
        { ownerId: 'hats', description: 'Hats Store' },
        { ownerId: 'verduras', description: 'Verduras Store' }
    ];

    const productsService = new ProductsServices();

    for (const testCase of testCases) {
        try {
            console.log(`\n📦 Testing ${testCase.description} (ownerId: ${testCase.ownerId})`);
            console.log('─'.repeat(60));

            const result = await productsService.getProductsDataForTenants({
                ownerId: testCase.ownerId
            });

            console.log(`✅ Success! Found ${result.length || 0} products`);

            if (result.length > 0) {
                console.log('\n📄 First product sample:');
                const sample = result[0];
                console.log(JSON.stringify({
                    code: sample.code,
                    name: sample.name,
                    categories: sample.categories,
                    ownerId: sample.ownerId
                }, null, 2));
            }

        } catch (error) {
            console.error(`❌ Error testing ${testCase.ownerId}:`, error.message);
        }
    }

    console.log('\n\n🏁 Test completed!');
    process.exit(0);
}

// Ejecutar test
testGetProductsDataForTenants().catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
});