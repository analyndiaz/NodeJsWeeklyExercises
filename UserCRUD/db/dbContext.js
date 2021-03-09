const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const path = require("path");

const adapter = new FileAsync(path.join(__dirname, "db.json"));

class DatabaseContext {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.dbContext = low(adapter).then((context) => {
      context.defaults({ [collectionName]: [] }).write();

      return context;
    });
  }

  async getContext() {
    const context = await this.dbContext;
    return context.get(this.collectionName);
  }

  async getAll() {
    return (await this.getContext()).value() || [];
  }

  async getByFilter(filter = {}) {
    return (await this.getContext()).filter(filter).value();
  }

  async getByAny(propName, propValue) {
    return (
      (await this.getContext()).find({ [propName]: propValue }).value() || {}
    );
  }

  async getById(id) {
    return (await this.getContext()).find({ id }).value();
  }

  async insert(data = {}) {
    return (await this.getContext()).push(data).write();
  }

  async update(id, data = {}) {
    return (await this.getContext()).find(id).assign(data).write();
  }

  async delete(id) {
    return (await this.getContext()).remove(id).write();
  }
}

module.exports = DatabaseContext;
