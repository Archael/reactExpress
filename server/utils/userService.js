const axios = require('axios');

exports.fetchUserData = async (childId) => {
  try {
    // Replace with actual API endpoint
    const response = await axios.get(
      `https://api.example.com/users/${childId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};
