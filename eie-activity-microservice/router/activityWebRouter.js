const { ActivityWebService } = require("../service/activityWebService");

const service = new ActivityWebService();

const getAllCourses = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const courses = await service.findAllCourses(5);
    if (courses !== null) {
      callback(null, courses);
    }
  } catch (error) {
    callback(error);
  }
};

const getAllResultsByCourse = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const results = await service.findAllResultsByCourse(1);
    if (results !== null) {
      callback(null, results);
    }
  } catch (error) {
    callback(error);
  }
};

const postNewForum = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { id } = event.pathParameters;
    const { topico, descripcion } = JSON.parse(event.body);
    const newForum = {
      topico,
      descripcion,
      cursoId: id,
      tipo: 1,
    };

    const forum = await service.createForum(newForum);
    if (forum !== null) {
      callback(null, forum);
    }
  } catch (error) {
    callback(error);
  }
};

const putForum = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { courseId, forumId } = event.pathParameters;
    const { topico, descripcion } = JSON.parse(event.body);
    const newForum = {
      topico,
      descripcion,
    };

    const forum = await service.updateForum(courseId, forumId, newForum);
    if (forum !== null) {
      callback(null, forum);
    }
  } catch (error) {
    callback(error);
  }
};

const deleteForum = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { courseId, forumId } = event.pathParameters;
    const forum = await service.destroyForum(courseId, forumId);
    if (forum !== null) {
      callback(null, forum);
    }
  } catch (error) {
    callback(error);
  }
};

module.exports = {
  postNewForum,
  getAllCourses,
  getAllResultsByCourse,
  putForum,
  deleteForum,
};
