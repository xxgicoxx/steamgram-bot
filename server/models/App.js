module.exports = (sequelize, DataTypes) => {
  const App = sequelize.define('App', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    appid: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'apps',
    timestamps: false,
  });

  return App;
};
