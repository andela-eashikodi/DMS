var models = require('./database');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://andela:ashikodi@localhost:5432/test');

//functions to query database
module.exports = {

  createUser:  function(first, last) {
    var newUser = {
      firstName: first,
      lastName: last
    };
    return models.user.create(newUser);
  },
  getAllUsers: function() {
    return models.user.findAll();
  },
  createRole: function(title) {
    return models.role.create({title: title});
  },
  getAllRoles: function() {
    return models.role.findAll();
  },
  createDocument: function(title) {
    return models.doc.create({title: title});
  },
  getAllDocuments: function(limit) {
    return models.doc.findAll({limit: limit, order: 'date_created DESC'});
  },
  getAllDocumentsByRole: function(role, limit) {
    return models.doc.findAll({where: {role: role}, limit: limit, order: 'date_created DESC'});
  },
  getAllDocumentsByDate: function(date, limit) {
    return sequelize.query("SELECT * FROM docs WHERE date_created::date = '" + date + "' LIMIT " + limit);
  }

};
