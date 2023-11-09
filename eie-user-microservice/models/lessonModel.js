const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");

const LessonSchema = sequelize.define(
  "leccion",
  {
    leccionId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "leccion_id",
    },
    nombre: {
      type: DataTypes.STRING,
    },
    libroId: {
      type: DataTypes.INTEGER,
      field: "lec_libro_id",
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "Leccion",
  }
);

module.exports = { LessonSchema };
