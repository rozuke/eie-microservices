const { PersonSchema } = require("../models/personModel.js");
const { UserSchema } = require("../models/userModel.js");
const { Sequelize } = require("sequelize");
const { UserCourseSchema } = require("../models/userCourseModel.js");
const { CourseSchema } = require("../models/courseModel.js");
const { BookSchema } = require("../models/bookModel.js");
const { LessonSchema } = require("../models/lessonModel.js");
require("../associations");

class UserMobileService {
  // find functions
  async findUserByEmail(email) {
    const student = await UserSchema.findOne({
      where: {
        email: email,
      },
      include: [
        {
          model: PersonSchema,
          attributes: [],
        },
      ],
      attributes: [
        "usuarioId",
        "email",
        "estado",
        [
          Sequelize.fn(
            "concat",
            Sequelize.col("persona.nombre"),
            " ",
            Sequelize.col("persona.apellido_paterno"),
            " ",
            Sequelize.col("persona.apellido_materno")
          ),
          "nombre",
        ],
        [Sequelize.col("persona.tipo"), "tipo"],
        "rolId",
      ],
    });
    return student;
  }

  async findCourseByUserId(userId) {
    const course = await UserCourseSchema.findOne({
      where: {
        usuarioId: userId,
      },
      include: [
        {
          model: CourseSchema,
          include: [
            {
              model: BookSchema,
              attributes: [],
            },
          ],
          attributes: [],
        },
      ],
      raw: true,
      attributes: [
        "cursoId",
        [Sequelize.col("curso.nombre"), "nombre"],
        [Sequelize.col("curso.estado"), "estado"],
        [Sequelize.col("curso.cur_libro_id"), "libroId"],
        [Sequelize.col("curso.libro.nombre"), "libro"],
        [Sequelize.col("curso.libro.nivel"), "nivel"],
      ],
    });
    const lecciones = await this.findLessonByBook(course.libroId);
    return { ...course, lecciones };
  }

  async findLessonByBook(bookId) {
    const lessons = await LessonSchema.findAll({
      where: {
        libroId: bookId,
      },
      attributes: ["nombre"],
      raw: true,
    }).then((lessons) => lessons.map((lesson) => lesson.nombre));
    return lessons;
  }

  async findTeacherCourse(courseId) {
    const teacher = await UserCourseSchema.findOne({
      where: {
        cursoId: courseId,
      },
      include: [
        {
          model: UserSchema,
          attributes: [],
          where: {
            rolId: 2,
          },
          include: [
            {
              model: PersonSchema,
              attributes: [],
            },
          ],
        },
      ],
      attributes: [
        ["usuario_id", "teacherId"],
        [
          Sequelize.fn(
            "CONCAT",
            Sequelize.col("usuario.persona.nombre"),
            " ",
            Sequelize.col("usuario.persona.apellido_paterno"),
            " ",
            Sequelize.col("usuario.persona.apellido_materno")
          ),
          "nombreProfesor",
        ],
        [Sequelize.col("usuario.email"), "emailProfesor"],
      ],
    });

    return teacher;
  }
}

module.exports = { UserMobileService };
