class Message {
  constructor({ childId, username, address, message }) {
    this.childId = childId;
    this.username = username;
    this.address = address;
    this.message = message;
    this.timestamp = new Date();
    this.sent = false;
  }

  async save() {
    // In a real application, this would save to a database
    console.log('Saving message:', this);
  }

  static async findPendingMessages() {
    // In a real application, this would query the database
    // For now, we'll return a mock pending message
    return [
      {
        username: 'charlie.brown',
        address: '219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo',
        message: 'Dear Santa, I would like a new kite for Christmas.',
      },
    ];
  }
}

module.exports = Message;
