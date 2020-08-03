module.exports = function (sequelize, DataTypes) {
  var Columns = sequelize.define(
    'Columns',
    {
      id_column: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_project: { type: DataTypes.INTEGER, allowNull: true },
      id_place: { type: DataTypes.INTEGER, allowNull: false },
      column_name: { type: DataTypes.STRING(50), allowNull: false },
      column_description: DataTypes.STRING(200),
    },
    
    { freezeTableName: true },
  );
  return Columns;
};
