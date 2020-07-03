// user model declaration

// define use case
'use strict'
// import any required libraries
const bcrypt = require('bcrypt')
// declare user model format
module.exports = function(sequelize, DataTypes) {
    // define user object
    const user = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'Invalid email address'
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 99],
                    msg: 'Name must be between 1 and 99 characterss'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [8, 99],
                    msg: 'Password must be at least 8 characters'
                }
            }
        }
    }, {
        hooks: {
            //before record creation
            beforeCreate: function(createdUser, options) {
                if (createdUser && createdUser.password) {
                    let hash = bcrypt.hashSync(createdUser.password, 12)
                    createdUser.password = hash
                }
            }
                
        }
    });   
    // user associations
    user.associate = function(models) {
        // TODO: any user associations you want
    }

    // validPassword definition to validate password at user login
    user.prototype.validPassword = function(passwordTyped) {
        return bcrypt.compareSync(passwordTyped, this.password)
    }

    // remove password before any serialization of User oject
    user.prototype.toJSON = function() {
        let userData = this.get()
        delete userData.password
        return userData
    }

    return user

};