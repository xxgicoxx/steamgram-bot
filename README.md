# SteamGRAM
Telegram bot for Steam friends notifications.

![Bot](https://i.imgur.com/HSRf3AK.png)
![Bot](https://i.imgur.com/ULFbr8T.png)

### Prerequisites
* [Node.js](https://nodejs.org/en/) - Node.js

### Steam
````
# Configure
Get your key from https://steamcommunity.com/dev/apikey and set in 'configs/steam.js'
````

### Telegram
````
# Create an Telegram bot
Find @BotFather on Telegram, type /newbot and follow the instructions

# Configure
Get your token from @BotFather and set in 'configs/telegram.js'
````

### PostgreSQL
````
# Install
Install PostgreSQL and create an database

# Configure
Set PostgreSQL username, password, database, host and dialect in 'configs/postgresql.js'
````

### Sequelize
````
# Install dependencies
npm install

# Create tables
npx sequelize db:migrate

# Seed apps table
npx sequelize-cli db:seed --seed 20200210194645-insert-apps.js
````

### Run
````
# Install dependencies
npm install

# Start
npm start
````

### Built With
* [Node.js](https://nodejs.org/en/)

### Authors
* **Giovani de Oliveira** - [xxgicoxx](https://github.com/xxgicoxx)

### Acknowledgments
* [FlatIcon](https://www.flaticon.com/) - Icon