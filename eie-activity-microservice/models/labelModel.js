const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");

const LabelSchema = sequelize.define(
  "etiquetas",
  {
    etiquetaId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "etiqueta_id",
    },
    nombre: {
      type: DataTypes.STRING,
    },
    secuencia: {
      type: DataTypes.SMALLINT,
    },
    opcion: {
      type: DataTypes.BOOLEAN,
    },
    preguntaId: {
      type: DataTypes.INTEGER,
      field: "eti_pregunta_id",
    },

    tipoEtiquetaId: {
      type: DataTypes.INTEGER,
      field: "eti_tipo_etq_id",
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "Etiqueta",
  }
);

module.exports = { LabelSchema };
