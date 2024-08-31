let messages = [];

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
    messages.push(this);
  }

  static async findPendingMessages() {
    return messages.filter((msg) => !msg.sent);
  }

  static async markAsSent(messageIds) {
    messages = messages.map((msg) =>
      messageIds.includes(msg.childId) ? { ...msg, sent: true } : msg
    );
  }
}

module.exports = Message;
