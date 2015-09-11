var app = require('express')();
var Sequelize = require('sequelize');
var pg = require('pg-hstore');

var sequelize = new Sequelize('postgres://andela:ashikodi@localhost:5432/test');

sequelize.authenticate().then(function(err) {
  if (err) {
    console.log('Connection failed: ', err);
  }
  else {
    console.log('Connection Successful!');
  }
});

app.listen(5000, function(err) {
  if(err) {
    console.log('Server error: ', err);
  }
  else {
    console.log('Server started on port 5000');
  }
});