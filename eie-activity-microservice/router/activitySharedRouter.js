const { ActivitySharedService } = require("../service/activitySharedService");

const service = new ActivitySharedService();

const getAllActivities = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { id } = event.pathParameters;

    const topics = await service.findAllActivitiesByCourse(id);
    if (topics !== null) {
      callback(null, topics);
    }
  } catch (error) {}
  callback(error);
};

const getAllCommentsForForum = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { courseId, forumId } = event.pathParameters;
    const comments = await service.findAllCommentsForForum(courseId, forumId);
    if (comments !== null) {
      callback(null, comments);
    }
  } catch (error) {
    callback(error);
  }
};

module.exports = {
  getAllActivities,
  getAllCommentsForForum,
};
