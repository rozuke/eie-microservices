const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");

const ParticipationSchema = sequelize.define(
  "participacion",
  {
    participacionId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "participacion_id",
    },
    puntuacion: {
      type: DataTypes.SMALLINT,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      field: "par_usuario_id",
    },
    preguntaId: {
      type: DataTypes.INTEGER,
      field: "par_pregunta_id",
    },
    valoracionId: {
      type: DataTypes.INTEGER,
      field: "par_valoracion_id",
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "Participacion",
  }
);

module.exports = { ParticipationSchema };
