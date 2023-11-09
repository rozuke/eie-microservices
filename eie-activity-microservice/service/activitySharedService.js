const { Sequelize } = require("sequelize");
const { ActivityTypeSchema } = require("../models/activityTypeModel.js");
const { CommentSchema } = require("../models/commentModel.js");
const { ForumActivitySchema } = require("../models/forumActivityModel.js");
const { PersonSchema } = require("../models/personModel.js");
const { UserSchema } = require("../models/userModel.js");

require("../models/asociation.js");

class ActivitySharedService {
  async findAllActivitiesByCourse(id) {
    const topics = await ForumActivitySchema.findAll({
      where: {
        cursoId: id,
      },
      include: [
        {
          model: ActivityTypeSchema,
          attributes: [],
        },
      ],
      attributes: [
        "actividadId",
        "topico",
        "descripcion",
        [Sequelize.col("tipoActividad.nombre"), "tipo"],
        "fecha",
      ],
    });
    return topics;
  }

  async findAllCommentsForForum(courseId, forumId) {
    const foro = await ForumActivitySchema.findOne({
      where: {
        actividadId: forumId,
        cursoId: courseId,
      },
      raw: true,
      include: [
        {
          model: ActivityTypeSchema,
          attributes: [],
        },
      ],
      attributes: [
        "actividadId",
        "topico",
        "descripcion",
        [Sequelize.col("tipoActividad.nombre"), "tipo"],
        "fecha",
      ],
    });

    const comentarios = await this.findAllComments(forumId);

    const response = { foro, comentarios };

    return response;
  }

  async findAllComments(forumId) {
    const comments = await CommentSchema.findAll({
      where: {
        actividadId: forumId,
      },
      include: [
        {
          model: UserSchema,
          attributes: [],
          include: [
            {
              model: PersonSchema,
              attributes: [],
            },
          ],
        },
      ],
      attributes: [
        "usuarioId",
        "contenido",
        [Sequelize.col("usuario.email"), "email"],
        [
          Sequelize.fn(
            "CONCAT",
            Sequelize.col("usuario.persona.nombre"),
            " ",
            Sequelize.col("usuario.persona.apellido_paterno"),
            " ",
            Sequelize.col("usuario.persona.apellido_materno")
          ),
          "nombre",
        ],
      ],
    });

    return comments;
  }
}

module.exports = { ActivitySharedService };
