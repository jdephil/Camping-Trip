'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define('favorite', {
    photo: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  favorite.associate = function(models) {
    // associations can be defined here
    models.favorite.belongsTo(models.user)
  };
  return favorite;
};