const cluster = require('cluster');
const cron = require('node-cron');

const { AppService, PlayerService } = require('../../../services');
const { constants } = require('../../../utils');

const appService = new AppService();
const playerService = new PlayerService();

class SteamJob {
  constructor(bot) {
    this.bot = bot;
  }

  start() {
    if (!cluster.isMaster) {
      return;
    }

    cron.schedule(constants.CRON_PLAYER_CHANGES, async () => {
      playerService.changes(this.bot);
    });

    cron.schedule(constants.CRON_SERVICE_UPDATE, () => {
      appService.update();
    });
  }
}

module.exports = SteamJob;
