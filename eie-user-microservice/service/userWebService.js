const { UserSchema } = require("../models/userModel.js");
const { PersonSchema } = require("../models/personModel.js");
const { RolSchema } = require("../models/rolModel.js");
const { Sequelize } = require("sequelize");
const { CourseSchema } = require("../models/courseModel.js");
const { UserCourseSchema } = require("../models/userCourseModel.js");
require("../associations");

class UserWebService {
  //Find fuctions

  async findUserByEmail(email) {
    return await UserSchema.findOne({
      where: {
        email: email,
      },
      include: [
        {
          model: PersonSchema,
        },
      ],
      attributes: ["usuarioId", "email", "estado", "rolId"],
    });
  }

  async findAllUsers() {
    return await PersonSchema.findAll({
      include: [
        {
          model: UserSchema,
          attributes: [],

          include: [
            {
              model: RolSchema,
              attributes: [],
            },
          ],
        },
      ],
      attributes: [
        "personaId",
        "nombre",
        "apellidoPaterno",
        "apellidoMaterno",
        "tipo",
        [Sequelize.col("usuario.email"), "email"],
        [Sequelize.col("usuario.rol.nombre"), "rol"],
      ],
    });
  }

  async countDataForPanel() {
    const students = await UserSchema.count({
      where: {
        rolId: 1,
      },
    });
    const teachers = await UserSchema.count({
      where: {
        rolId: 2,
      },
    });
    const admins = await UserSchema.count({
      where: {
        rolId: 3,
      },
    });

    const courses = await CourseSchema.count();

    return {
      students,
      teachers,
      admins,
      courses,
    };
  }

  async getProgressStudent(courseId) {}
  // Create functions
  async createUser(user) {
    console.log("EMAIL");
    console.log(user.usuario.email);
    return await PersonSchema.create(user, {
      include: [UserSchema],
    });
  }

  async addUserToCourse(courseId, email) {
    const user = await UserSchema.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      const rol = user.rolId;
      const usuarioId = user.usuarioId;
      const totalCourse = await UserCourseSchema.count({
        where: {
          usuarioId: usuarioId,
        },
      });
      const formatData = { usuarioId: usuarioId, cursoId: courseId };
      const register = await UserCourseSchema.findOne({
        where: {
          usuarioId: usuarioId,
          cursoId: courseId,
        },
      });
      switch (rol) {
        case 1:
          if (!register && totalCourse === 0) {
            await UserCourseSchema.create(formatData);
            return { estado: 200, mensaje: "Student Added" };
          } else {
            return { estado: 100, mensaje: "Student Already Added" };
          }
          break;
        case 2:
          if (!register) {
            await UserCourseSchema.create(formatData);
            return { estado: 200, mensaje: "Teacher Added" };
          } else {
            return { estado: 100, mensaje: "Teacher Already Added" };
          }
          break;
        case 3:
          return { estado: 100, mensaje: "Admin can not be added to course" };
      }
    } else {
      return { estado: 100, mensaje: "User not register", user };
    }
  }

  // Update functions
  async updateUser(userId, newPersonData, newUserData) {
    const person = await PersonSchema.findByPk(userId);
    await person.update(newPersonData);

    const user = UserSchema.findOne({
      where: {
        personaId: userId,
      },
    }).then((user) => {
      if (user) {
        user.update(newUserData);
      }
    });

    return { message: "User Updated" };
  }

  async destroyUser(userId) {
    const person = await PersonSchema.findByPk(userId);
    await person.destroy();
    return { message: "User Deleted" };
  }
}

// update functions

module.exports = { UserWebService };
