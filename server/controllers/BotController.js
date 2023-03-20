const { telegramConfig } = require('../configs');
const { constants } = require('../utils');

const {
  AppService,
  HelpService,
  PlayerService,
} = require('../services');

const appService = new AppService();
const helpService = new HelpService();
const playerService = new PlayerService();

class BotController {
  constructor(bot) {
    this.bot = bot;
  }

  async handle() {
    try {
      this.bot.on(constants.ON_MESSAGE, async ($) => {
        const command = $.text ? $.text.replace(telegramConfig.username, '') : $.text;

        switch (command) {
          case constants.COMMAND_START:
          case constants.COMMAND_COMMANDS:
          case constants.COMMAND_HELP:
            helpService.help(this.bot, $.chat);
            break;
          case constants.COMMAND_LIST:
            playerService.list(this.bot, $.chat, $.from);
            break;
          default:
            break;
        }
      });

      this.bot.onText(constants.COMMAND_ADD_REGEX, async ($, match) => {
        const params = match[1].split(' ');
        playerService.add(this.bot, $.chat, $.from, params);
      });

      this.bot.onText(constants.COMMAND_REMOVE_REGEX, async ($, match) => {
        const params = match[1].split(' ');
        playerService.remove(this.bot, $.chat, $.from, params);
      });

      this.bot.onText(constants.COMMAND_SEARCH_REGEX, async ($, match) => {
        const appId = match[1];
        appService.search(this.bot, $.chat, appId);
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = BotController;
