module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define(
    'User',
    {
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: { type: DataTypes.STRING(50), allowNull: false },
      last_name: { type: DataTypes.STRING(50), allowNull: false },
      email: { type: DataTypes.STRING(50), allowNull: false, unique: true, isEmail: true },
      username: { type: DataTypes.STRING(50), allowNull: false, unique: true, len: [2,16] },
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    { freezeTableName: true },
  );
  return User;
};
