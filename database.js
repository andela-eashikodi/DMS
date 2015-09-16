var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://andela:ashikodi@localhost:5432/test');
var db = {};

var models = require('./schema')(Sequelize, sequelize);
models.forEach(function(table) {
  db[table.name] = table;
});

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;