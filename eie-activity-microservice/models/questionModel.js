const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");
const { BookSchema } = require("./bookModel.js");
const { QuestionTypeSchema } = require("./questionTypeModel.js");

const QuestionSchema = sequelize.define(
  "preguntas",
  {
    preguntaId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "pregunta_id",
    },
    enunciado: {
      type: DataTypes.STRING,
    },
    orden: {
      type: DataTypes.INTEGER,
    },
    libroId: {
      type: DataTypes.INTEGER,
      field: "pre_libro_id",
    },
    tipoId: {
      type: DataTypes.INTEGER,
      field: "pre_tipo_id",
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "Pregunta",
  }
);

module.exports = { QuestionSchema };
