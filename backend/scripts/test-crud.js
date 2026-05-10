const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
let authToken = '';

async function getAuthToken() {
  if (!authToken) {
    try {
      const loginRes = await axios.post(`${API_URL}/auth/login`, {
        email: 'demo@traveloop.com',
        password: 'password123'
      });
      authToken = loginRes.data.data.tokens.accessToken;
      console.log('🔑 Auth token obtained');
    } catch (err) {
      console.error('Failed to get auth token:', err.message);
      process.exit(1);
    }
  }
  return authToken;
}

async function testCRUD() {
  console.log('🧪 Testing CRUD Operations...');
  
  try {
    // Get auth token
    const token = await getAuthToken();
    const headers = { 'Authorization': `Bearer ${token}` };

    // Test Trips CRUD
    console.log('\n📅 Testing Trips CRUD...');
    
    // Create trip
    const tripData = {
      title: 'Test Trip',
      destination: 'Test City',
      country: 'Test Country',
      tripType: 'DOMESTIC',
      category: 'LEISURE',
      startDate: '2024-12-01',
      endDate: '2024-12-05',
      duration: 5,
      budget: 15000,
      currency: 'INR',
      travelers: 2
    };
    
    const createTripRes = await axios.post(`${API_URL}/trips`, tripData, { headers });
    const tripId = createTripRes.data.data.id;
    console.log('✅ Trip created:', tripId);
    
    // Read trip
    const getTripRes = await axios.get(`${API_URL}/trips/${tripId}`, { headers });
    console.log('✅ Trip retrieved:', getTripRes.data.data.title);
    
    // Update trip
    const updateData = { title: 'Updated Test Trip' };
    await axios.put(`${API_URL}/trips/${tripId}`, updateData, { headers });
    console.log('✅ Trip updated');
    
    // Delete trip
    await axios.delete(`${API_URL}/trips/${tripId}`, { headers });
    console.log('✅ Trip deleted');

    // Test Expenses CRUD
    console.log('\n💰 Testing Expenses CRUD...');
    
    const expenseData = {
      category: 'HOTELS',
      description: 'Test Hotel Booking',
      amount: 5000,
      currency: 'INR',
      date: new Date().toISOString(),
      paidBy: 'Test User'
    };
    
    const createExpenseRes = await axios.post(`${API_URL}/expenses`, expenseData, { headers });
    const expenseId = createExpenseRes.data.data.id;
    console.log('✅ Expense created:', expenseId);
    
    const getExpenseRes = await axios.get(`${API_URL}/expenses`, { headers });
    console.log('✅ Expenses retrieved:', getExpenseRes.data.data.expenses.length, 'items');
    
    await axios.put(`${API_URL}/expenses/${expenseId}`, { description: 'Updated Expense' }, { headers });
    console.log('✅ Expense updated');
    
    await axios.delete(`${API_URL}/expenses/${expenseId}`, { headers });
    console.log('✅ Expense deleted');

    // Test Packing CRUD
    console.log('\n🎒 Testing Packing CRUD...');
    
    const packingData = {
      name: 'Test Packing Item',
      category: 'clothing',
      quantity: 1
    };
    
    const createPackingRes = await axios.post(`${API_URL}/packing`, packingData, { headers });
    const packingId = createPackingRes.data.data.id;
    console.log('✅ Packing item created:', packingId);
    
    await axios.patch(`${API_URL}/packing/${packingId}/toggle`, {}, { headers });
    console.log('✅ Packing item toggled');
    
    await axios.delete(`${API_URL}/packing/${packingId}`, { headers });
    console.log('✅ Packing item deleted');

    // Test Journal CRUD
    console.log('\n📔 Testing Journal CRUD...');
    
    const journalData = {
      title: 'Test Journal Entry',
      content: 'This is a test journal entry',
      destination: 'Test Destination',
      mood: 'excited',
      tripType: 'adventure',
      rating: 5
    };
    
    const createJournalRes = await axios.post(`${API_URL}/journal`, journalData, { headers });
    const journalId = createJournalRes.data.data.id;
    console.log('✅ Journal entry created:', journalId);
    
    await axios.put(`${API_URL}/journal/${journalId}`, { title: 'Updated Journal Entry' }, { headers });
    console.log('✅ Journal entry updated');
    
    await axios.delete(`${API_URL}/journal/${journalId}`, { headers });
    console.log('✅ Journal entry deleted');

    console.log('\n🎉 All CRUD operations completed successfully!');
    
  } catch (error) {
    console.error('❌ CRUD test failed:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('🔑 Authentication failed - check backend server is running');
    }
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Ensure backend server is running: npm run dev');
      console.log('2. Check port 5000 is available');
      console.log('3. Verify PostgreSQL is running');
    }
    
    process.exit(1);
  }
}

if (require.main === module) {
  testCRUD();
}

module.exports = { testCRUD };
