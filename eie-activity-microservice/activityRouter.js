const { ActivitySchema } = require("./models/activityModel");
const { CommentSchema } = require("./models/commentModel");
const { Op } = require("sequelize");

// Activities functions

// Get
const getAllActivities = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { cursoId } = event.pathParameters;
    const activities = await ActivitySchema.findAll({
      where: {
        cursoId: cursoId,
      },
    });
    if (activities !== null) {
      callback(null, activities);
    }
  } catch (error) {
    callback(error);
  }
};

const getActivitiesByCourseId = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { cursoId, actividadId } = event.pathParameters;
    const activities = await ActivitySchema.findAll({
      where: {
        cursoId: cursoId,
        actividadId: actividadId,
      },
    });
    callback(null, activities);
  } catch (error) {
    callback(error);
  }
};

const addActivity = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { cursoId } = event.pathParameters;
    const { nombre, descripcion, tipoActividadId } = JSON.parse(event.body);
    const newActivity = { nombre, descripcion, tipoActividadId, cursoId };
    const activity = await ActivitySchema.create(newActivity);

    if (activity !== null) {
      callback(null, activity);
    }
  } catch (error) {
    callback(error);
  }
};

const updateActivity = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { cursoId, actividadId } = event.pathParameters;
    const { nombre, descripcion, tipoActividadId } = JSON.parse(event.body);
    const newActivity = { nombre, descripcion, tipoActividadId, cursoId };
    const activity = await ActivitySchema.findByPk(actividadId);
    const response = await activity.update(newActivity);

    if (response !== null) {
      callback(null, response);
    }
  } catch (error) {
    callback(error);
  }
};

const deleteActivity = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { cursoId, actividadId } = event.pathParameters;
    const activity = await ActivitySchema.findByPk(actividadId);
    await activity.destroy();
    callback(null, "Course deleted: " + cursoId + ":" + actividadId);
  } catch (error) {
    callback(error);
  }
};

// Comments functions

const getCommentsByActivityId = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { cursoId, actividadId } = event.pathParameters;
    const comments = await CommentSchema.findAll({
      attributes: ["contenido", "usuarioId"],
      where: {
        cursoId: cursoId,
        actividadId: actividadId,
      },
    });
    callback(null, comments);
  } catch (error) {
    callback(error);
  }
};

const addComment = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { cursoId, actividadId } = event.pathParameters;
    const { usuarioId, contenido } = JSON.parse(event.body);
    const newComment = { usuarioId, contenido };
    const comment = await CommentSchema.create({
      actividadId: id,
      ...newComment,
    });
    callback(null, comment);
  } catch (error) {
    callback(error);
  }
};
module.exports = {
  // Activities functions
  getAllActivities,
  addActivity,
  updateActivity,
  deleteActivity,
  getActivitiesByCourseId,
  // comments functions
  getCommentsByActivityId,
  addComment,
};
