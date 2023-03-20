const { Command } = require('../models');
const { constants } = require('../utils');

class HelpService {
  async help(bot, chat) {
    try {
      const commands = await Command.findAll();
      let message = '';

      message += constants.MESSAGE_HELP;
      message += commands.map((command) => `${command.dataValues.command} - ${command.dataValues.description}`).join('\n');

      await bot.sendMessage(chat.id, message, { parse_mode: constants.PARSE_MODE });
    } catch (error) {
      console.error(error);

      await bot.sendMessage(chat.id, constants.MESSAGE_ERROR_TRY_AGAIN);
    }
  }
}

module.exports = HelpService;
