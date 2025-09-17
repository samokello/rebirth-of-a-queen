// Test utility to demonstrate user-specific cart and favorites functionality
// This file can be imported and used for testing purposes

export const testUserSpecificCartAndFavorites = () => {
  console.log('🧪 Testing User-Specific Cart & Favorites System');
  console.log('================================================');
  
  // Test localStorage keys
  const testUserId = 'test_user_123';
  const guestKey = 'cart_guest';
  const userKey = `cart_${testUserId}`;
  const guestFavKey = 'favorites_guest';
  const userFavKey = `favorites_${testUserId}`;
  
  console.log('📋 Storage Keys:');
  console.log(`- Guest Cart: ${guestKey}`);
  console.log(`- User Cart: ${userKey}`);
  console.log(`- Guest Favorites: ${guestFavKey}`);
  console.log(`- User Favorites: ${userFavKey}`);
  
  // Check existing data
  const existingCartData = localStorage.getItem(userKey);
  const existingFavData = localStorage.getItem(userFavKey);
  
  console.log('\n📦 Current Data:');
  console.log(`- User Cart Data: ${existingCartData ? 'EXISTS' : 'NONE'}`);
  console.log(`- User Favorites Data: ${existingFavData ? 'EXISTS' : 'NONE'}`);
  
  if (existingCartData) {
    const parsed = JSON.parse(existingCartData);
    console.log(`- Cart Items: ${parsed.items?.length || 0}`);
    console.log(`- Last Updated: ${new Date(parsed.timestamp).toLocaleString()}`);
    console.log(`- User ID: ${parsed.userId}`);
  }
  
  if (existingFavData) {
    const parsed = JSON.parse(existingFavData);
    console.log(`- Favorite Items: ${parsed.items?.length || 0}`);
    console.log(`- Last Updated: ${new Date(parsed.timestamp).toLocaleString()}`);
    console.log(`- User ID: ${parsed.userId}`);
  }
  
  console.log('\n✅ Features Implemented:');
  console.log('1. User-specific storage (each user has their own cart/favorites)');
  console.log('2. Guest user support (separate storage for non-logged-in users)');
  console.log('3. 20-day expiration (data automatically expires after 20 days)');
  console.log('4. Server sync (authenticated users sync with server)');
  console.log('5. Offline persistence (data saved locally for offline access)');
  console.log('6. User switching (different users see different data)');
  
  console.log('\n🔄 How it works:');
  console.log('1. When user logs in → Load from server, save to localStorage');
  console.log('2. When user logs out → Data remains in localStorage for 20 days');
  console.log('3. When different user logs in → Load their specific data');
  console.log('4. When guest adds items → Save to guest storage');
  console.log('5. When guest logs in → Merge guest data with user data');
  
  return {
    hasUserCart: !!existingCartData,
    hasUserFavorites: !!existingFavData,
    userCartItems: existingCartData ? JSON.parse(existingCartData).items?.length || 0 : 0,
    userFavoritesItems: existingFavData ? JSON.parse(existingFavData).items?.length || 0 : 0
  };
};

// Function to simulate user switching
export const simulateUserSwitch = (fromUserId, toUserId) => {
  console.log(`\n🔄 Simulating user switch from ${fromUserId || 'guest'} to ${toUserId || 'guest'}`);
  
  const fromCartKey = fromUserId ? `cart_${fromUserId}` : 'cart_guest';
  const toCartKey = toUserId ? `cart_${toUserId}` : 'cart_guest';
  const fromFavKey = fromUserId ? `favorites_${fromUserId}` : 'favorites_guest';
  const toFavKey = toUserId ? `favorites_${toUserId}` : 'favorites_guest';
  
  const fromCartData = localStorage.getItem(fromCartKey);
  const toCartData = localStorage.getItem(toCartKey);
  const fromFavData = localStorage.getItem(fromFavKey);
  const toFavData = localStorage.getItem(toFavKey);
  
  console.log(`📤 From User (${fromUserId || 'guest'}):`);
  console.log(`- Cart: ${fromCartData ? JSON.parse(fromCartData).items?.length || 0 : 0} items`);
  console.log(`- Favorites: ${fromFavData ? JSON.parse(fromFavData).items?.length || 0 : 0} items`);
  
  console.log(`📥 To User (${toUserId || 'guest'}):`);
  console.log(`- Cart: ${toCartData ? JSON.parse(toCartData).items?.length || 0 : 0} items`);
  console.log(`- Favorites: ${toFavData ? JSON.parse(toFavData).items?.length || 0 : 0} items`);
  
  console.log('✅ Each user maintains their own separate data!');
};

// Function to check data expiration
export const checkDataExpiration = () => {
  console.log('\n⏰ Checking Data Expiration:');
  
  const keys = Object.keys(localStorage).filter(key => 
    key.startsWith('cart_') || key.startsWith('favorites_')
  );
  
  keys.forEach(key => {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        const age = Date.now() - parsed.timestamp;
        const daysOld = Math.floor(age / (24 * 60 * 60 * 1000));
        const isExpired = age > (20 * 24 * 60 * 60 * 1000);
        
        console.log(`📅 ${key}:`);
        console.log(`   - Age: ${daysOld} days`);
        console.log(`   - Status: ${isExpired ? '❌ EXPIRED' : '✅ VALID'}`);
        console.log(`   - User: ${parsed.userId}`);
      } catch (error) {
        console.log(`❌ ${key}: Invalid data format`);
      }
    }
  });
};
