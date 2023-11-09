const { BookSchema } = require("../models/bookModel.js");
const { CourseSchema } = require("../models/courseModel.js");
const { ForumActivitySchema } = require("../models/forumActivityModel.js");
const { PersonSchema } = require("../models/personModel.js");
const { ResultSchema } = require("../models/resultModel.js");
const { UserCourseSchema } = require("../models/userCourseModel.js");
const { UserSchema } = require("../models/userModel.js");

require("../models/asociation.js");

class ActivityWebService {
  // find functions
  async findAllCourses(usuarioId) {
    const test = await UserCourseSchema.findAll({
      where: {
        usuarioId: usuarioId,
      },
      include: [
        {
          model: CourseSchema,
          attributes: ["nombre", "estado", "codigo"],
          include: [
            {
              model: BookSchema,
              attributes: ["nombre", "nivel"],
            },
          ],
        },
      ],
      attributes: [],
    });
    return test;
  }

  async findAllResultsByCourse(cursoId) {
    let rolIdEstudiante = 1;
    const results = await UserCourseSchema.findAll({
      where: {
        cursoId: cursoId,
      },
      include: [
        {
          model: UserSchema,
          where: {
            rolId: rolIdEstudiante,
          },
          attributes: ["email"],
          include: [
            {
              model: PersonSchema,
              attributes: ["nombre", "apellidoPaterno", "apellidoMaterno"],
            },
            {
              model: ResultSchema,
              attributes: [
                "notaHomework",
                "notaEE",
                "notaLaboratory",
                "cantidadParticipacion",
              ],
            },
          ],
        },
      ],
      attributes: ["usuarioId"],
    });
    return results;
  }

  // create functions
  async createForum(newForum) {
    const forum = await ForumActivitySchema.create(newForum);
    return forum;
  }

  // update functions
  async updateForum(courseId, forumId, forumData) {
    const forum = await ForumActivitySchema.findOne({
      where: {
        actividadId: forumId,
        cursoId: courseId,
      },
    });

    return forum.update(forumData);
  }

  // delete functions

  async destroyForum(courseId, forumId) {
    const forum = await ForumActivitySchema.findOne({
      where: {
        actividadId: forumId,
        cursoId: courseId,
      },
    });

    return forum.destroy().then(() => {
      return { message: "Forum deleted successfully" };
    });
  }
}

module.exports = { ActivityWebService };
