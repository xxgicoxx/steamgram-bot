const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { postgresqlConfig } = require('../configs');

const db = {};
const sequelize = new Sequelize(postgresqlConfig);

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
