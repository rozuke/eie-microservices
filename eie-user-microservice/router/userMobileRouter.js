const { UserMobileService } = require("../service/userMobileService");
const service = new UserMobileService();

const getInfoStudentByEmail = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { email } = event.pathParameters;
    const response = await service.findUserByEmail(email);
    if (response !== null) {
      callback(null, response);
    }
  } catch (error) {
    callback(error);
  }
};

const getCourseInfoByUserId = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { userId } = event.pathParameters;
    const response = await service.findCourseByUserId(userId);
    if (response !== null) {
      callback(null, response);
    }
  } catch (error) {
    callback(error);
  }
};

const getTeacherCourse = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { courseId } = event.pathParameters;
    const response = await service.findTeacherCourse(courseId);
    if (response !== null) {
      callback(null, response);
    }
  } catch (error) {
    callback(error);
  }
};

module.exports = {
  getInfoStudentByEmail,
  getCourseInfoByUserId,
  getTeacherCourse,
};
