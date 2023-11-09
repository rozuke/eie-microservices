const { UserSchema } = require("./models/userModel.js");

const getUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const users = await UserSchema.findAll();
    const response = { status: 200, body: { users } };
    if (response !== null) {
      callback(null, response);
    }
  } catch (error) {
    console.log(error);
  }
};

const addUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { correo, contrasena } = JSON.parse(event.body);
    const newUser = { correo, contrasena };
    const user = await UserSchema.create(newUser);

    if (user !== null) {
      callback(null, user);
    }
  } catch (error) {
    callback(error);
  }
};

const updateUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { id } = event.pathParameters;
    const { correo, contrasena } = JSON.parse(event.body);
    const newUser = { correo, contrasena };
    const user = await UserSchema.findByPk(id);
    const response = await user.update(newUser);
    if (response !== null) {
      callback(null, response);
    }
  } catch (error) {
    callback(error);
  }
};

const deleteUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { id } = event.pathParameters;
    const user = await UserSchema.findByPk(id);
    const response = await user.destroy();
    callback(null, response);
  } catch (error) {
    callback(error);
  }
};

const updateRecordUser = async (event) => {
  const { id } = event.pathParameters;
  const newUserData = JSON.parse(event.body);
  const user = service.updateRecord(id, newUserData);

  return { status: 200, body: { user } };
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  updateRecordUser,
  deleteUser,
};
