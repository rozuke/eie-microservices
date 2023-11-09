const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");

const CourseSchema = sequelize.define(
  "curso",
  {
    cursoId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "curso_id",
    },
    nombre: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.BOOLEAN,
    },
    codigo: {
      type: DataTypes.STRING,
    },
    libroId: {
      type: DataTypes.INTEGER,
      field: "cur_libro_id",
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "Curso",
  }
);

module.exports = { CourseSchema };
