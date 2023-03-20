const Steam = require('steamworks-api');

const { Player } = require('../models');

const { steamConfig } = require('../configs');
const { constants } = require('../utils');

const steam = new Steam(steamConfig);

class UsuarioService {
  async add(bot, chat, from, params) {
    try {
      if (!params[0]) {
        await bot.sendMessage(chat.id, constants.MESSAGE_STEAM_ID_MUST_NOT_BE_EMPTY);

        return;
      }

      const [player] = await Player.findOrCreate({
        where: {
          chat: chat.id,
          user: from.id,
          friend: params[0],
          game: params[1] || null,
        },
      });

      if (!player) {
        return;
      }

      const info = await this.getPlayerSummaries(player.friend);

      player.update({
        name: info.response.players[0].personaname,
      });

      await bot.sendMessage(chat.id, constants.MESSAGE_SUCCESS);
    } catch (error) {
      console.error(error);

      await bot.sendMessage(chat.id, constants.MESSAGE_ERROR_TRY_AGAIN);
    }
  }

  async list(bot, chat, from) {
    try {
      const players = await Player.findAll({
        where: {
          chat: chat.id,
          user: from.id,
        },
      });

      if (players.length === 0) {
        await bot.sendMessage(chat.id, constants.MESSAGE_LIST_IS_EMPTY);

        return;
      }

      const message = players.map((player) => `Name: ${player.name}\nSteam ID: ${player.friend}\nApp ID: ${player.game || 'All'}\n`).join('\n');

      await bot.sendMessage(chat.id, message);
    } catch (error) {
      console.error(error);

      await bot.sendMessage(chat.id, constants.MESSAGE_ERROR_TRY_AGAIN);
    }
  }

  async remove(bot, chat, from, params) {
    try {
      if (!params[0]) {
        await bot.sendMessage(chat.id, constants.MESSAGE_STEAM_ID_MUST_NOT_BE_EMPTY);

        return;
      }

      const player = await Player.findOne({
        where: {
          chat: chat.id,
          user: from.id,
          friend: params[0],
          game: params[1] || null,
        },
      });

      if (!player) {
        await bot.sendMessage(chat.id, constants.MESSAGE_PLAYER_NOT_FOUND);

        return;
      }

      player.destroy();

      await bot.sendMessage(chat.id, constants.MESSAGE_SUCCESS);
    } catch (error) {
      console.error(error);

      await bot.sendMessage(chat.id, constants.MESSAGE_ERROR_TRY_AGAIN);
    }
  }

  async changes(bot) {
    try {
      const players = await Player.findAll();

      return Promise.all(
        players.map((e) => this.getPlayerSummaries(e.friend).then((response) => {
          const player = response.response.players[0];

          if ((e != null && player != null)
              && (e.game == null || e.game === player.gameid)
              && (e.lastlogoff !== player.lastlogoff) && (player.gameid != null)) {
            e.update({ lastlogoff: player.lastlogoff });
            bot.sendMessage(e.chat, `${player.personaname} is now playing ${player.gameextrainfo}`);
          }
        })),
      );
    } catch (error) {
      console.error(error);

      throw new Error(error);
    }
  }

  async getPlayerSummaries(steamids) {
    return steam.get(constants.URL_GET_PLAYER_SUMMARIES, {
      steamids,
    });
  }
}

module.exports = UsuarioService;
