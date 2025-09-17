const axios = require('axios');
require('dotenv').config();

async function testShopProducts() {
  console.log('🛍️ Testing Shop Products...\n');

  try {
    // Test 1: Check server health
    console.log('1️⃣ Checking Server Health...');
    const healthResponse = await axios.get('http://localhost:5000/api/health');
    console.log('   ✅ Server Status:', healthResponse.data.message);

    // Test 2: Fetch products
    console.log('\n2️⃣ Fetching Products...');
    const productsResponse = await axios.get('http://localhost:5000/api/shop/products');
    
    if (productsResponse.data.success) {
      const products = productsResponse.data.data;
      console.log('   ✅ Products fetched successfully');
      console.log(`   📊 Total Products: ${products.length}`);
      
      if (products.length > 0) {
        console.log('\n3️⃣ Product Details:');
        products.forEach((product, index) => {
          console.log(`   Product ${index + 1}:`);
          console.log(`     Name: ${product.name}`);
          console.log(`     Category: ${product.category}`);
          console.log(`     Price: ${product.price}`);
          console.log(`     Status: ${product.status}`);
          console.log(`     Featured: ${product.isFeatured ? 'Yes' : 'No'}`);
          console.log(`     On Sale: ${product.isOnSale ? 'Yes' : 'No'}`);
          console.log(`     Images: ${product.images?.length || 0}`);
          console.log('');
        });
        
        // Count featured and sale products
        const featuredProducts = products.filter(p => p.isFeatured);
        const saleProducts = products.filter(p => p.isOnSale);
        const activeProducts = products.filter(p => p.status === 'active');
        
        console.log('4️⃣ Product Summary:');
        console.log(`   🔥 Featured Products: ${featuredProducts.length}`);
        console.log(`   🎉 Sale Products: ${saleProducts.length}`);
        console.log(`   ✅ Active Products: ${activeProducts.length}`);
        console.log(`   📦 Total Products: ${products.length}`);
        
      } else {
        console.log('   ⚠️ No products found in database');
        console.log('   💡 Create some products in the admin panel first');
      }
    } else {
      console.log('   ❌ Failed to fetch products');
    }

    console.log('\n🎉 Shop Products Test Completed!');

  } catch (error) {
    console.error('❌ Test Failed:', error.message);
    
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
  }
}

testShopProducts();
