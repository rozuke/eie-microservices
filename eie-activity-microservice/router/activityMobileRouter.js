const { ActivityMobileService } = require("../service/activityMobileService");
const service = new ActivityMobileService();

// GET Functions
const getAllQuestions = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const questions = await service.findAllQuestionsForTypes();
    if (questions !== null) {
      callback(null, questions);
    }
  } catch (error) {
    callback(error);
  }
};

const getStudentNote = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { userId } = event.pathParameters;
    const note = await service.findStudentNotes(userId);
    if (note !== null) {
      callback(null, note);
    }
  } catch (error) {
    callback(error);
  }
};

const getLessonForBook = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const lessons = await service.findLessonsForBook();
    if (lessons !== null) {
      callback(null, lessons);
    }
  } catch (error) {
    callback(error);
  }
};

const getStudentParticipation = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { usuarioId } = event.pathParameters;
    const participation = await service.findStudentParticipation(usuarioId);
    if (participation !== null) {
      callback(null, participation);
    }
  } catch (error) {
    callback(error);
  }
};

// Post Functions
const postNewComment = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { courseId, forumId } = event.pathParameters;
    const { contenido, usuarioId, actividadId } = JSON.parse(event.body);
    const newComment = { contenido, usuarioId, actividadId };
    const comment = await service.createNewComment(
      courseId,
      forumId,
      newComment
    );
    callback(null, comment);
  } catch (error) {
    callback(error);
  }
};

const postNewResult = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const {
      notaHomework,
      notaEE,
      notaLaboratory,
      cantidadParticipacion,
      usuarioId,
      valoracionId,
    } = JSON.parse(event.body);
    const newResult = {
      notaHomework,
      notaEE,
      notaLaboratory,
      cantidadParticipacion,
      usuarioId,
      valoracionId,
    };
    const result = await service.createNewResult(newResult);
    if (result !== null) {
      callback(null, result);
    }
  } catch (error) {
    callback(error);
  }
};

const postNewParticipation = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { puntuacion, usuarioId, preguntaId, valoracionId } = JSON.parse(
      event.body
    );
    const newParticipation = {
      puntuacion,
      usuarioId,
      preguntaId,
      valoracionId,
    };
    const participation = await service.createNewParticipation(
      newParticipation
    );
    if (participation !== null) {
      callback(null, participation);
    }
  } catch (error) {
    callback(error);
  }
};

// Put Functions

const putStudentResult = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { userId } = event.pathParameters;
    console.log(userId);
    const result = await service.updateStudentResult(userId);
    if (result !== null) {
      callback(null, result);
    }
  } catch (error) {
    callback(error);
  }
};

module.exports = {
  getAllQuestions,
  getStudentNote,
  getLessonForBook,
  getStudentParticipation,
  postNewComment,
  postNewResult,
  postNewParticipation,
  putStudentResult,
};
