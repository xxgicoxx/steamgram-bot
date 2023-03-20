module.exports = Object.freeze({
  MESSAGE_HELP: '<b>I can help you follow Steam players.\n\nYou can control me by sending these commands:\n\n</b>',
  MESSAGE_ERROR_TRY_AGAIN: 'Error, try again later',
  MESSAGE_STEAM_ID_MUST_NOT_BE_EMPTY: 'Steam ID must not be empty',
  MESSAGE_APP_MUST_NOT_BE_EMPTY: 'App (ID or name) must not be empty',
  MESSAGE_SUCCESS: 'Success',
  MESSAGE_LIST_IS_EMPTY: 'List is empty',
  MESSAGE_PLAYER_NOT_FOUND: 'Player not found',
  MESSAGE_APP_NOT_FOUND: 'App not found',

  COMMAND_START: '/start',
  COMMAND_LIST: '/list',
  COMMAND_COMMANDS: '/commands',
  COMMAND_HELP: '/help',

  COMMAND_ADD_REGEX: /\/add (.+)/,
  COMMAND_REMOVE_REGEX: /\/remove (.+)/,
  COMMAND_SEARCH_REGEX: /\/search (.+)/,

  ON_MESSAGE: 'message',

  URL_GET_PLAYER_SUMMARIES: '/ISteamUser/GetPlayerSummaries/v2/',
  URL_GET_APP_LIST: '/ISteamApps/GetAppList/v2/',

  CRON_PLAYER_CHANGES: '*/1 * * * *',
  CRON_SERVICE_UPDATE: '0 0 */12 * * *',

  PARSE_MODE: 'html',
});
