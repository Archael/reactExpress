const { fetchUserData } = require('../utils/userService');
const Message = require('../models/Message');

exports.submitMessage = async (req, res) => {
  const { childId, message } = req.body;

  try {
    const userData = await fetchUserData(childId);

    if (!userData) {
      return res.status(404).json({ error: 'Child not registered' });
    }

    if (userData.age >= 10) {
      return res.status(400).json({ error: 'Child is too old' });
    }

    const newMessage = new Message({
      childId,
      username: userData.username,
      address: userData.address,
      message,
    });

    await newMessage.save();

    res.status(200).json({ message: 'Message received successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
