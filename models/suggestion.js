'use strict';
module.exports = (sequelize, DataTypes) => {
  const suggestion = sequelize.define('suggestion', {
    photo: DataTypes.STRING,
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    nasaId: DataTypes.STRING,
    keyword: DataTypes.STRING
  }, {});
  suggestion.associate = function(models) {
    // associations can be defined here
  };
  return suggestion;
};