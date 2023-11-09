const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");

const LabelTypeSchema = sequelize.define(
  "tipoEtiqueta",
  {
    tipoEtiquetaId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "tipo_etiqueta_id",
    },
    nombre: {
      type: DataTypes.STRING,
    },
    codigo: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "TipoEtiqueta",
  }
);

module.exports = { LabelTypeSchema };
