var app  = require('express')();
var Sequelize = require("sequelize");
var models = require('./database');

models.sequelize.sync().then(function(){
  app.listen(5000, function(err) {
    if (err) {
      throw err;
    }
    console.log('Server started on port 5000');
  });   
});

module.exports = app;