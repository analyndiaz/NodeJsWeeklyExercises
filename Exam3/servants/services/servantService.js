const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("../db.json");
const db = lowdb(adapter);

db.defaults({ servants: [] }).write();

exports.get = (name) => {
  if (name) {
    var dbServant = getServant(name);
    if (!dbServant.success) {
      return dbServant;
    }

    return dbServant.data;
  }

  return db.get("servants").value();
};

exports.insert = (servant) => {
  const { name } = servant;

  const dbServant = getServant(name);

  if (dbServant.success) {
    return {
      success: false,
      errorMessage: `Servant ${name} already exists`,
    };
  }

  db.get("servants").push(servant).write();

  return {
    success: true,
  };
};

exports.delete = (name) => {
  const dbServant = getServant(name);

  if (!dbServant.success) {
    return dbServant;
  }

  const servants = db.get("servants").value();

  db.set(
    "servants",
    servants.filter((_) => _.name !== name)
  ).write();

  if (db.get("servants").value().length === servants.length) {
    return {
      success: false,
      errorMessage: `Unable to delete ${name}`,
    };
  }

  return {
    success: true,
  };
};

exports.update = (name, servant) => {
  const dbServant = getServant(name);

  if (!dbServant.success) {
    return dbServant;
  }

  var err = validateData(servant, true);

  if (err.length > 0) {
    return {
      success: false,
      errorMessage: err,
    };
  }

  db.get("servants")
    .chain()
    .find({ name: name })
    .assign({ class: servant.class, alignment: servant.alignment })
    .write();
  return {
    success: true,
  };
};

getServant = (name) => {
  var servant = db.get("servants").chain().find({ name: name }).value();
  if (!servant) {
    return {
      success: false,
      errorMessage: `${name} doesn't exists`,
    };
  }
  return {
    success: true,
    data: servant,
  };
};

validateData = (servant, update = true) => {
  const errorMessages = [];
  if ((servant.name === "" || servant.name === undefined) && !update) {
    errorMessages.push(`Name is required. It cannot be blank or undefined.`);
  }
  if (servant.class === "" || servant.class === undefined) {
    errorMessages.push(`Class is required. It cannot be blank or undefined.`);
  }
  return errorMessages;
};
