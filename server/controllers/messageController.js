const { fetchUserData } = require('../utils/userService');
const Message = require('../models/Message');

exports.submitMessage = async (req, res) => {
  const { childId, message } = req.body;

  try {
    const userData = await fetchUserData(childId);

    const newMessage = new Message({
      childId: userData.username,
      username: userData.name,
      address: userData.address,
      message,
    });

    await newMessage.save();

    res.status(200).json({ message: 'Message received successfully' });
  } catch (error) {
    if (
      error.message === 'User not registered' ||
      error.message === 'Child is 10 years or older'
    ) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Error in submitMessage:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};
