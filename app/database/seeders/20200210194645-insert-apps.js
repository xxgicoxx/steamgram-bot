const Steam = require('steamworks-api');

const { steamConfig } = require('../../configs');

const steam = new Steam(steamConfig);

module.exports = {
  up(queryInterface) {
    return steam.get('/ISteamApps/GetAppList/v2/').then((response) => queryInterface.bulkInsert('apps', response.applist.apps, {})).catch(() => queryInterface.bulkInsert('apps', [], {}));
  },

  down: (queryInterface) => queryInterface.bulkDelete('apps', null, {}),
};
