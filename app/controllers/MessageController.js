const { TelegramBaseController } = require('telegram-node-bot');

const { MessageService } = require('../services');

const messageService = new MessageService();

class MessageController extends TelegramBaseController {
  async handle($) {
    messageService.handle($);
  }

  async start($) {
    messageService.help($);
  }

  async help($) {
    messageService.help($);
  }

  get routes() {
    return {
      start: 'start',
      help: 'help',
    };
  }
}

module.exports = MessageController;
