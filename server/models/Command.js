module.exports = (sequelize, DataTypes) => {
  const Command = sequelize.define('Command', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    command: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'commands',
    timestamps: false,
  });

  return Command;
};
