module.exports = function(Datatypes, sequelize) {
  var User = sequelize.define( 'user', {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Datatypes.STRING,
      unique: true,
      allowNull: false
    },
    lastName: {
      type: Datatypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsTo(models.role, {
          foreignKey: 'user_role'
        });
      }
    }
  });

  var Role = sequelize.define('role', {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Datatypes.STRING,
      unique: true,
      allowNull: false
    }
  });

  var Document = sequelize.define('doc', {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Datatypes.STRING,
      unique: true,
      allowNull: false
    },
    role: {
      type: Datatypes.ENUM,
      values: ['account', 'marketing'],
      defaultValue: 'account'
    }
    
  }, {
      timestamps: true,
      createdAt: 'date_created',
      updatedAt: 'lastModified'
  });

  return [User, Role, Document];
};
