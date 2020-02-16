const Steam = require('steamworks-api');

const { Player } = require('../models');

const { steamConfig } = require('../configs');

const steam = new Steam(steamConfig);

class UsuarioService {
  async add($) {
    try {
      const params = $.message.text.replace('/add', '').trim().split(' ');

      if (!params[0]) {
        $.sendMessage('Steam ID must not be empty');
      } else {
        const player = {
          chat: $.message.chat.id,
          user: $.message.from.id,
          friend: params[0],
          game: params[1] || null,
        };

        Player.findOne({ where: player }).then((obj) => {
          if (obj) {
            obj.update(player);
          } else {
            Player.create(player);
          }
        });

        $.sendMessage('Success');
      }
    } catch (ex) {
      console.error(ex);

      $.sendMessage('Error, try again later');
    }
  }

  async remove($) {
    try {
      const params = $.message.text.replace('/remove', '').trim().split(' ');

      if (!params[0]) {
        $.sendMessage('Steam ID must not be empty');
      } else {
        const player = await Player.findOne({
          where: {
            chat: $.message.chat.id,
            user: $.message.from.id,
            friend: params[0],
            game: params[1] || null,
          },
        });

        if (!player) {
          $.sendMessage('Player not found');
        } else {
          player.destroy();

          $.sendMessage('Success');
        }
      }
    } catch (ex) {
      console.error(ex);

      $.sendMessage('Error, try again later');
    }
  }

  async list($) {
    try {
      const players = await Player.findAll({
        where: {
          chat: $.message.chat.id,
          user: $.message.from.id,
        },
      });

      if (players.length === 0) {
        $.sendMessage('List is empty');
      } else {
        const message = await this.message(players);
        $.sendMessage(message);
      }
    } catch (ex) {
      console.error(ex);

      $.sendMessage('Error, try again later');
    }
  }

  async checkChanges($) {
    try {
      const players = await Player.findAll();

      return Promise.all(
        players.map((e) => steam.get('/ISteamUser/GetPlayerSummaries/v2/', { steamids: e.friend }).then((response) => {
          const player = response.response.players[0];

          if ((e !== null && player !== null) && (e.game === null || e.game == player.gameid) && (e.lastlogoff !== player.lastlogoff)) {
            e.update({ lastlogoff: player.lastlogoff });
            $.sendMessage(e.chat, `${player.personaname} is now playing ${player.gameextrainfo}`);
          }
        })),
      );
    } catch (ex) {
      console.error(ex);

      throw new Error(ex);
    }
  }

  async message(players) {
    return Promise.all(
      players.map((e) => steam.get('/ISteamUser/GetPlayerSummaries/v2/', { steamids: e.friend }).then((response) => Promise.resolve(`Name: ${response.response.players[0].personaname}\nSteam ID: ${e.friend}\nApp ID: ${e.game || 'All'}\n\n`))),
    ).then((response) => {
      let message = '';

      response.forEach((e) => {
        message += e;
      });

      return Promise.resolve(message);
    });
  }
}

module.exports = UsuarioService;
