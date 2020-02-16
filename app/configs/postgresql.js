const postgresql = {
  username: process.env.STEAMGRAM_DATABASE_USERNAME || 'steamgram',
  password: process.env.STEAMGRAM_DATABASE_PASSWORD || '123456',
  database: process.env.STEAMGRAM_DATABASE_NAME || 'steamgram',
  host: process.env.STEAMGRAM_DATABASE_HOST || '127.0.0.1',
  dialect: process.env.STEAMGRAM_DATABASE_DIALECT || 'postgres',
};

module.exports = postgresql;
