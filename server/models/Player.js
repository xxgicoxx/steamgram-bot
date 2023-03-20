module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    chat: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    user: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    friend: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    game: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    lastlogoff: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'players',
    timestamps: false,
  });

  return Player;
};
