const { TelegramBaseController } = require('telegram-node-bot');

const { AppService } = require('../services');

const appService = new AppService();

class PlayerController extends TelegramBaseController {
  async search($) {
    appService.search($);
  }

  async getAppList() {
    appService.getAppList();
  }

  get routes() {
    return {
      search: 'search',
    };
  }
}

module.exports = PlayerController;
