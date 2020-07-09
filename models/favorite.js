'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define('favorite', {
    photo: DataTypes.STRING,
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  favorite.associate = function(models) {
    // associations can be defined here
  };
  return favorite;
};