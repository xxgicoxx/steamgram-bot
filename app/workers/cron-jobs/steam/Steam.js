const cluster = require('cluster');
const cron = require('node-cron');

const { AppController, PlayerController } = require('../../../controllers');

const appController = new AppController();
const playerController = new PlayerController();

class Steam {
  constructor($) {
    this.$ = $;
  }

  checkChanges() {
    if (cluster.isMaster) {
      cron.schedule('*/1 * * * *', async () => {
        playerController.checkChanges(this.$);
      });
    }
  }

  getAppList() {
    if (cluster.isMaster) {
      cron.schedule('0 0 */12 * * *', () => {
        appController.getAppList();
      });
    }
  }
}

module.exports = Steam;
