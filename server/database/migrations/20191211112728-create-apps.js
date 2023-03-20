module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('apps', {
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
  }),

  down: (queryInterface) => queryInterface.dropTable('apps'),
};
