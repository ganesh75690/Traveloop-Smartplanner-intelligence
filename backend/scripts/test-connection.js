const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  console.log('🔍 Testing PostgreSQL connection...');
  
  try {
    // Test basic connection
    await prisma.$connect();
    console.log('✅ PostgreSQL connection successful');

    // Test database operations
    const userCount = await prisma.user.count();
    console.log(`📊 Database contains ${userCount} users`);

    const tripCount = await prisma.trip.count();
    console.log(`📊 Database contains ${tripCount} trips`);

    // Test schema integrity
    const tables = ['user', 'trip', 'expense', 'packingItem', 'journalEntry', 'communityPost'];
    console.log('🔎 Checking table existence...');
    
    for (const table of tables) {
      try {
        const count = await prisma[table.toLowerCase()].count();
        console.log(`   ✅ ${table}: ${count} records`);
      } catch (err) {
        console.log(`   ❌ ${table}: ${err.message}`);
      }
    }

    console.log('✅ Database connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ Database connection test failed:', error.message);
    
    if (error.message.includes('database') || error.message.includes('connection')) {
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Ensure PostgreSQL is running locally');
      console.log('2. Check DATABASE_URL in .env file');
      console.log('3. Verify database "traveloop" exists');
      console.log('4. Check PostgreSQL credentials');
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  testConnection();
}

module.exports = { testConnection };
