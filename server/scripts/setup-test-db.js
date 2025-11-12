const mongoose = require('mongoose');
require('dotenv').config();

const setupTestDatabase = async () => {
  try {
    const testDbUri = process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/mern_test';
    
    await mongoose.connect(testDbUri);
    console.log('✅ Test database connected successfully');
    
    // Create indexes if needed
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('📊 Available collections:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('✅ Test database setup complete');
  } catch (error) {
    console.error('❌ Error setting up test database:', error);
    process.exit(1);
  }
};

setupTestDatabase();






