process.env.NTBA_FIX_319 = 1;

require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const { telegramConfig } = require('./server/configs');
const { BotController } = require('./server/controllers');
const { SteamJob } = require('./server/workers/cron-jobs/steam');

const bot = new TelegramBot(telegramConfig.token, { polling: true });

const botController = new BotController(bot);
const steamJob = new SteamJob(bot);

botController.handle();
steamJob.start();
