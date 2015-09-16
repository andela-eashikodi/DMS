var models = require('./database');
var dmsService = require('./documentManager');

describe("documentManager", function() {

  describe('User', function() {

    beforeEach(function(done) {
      models.user.destroy({where: {}});
      dmsService.createUser('john','james').then(function() {
        done();
      });
    });

    it('should validate that a new user created is unique', function(done) {
      models.user.findAndCountAll({where: {firstName: 'john'}}).then(function(data) {
        expect(data.count).toBe(1);
        done();
      });
    });

    it('should validate that a new user created has a role defined', function(done) {
      models.user.find({where: {firstName: 'john'}}).then(function(data) {
        expect(data.user_role).toBeDefined();
        done();
      });
    });

    it('should validate that a new user created both first and last names', function(done) {
      models.user.findOne({where: {firstName: 'john'}}).then(function(data) {
        expect(data.firstName).toEqual(jasmine.any(String));
        expect(data.lastName).toEqual(jasmine.any(String));
        done();
      });
    });

    it('should validate that all users are returned when getAllUsers is called', function(done) {
      dmsService.createUser('peter','richard').then(function() {
        dmsService.getAllUsers().then(function(data) {
          expect(data.length).toBe(2);
          done();
        });      
      });  
    });

  });

  describe('Role', function() {

    beforeEach(function(done) {
      models.role.destroy({where: {}});
      dmsService.createRole('admin').then(function() {
        done();
      });
    });

    it('should validate that a new role created has a unique title', function(done) {
      models.role.findAndCountAll({where: {title: 'admin'}}).then(function(data) {
        expect(data.count).toBe(1);
        done();
      });
    });

    it('should validate that all roles are returned when getAllRoles is called', function(done) {
      dmsService.createRole('user').then(function() {
        dmsService.getAllRoles().then(function(data) {
          expect(data.length).toBe(2);
          done();
        });      
      });
    });

  });

  describe('Document', function() {

    beforeEach(function(done) {
      models.doc.destroy({where: {}});
      dmsService.createDocument('chapter-1').then(function() {
        done();
      });
    });

    it('should validate that a new user document created has a published date defined', function(done) {
      models.doc.find({where: {title: 'chapter-1'}}).then(function(data) {
        expect(data.date_created).toBeDefined();
        done();
      });
    });

    it('should validate that getAllDocuments returns all documents limited by a specified number and in order of their published dates, starting from the most recent', function(done) {
      dmsService.createDocument('chapter-2').then(function() {
        dmsService.createDocument('chapter-3').then(function() {
          dmsService.createDocument('chapter-4').then(function() {
            dmsService.getAllDocuments(3).then(function(data) {
              expect(data.length).toBe(3);
              expect(data[0].date_created).toBeGreaterThan(data[1].date_created);
              expect(data[1].date_created).toBeGreaterThan(data[2].date_created);
              done();
            });
          }); 
        });
      });  
    });

  });

  describe('Search', function() {

    beforeEach(function(done) {
      models.doc.destroy({where: {}});
      dmsService.createDocument('chapter-1').then(function() {
        dmsService.createDocument('chapter-2').then(function() {
          dmsService.createDocument('chapter-3').then(function() {
            dmsService.createDocument('chapter-4').then(function() {
              done();
            });
          });
        });
      });
    });

    it('should validate that getAllDocumentsByRole returns all documents, limited by a specified number and ordered by published date, that can be accessed by a specified role', function(done) {
      dmsService.getAllDocumentsByRole('account', 3).then(function(data) {
        expect(data.length).toBe(3);
        expect(data[0].date_created).toBeGreaterThan(data[1].date_created);
        expect(data[1].date_created).toBeGreaterThan(data[2].date_created);
        expect(data[0].role).toBe('account');
        expect(data[1].role).toBe('account');
        expect(data[2].role).toBe('account');
        done();
      });     
    });

    it('should validate that getAllDocumentsByDate returns all documents, limited by a specified number, that were published on a certain date', function(done) {
      var today = new Date().toJSON().slice(0, 10);
      dmsService.getAllDocumentsByDate(today, 2).then(function(data) {
        console.log(data[0]);
        expect(data[1].rowCount).toBe(2);
        expect(data[0][0].date_created).toMatch(jasmine.objectContaining(today));
        expect(data[0][1].date_created).toMatch(jasmine.objectContaining(today));
        done();
      });
    });

  });



});