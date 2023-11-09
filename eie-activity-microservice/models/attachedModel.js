const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");

const AttachedSchema = sequelize.define(
  "adjuntos",
  {
    adjuntoId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "adjunto_id",
    },
    codigo: {
      type: DataTypes.STRING,
    },
    enlace: {
      type: DataTypes.STRING,
    },
    respuestaCorrecta: {
      type: DataTypes.BOOLEAN,
      field: "respuesta_correcta",
    },
    formato: {
      type: DataTypes.ENUM("imagen", "audio"),
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    preguntaId: {
      type: DataTypes.INTEGER,
      field: "adj_pregunta_id",
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "Adjunto",
  }
);

module.exports = { AttachedSchema };
