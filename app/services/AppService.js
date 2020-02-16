const { Op } = require('sequelize');
const Steam = require('steamworks-api');

const { App } = require('../models');

const { steamConfig } = require('../configs');

const steam = new Steam(steamConfig);

class UsuarioService {
  async search($) {
    try {
      const param = $.message.text.replace('/search', '').trim();

      if (!param) {
        $.sendMessage('App (ID or name) must not be empty');
      } else {
        const where = Number.isNaN(Number(param)) ? { name: { [Op.like]: `%${param}%` } } : { appid: param };

        App.findAll({ where }).then((obj) => {
          if (!obj || obj.length === 0) {
            $.sendMessage('App not found');
          } else {
            let message = '';

            obj.forEach((e) => {
              message += `Name: ${e.name}\nApp ID: ${e.appid}\n\n`;
            });

            $.sendMessage(message);
          }
        });
      }
    } catch (ex) {
      console.error(ex);

      $.sendMessage('Error, try again later');
    }
  }

  async getAppList() {
    try {
      const apps = await steam.get('/ISteamApps/GetAppList/v2/');

      await App.destroy({ truncate: { cascade: false } });
      await App.bulkCreate(apps.applist.apps);
    } catch (ex) {
      console.error(ex);
    }
  }
}

module.exports = UsuarioService;
