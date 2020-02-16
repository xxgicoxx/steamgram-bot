const { TelegramBaseController } = require('telegram-node-bot');

const { PlayerService } = require('../services');

const playerService = new PlayerService();

class PlayerController extends TelegramBaseController {
  async add($) {
    playerService.add($);
  }

  async remove($) {
    playerService.remove($);
  }

  async list($) {
    playerService.list($);
  }

  async checkChanges($) {
    playerService.checkChanges($);
  }

  get routes() {
    return {
      add: 'add',
      remove: 'remove',
      list: 'list',
    };
  }
}

module.exports = PlayerController;
