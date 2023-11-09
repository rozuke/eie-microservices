const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const ForumActivitySchema = sequelize.define(
  "foroActividad",
  {
    actividadId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "actividad_foro_id",
    },
    topico: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    cursoId: {
      type: DataTypes.INTEGER,
      field: "acf_curso_id",
    },
    tipo: {
      type: DataTypes.INTEGER,
      field: "acf_tipo_act_id",
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "ActividadForo",
  }
);

module.exports = { ForumActivitySchema };
