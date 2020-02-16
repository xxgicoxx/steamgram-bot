class MessageService {
  async handle($) {
    try {
      const message = 'Command not found';

      $.sendMessage(message);
    } catch (ex) {
      console.error(ex);

      $.sendMessage('Error, try again later');
    }
  }

  async help($) {
    try {
      const message = 'I can help you follow Steam players.\n\nYou can control me by sending these commands:\n\n1. /add - add Steam ID e.g: /add [Steam ID] [App ID]\n2. /remove - remove Steam ID e.g: /remove [Steam ID] [App ID]\n3. /list - list Steam IDs\n4. /help - command list';

      $.sendMessage(message);
    } catch (ex) {
      console.error(ex);

      $.sendMessage('Error, try again later');
    }
  }
}

module.exports = MessageService;
