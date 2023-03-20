module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('commands', {
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
  }),

  down: (queryInterface) => queryInterface.dropTable('commands'),
};
