const { TextCommand, Telegram } = require('telegram-node-bot');

const { AppController, PlayerController, MessageController } = require('./app/controllers');
const { Steam } = require('./app/workers/cron-jobs/steam');

const { telegramConfig } = require('./app/configs');

const chatbot = new Telegram(telegramConfig.token, {
  webAdmin: {
    port: 7773,
    host: 'localhost',
  },
  workers: 1,
});

const steam = new Steam(chatbot.api);

chatbot.router
  .when(new TextCommand('/start', 'start'), new MessageController())
  .when(new TextCommand('/help', 'help'), new MessageController())
  .when(new TextCommand('/add', 'add'), new PlayerController())
  .when(new TextCommand('/remove', 'remove'), new PlayerController())
  .when(new TextCommand('/list', 'list'), new PlayerController())
  .when(new TextCommand('/search', 'search'), new AppController())
  .otherwise(new MessageController());

steam.checkChanges();
steam.getAppList();
