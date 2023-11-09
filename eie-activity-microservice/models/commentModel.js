const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");

const CommentSchema = sequelize.define(
  "comentario",
  {
    comentarioId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "comentario_id",
    },
    contenido: {
      type: DataTypes.TEXT,
    },
    actividadId: {
      type: DataTypes.INTEGER,
      field: "com_actividad_foro_id",
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      field: "com_usuario_id",
      references: {
        model: "usuario",
        key: "usuario_id",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "Comentario",
    name: {
      singular: "comentario",
      plural: "comentarios",
    },
  }
);

module.exports = { CommentSchema };
