const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/rebirth-of-a-queen', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fixAdminUser = async () => {
  try {
    console.log('🔍 Checking for admin user...');
    
    // Find admin user by email
    const adminUser = await User.findOne({ email: 'admin@rebirthofaqueen.org' });
    
    if (adminUser) {
      console.log('✅ Found admin user:', adminUser.firstName, adminUser.lastName);
      console.log('📧 Email:', adminUser.email);
      console.log('🔑 Current role:', adminUser.role);
      
      // Check if role is already admin
      if (adminUser.role === 'admin') {
        console.log('✅ Admin role is already set correctly');
        console.log('🔑 Password: admin123');
        console.log('📧 Email: admin@rebirthofaqueen.org');
      } else {
        // Update role to admin
        adminUser.role = 'admin';
        await adminUser.save();
        console.log('✅ Updated role to admin');
        console.log('🔑 Password: admin123');
        console.log('📧 Email: admin@rebirthofaqueen.org');
      }
    } else {
      console.log('❌ Admin user not found. Creating new admin user...');
      
      // Create new admin user
      const newAdminUser = new User({
        firstName: 'Rebirth',
        lastName: 'Queen',
        email: 'admin@rebirthofaqueen.org',
        password: 'admin123',
        role: 'admin',
        isActive: true,
        isEmailVerified: true,
        phone: '+254700000000'
      });

      await newAdminUser.save();
      console.log('✅ New admin user created successfully');
      console.log('👤 Name: Rebirth Queen');
      console.log('📧 Email: admin@rebirthofaqueen.org');
      console.log('🔑 Password: admin123');
    }
    
    console.log('\n🎉 Admin credentials ready!');
    console.log('📧 Email: admin@rebirthofaqueen.org');
    console.log('🔑 Password: admin123');
    
  } catch (error) {
    console.error('❌ Error fixing admin user:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

fixAdminUser(); 