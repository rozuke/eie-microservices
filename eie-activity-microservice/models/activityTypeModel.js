const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");
const ActivityTypeSchema = sequelize.define(
  "tipoActividad",
  {
    tipoActividadId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "tipo_actividad_id",
    },
    nombre: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "TipoActivdad",
  }
);

module.exports = { ActivityTypeSchema };
