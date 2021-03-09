const { validationResult } = require("express-validator");

const { UserContext: context } = require("../db");
const { User } = require("../models");

const getAllUsers = async (req, res) => {
  const resources = await context.getAll();
  res.send(resources);
};

const getUserByUserName = async (req, res) => {
  const { userName } = req.params;
  const resource = await context.getUserByUserName(userName);
  if (isEmpty(resource)) {
    return res.status(404).json({
      error: `User with userName: ${userName} does not exists.`,
    });
  }
  res.send(resource);
};

const getUserByEmail = async (req, res) => {
  const { emailAddress } = req.params;
  const resource = await context.getUserByEmail(emailAddress);
  if (isEmpty(resource)) {
    return res.status(404).json({
      error: `User with email: ${emailAddress} does not exists.`,
    });
  }
  res.send(resource);
};

const createUser = async (req, res) => {
  var result = await save(req);
  if (!result.success) {
    return res.status(result.status).json({ errors: result.errors });
  }
  res.sendStatus(201);
};

const updateUser = async (req, res) => {
  const { userName } = req.params;
  let resource = await context.getUserByUserName(userName);
  if (isEmpty(resource)) {
    return res.status(404).json({
      error: `User with userName: ${userName} does not exists.`,
    });
  }

  var result = await save(req, userName);
  if (!result.success) {
    return res.status(result.status).json({ errors: result.errors });
  }
  res.json(200);
};

const deleteUser = async (req, res) => {
  const { userName } = req.params;
  const resource = await context.getUserByUserName(userName);
  if (isEmpty(resource)) {
    return res.status(404).json({
      error: `User with userName: ${userName} does not exists.`,
    });
  }

  await context.deleteByUserName(userName);

  res.json(200);
};

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const save = async (req, userNameCurr) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return {
      success: false,
      status: 400,
      errors: errors.array(),
    };
  }

  let update = false;
  let { userName, emailAddress, firstName, lastName } = req.body;

  if (userName == undefined && userNameCurr !== undefined) {
    userName = userNameCurr;
    update = true;
  }

  let resource = await context.getUserByUserName(userName);

  if (!isEmpty(resource) && !update) {
    return {
      success: false,
      status: 409,
      errors: [`User with userName: ${userName} already exists.`],
    };
  }

  resource = new User(userName, emailAddress, firstName, lastName);
  if (update) {
    await context.updateByUserName(userNameCurr, resource);
  } else {
    await context.insert(resource);
  }

  return {
    success: true,
  };
};

module.exports = {
  getAllUsers,
  getUserByUserName,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
