const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");

const QuestionTypeSchema = sequelize.define(
  "tipoPreguntas",
  {
    tipoPreguntaId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "tipo_pregunta_id",
    },
    tipo: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "TipoPregunta",
  }
);

module.exports = { QuestionTypeSchema };
