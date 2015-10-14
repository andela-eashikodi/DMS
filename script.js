#! /usr/bin/env node

var models = require('./database');
var dmsService = require('./documentManager');

var commandInput = process.argv[1];
var userCommand = commandInput.split('/')[4];
var userArgs = process.argv.slice(2);

var exec = require('child_process').exec;

if(userCommand === 'createnewuser') {
  if(userArgs.length < 2) {
    console.log(
      'incomplete parameters \nformat is : createnewuser "firstname", "lastname" '
    );
  }
  else {
    var child = exec(dmsService.createUser(userArgs[0], userArgs[1]).then(function(data) {
      console.log('new user created!\n', data);
    }));
  }  
}

else if(userCommand === 'getusers') {
  if(userArgs[0] !== '--all') {
    console.log(
      'wrong format \nformat is : getusers --all '
    );
  }
  else {
    var child = exec(dmsService.getAllUsers().then(function(data) {
      console.log('All users: !\n', data);
    }));
  }  
}

else if(userCommand === 'createnewrole') {
  if(userArgs.length !== 1) {
    console.log(
      'wrong format \nformat is : createnewrole "title" '
    );
  }
  else {
    var child = exec(dmsService.createRole(userArgs[0]).then(function(data) {
      console.log('new role created!\n', data);
    }));
  }  
}

else if(userCommand === 'getroles') {
  if(userArgs[0] !== '--all') {
    console.log(
      'wrong format \nformat is : getroles --all '
    );
  }
  else {
    var child = exec(dmsService.getAllRoles().then(function(data) {
      console.log('All roles: !\n', data);
    }));
  }  
}

else if(userCommand === 'createnewdoc') {
  if(userArgs.length !== 1) {
    console.log(
      'wrong format\n format is : createnewdoc "title" '
    );
  }
  else {
    var child = exec(dmsService.createDocument(userArgs[0]).then(function(data) {
      console.log('new document created!\n', data);
    }));
  }  
}

else if(userCommand === 'getalldocs') {
  if(userArgs.length !== 1) {
    console.log(
      'wrong format \nformat is : getalldocs limit '
    );
  }
  else {
    var child = exec(dmsService.getAllDocuments(userArgs[0]).then(function(data) {
      console.log('all documents!\n', data);
    }));
  }  
}

else if(userCommand === 'getalldocs') {
  if(userArgs.length < 2) {
    console.log(
      'wrong format \nformat is : getalldocs "role", "limit" '
    );
  }
  else {
    var child = exec(dmsService.getAllDocumentsByRole(userArgs[0], userArgs[1]).then(function(data) {
      console.log('all documents!\n', data);
    }));
  }  
}

else if(userCommand === 'getalldocs') {
  if(userArgs.length < 2) {
    console.log(
      'wrong format \nformat is : getalldocs "date", "limit" '
    );
  }
  else {
    var child = exec(dmsService.getAllDocumentsByDate(userArgs[0], userArgs[1]).then(function(data) {
      console.log('all documents!\n', data);
    }));
  }  
}

