const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function setupDatabase() {
  console.log('🔧 Setting up Traveloop database...');
  
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    // Check if tables exist
    const userCount = await prisma.user.count();
    console.log(`📊 Found ${userCount} users in database`);

    // Create sample data if database is empty
    if (userCount === 0) {
      console.log('🌱 Creating sample data...');
      
      // Create sample user
      const hashedPassword = await bcrypt.hash('password123', 12);
      const sampleUser = await prisma.user.create({
        data: {
          email: 'demo@traveloop.com',
          password: hashedPassword,
          name: 'Demo User',
          role: 'USER',
          profile: {
            create: {
              bio: 'Demo user for testing Traveloop application',
              city: 'Mumbai',
              country: 'India'
            }
          },
          preferences: {
            create: {
              language: 'en',
              currency: 'INR',
              darkMode: false,
              notifications: true,
              emailAlerts: true
            }
          }
        },
        include: {
          profile: true,
          preferences: true
        }
      });

      console.log('👤 Created sample user:', sampleUser.email);

      // Create sample trip
      const sampleTrip = await prisma.trip.create({
        data: {
          userId: sampleUser.id,
          title: 'Goa Beach Vacation',
          description: 'A relaxing beach vacation to Goa',
          destination: 'Goa',
          country: 'India',
          tripType: 'DOMESTIC',
          category: 'LEISURE',
          startDate: new Date('2024-12-01'),
          endDate: new Date('2024-12-07'),
          duration: 7,
          budget: 25000,
          currency: 'INR',
          travelers: 2,
          status: 'PLANNING',
          coverImage: 'https://images.unsplash.com/photo-1516426188111-0acd9e66f9a1?w=600&q=80'
        }
      });

      console.log('✈️ Created sample trip:', sampleTrip.title);

      // Create sample expense
      await prisma.expense.create({
        data: {
          userId: sampleUser.id,
          tripId: sampleTrip.id,
          category: 'HOTELS',
          description: 'Beach Resort Booking',
          amount: 8000,
          currency: 'INR',
          date: new Date(),
          paidBy: sampleUser.name
        }
      });

      console.log('💰 Created sample expense');

      // Create sample packing item
      await prisma.packingItem.create({
        data: {
          userId: sampleUser.id,
          tripId: sampleTrip.id,
          name: 'Sunscreen SPF 50',
          category: 'toiletries',
          isPacked: false,
          isAISuggested: true,
          quantity: 1
        }
      });

      console.log('🎒 Created sample packing item');

      // Create sample journal entry
      await prisma.journalEntry.create({
        data: {
          userId: sampleUser.id,
          tripId: sampleTrip.id,
          title: 'First Day in Paradise',
          content: 'Arrived in Goa today! The beaches are amazing and the weather is perfect. Checked into our beachside resort and spent the afternoon swimming in the Arabian Sea.',
          destination: 'Goa',
          date: new Date(),
          mood: 'excited',
          tripType: 'beach',
          rating: 5,
          isPublic: false
        }
      });

      console.log('📔 Created sample journal entry');

      console.log('🎉 Sample data created successfully!');
      console.log('\n📝 Login Credentials:');
      console.log('   Email: demo@traveloop.com');
      console.log('   Password: password123');
      console.log('\n⚠️  Remember to change these credentials in production!');
    }

    console.log('✅ Database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  setupDatabase();
}

module.exports = { setupDatabase };
