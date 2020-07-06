'use strict';
module.exports = (sequelize, DataTypes) => {
  const trip = sequelize.define('trip', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  trip.associate = function(models) {
    // associations can be defined here
    models.trip.belongsTo(models.user)
  };
  return trip;
};