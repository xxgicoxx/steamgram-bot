module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('commands', [{
    command: '/search <b>{App ID or Name}</b>',
    description: 'Search app',
  }, {
    command: '/add <b>{Steam ID}</b>',
    description: 'Add friend',
  }, {
    command: '/remove <b>{Steam ID}</b>',
    description: 'Remove friend',
  }, {
    command: '/list',
    description: 'List friends',
  }, {
    command: '/help',
    description: 'Help',
  }]),

  down: (queryInterface) => queryInterface.bulkDelete('commands', null, {}),
};
