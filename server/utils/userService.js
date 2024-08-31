const axios = require('axios');

const USERS_URL =
  'https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json';
const PROFILES_URL =
  'https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json';

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
}

exports.fetchUserData = async (childId) => {
  const [users, profiles] = await Promise.all([
    fetchData(USERS_URL),
    fetchData(PROFILES_URL),
  ]);

  const user = users.find((user) => user.username === childId);
  if (!user) {
    throw new Error('User not registered');
  }

  const profile = profiles.find((profile) => profile.userUid === user.uid);
  if (!profile) {
    throw new Error('User profile not found');
  }

  // Calculate age
  const birthDate = new Date(profile.birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  if (age >= 10) {
    throw new Error('Child is 10 years or older');
  }

  return {
    username: user.username,
    name: profile.name,
    address: profile.address,
    age: age,
  };
};
