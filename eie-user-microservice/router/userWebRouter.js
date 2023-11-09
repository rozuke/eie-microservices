const { UserWebService } = require("../service/userWebService");
const service = new UserWebService();

const getUserByEmail = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { email } = event.pathParameters;
    const user = await service.findUserByEmail(email);
    if (user !== null) {
      callback(null, user);
    }
  } catch (error) {
    callback(error);
  }
};

const postNewUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      tipo,
      usuario: { email, rolId },
    } = JSON.parse(event.body);
    const userFormat = {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      tipo,
      usuario: {
        email: email,
        contrasena: 123,
        estado: true,
        rolId: rolId,
      },
    };
    const newUser = await service.createUser(userFormat);
    const response = {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: newUser,
    };
    callback(null, response);
  } catch (error) {
    callback(error);
  }
};

const getAllUsers = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const users = await service.findAllUsers();

    callback(null, users);
  } catch (error) {
    callback(error);
  }
};

const getInfoForDashboard = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const info = await service.countDataForPanel();
    if (info !== null) {
      callback(null, info);
    }
  } catch (error) {
    callback(error);
  }
};

const putUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { id } = event.pathParameters;
    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      tipo,
      usuario: { email, rolId },
    } = JSON.parse(event.body);

    const person = {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      tipo,
    };
    const user = { email, rolId };

    const updatedUser = await service.updateUser(id, person, user);
    if (updatedUser !== null) {
      callback(null, updatedUser);
    }
  } catch (error) {
    callback(error);
  }
};

const deleteUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { id } = event.pathParameters;
    const response = await service.destroyUser(id);
    if (response !== null) {
      callback(null, response);
    }
  } catch (error) {
    callback(error);
  }
};

const postUserToCourse = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { cursoId, email } = JSON.parse(event.body);
    const response = await service.addUserToCourse(cursoId, email);
    if (response !== null) {
      callback(null, response);
    }
  } catch (error) {
    callback(error);
  }
};

module.exports = {
  getUserByEmail,
  postNewUser,
  getAllUsers,
  putUser,
  deleteUser,
  getInfoForDashboard,
  postUserToCourse,
};
