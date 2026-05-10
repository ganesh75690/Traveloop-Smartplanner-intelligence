const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testAuthentication() {
  console.log('🔐 Testing Authentication System...');
  
  try {
    // Test registration
    console.log('\n📝 Testing user registration...');
    const registerData = {
      email: 'testuser@traveloop.com',
      password: 'TestPass123',
      name: 'Test User'
    };
    
    const registerRes = await axios.post(`${API_URL}/auth/register`, registerData);
    console.log('✅ Registration successful');
    console.log('User ID:', registerRes.data.data.user.id);
    
    // Test login
    console.log('\n🔑 Testing user login...');
    const loginData = {
      email: 'testuser@traveloop.com',
      password: 'TestPass123'
    };
    
    const loginRes = await axios.post(`${API_URL}/auth/login`, loginData);
    console.log('✅ Login successful');
    console.log('Access Token:', loginRes.data.data.tokens.accessToken.substring(0, 20) + '...');
    
    // Test protected route with token
    console.log('\n🛡️ Testing protected route access...');
    const token = loginRes.data.data.tokens.accessToken;
    const meRes = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Protected route access successful');
    console.log('User:', meRes.data.data.user.name);
    
    // Test token refresh
    console.log('\n🔄 Testing token refresh...');
    const refreshToken = loginRes.data.data.tokens.refreshToken;
    const refreshRes = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
    console.log('✅ Token refresh successful');
    
    // Test logout
    console.log('\n🚪 Testing logout...');
    await axios.post(`${API_URL}/auth/logout`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Logout successful');
    
    console.log('\n🎉 Authentication system test completed successfully!');
    
  } catch (error) {
    console.error('❌ Authentication test failed:', error.response?.data || error.message);
    
    if (error.response?.status === 409) {
      console.log('ℹ️ User already exists - this is expected for repeated tests');
    }
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Ensure backend server is running on port 5000');
      console.log('2. Run: npm run dev (from backend directory)');
    }
    
    process.exit(1);
  }
}

if (require.main === module) {
  testAuthentication();
}

module.exports = { testAuthentication };
