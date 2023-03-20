const { Op } = require('sequelize');
const Steam = require('steamworks-api');

const { App } = require('../models');

const { steamConfig } = require('../configs');
const { constants } = require('../utils');

const steam = new Steam(steamConfig);

class UsuarioService {
  async search(bot, chat, appId) {
    try {
      if (!appId) {
        await bot.sendMessage(chat.id, constants.MESSAGE_APP_MUST_NOT_BE_EMPTY);

        return;
      }

      const where = Number.isNaN(Number(appId)) ? { name: { [Op.like]: `%${appId}%` } } : { appid: appId };
      const apps = await App.findAll({ where });

      if (!apps || apps.length === 0) {
        await bot.sendMessage(chat.id, constants.MESSAGE_APP_NOT_FOUND);

        return;
      }

      const message = apps.map((app) => `<b>Name:</b> ${app.name}\n<b>App ID:</b> ${app.appid}\n`).join('\n');

      await bot.sendMessage(chat.id, message, { parse_mode: constants.PARSE_MODE });
    } catch (error) {
      console.error(error);

      await bot.sendMessage(chat.id, constants.MESSAGE_ERROR_TRY_AGAIN);
    }
  }

  async update() {
    try {
      const apps = await steam.get(constants.URL_GET_APP_LIST);

      await App.destroy({ truncate: { cascade: false } });
      await App.bulkCreate(apps.applist.apps);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = UsuarioService;
