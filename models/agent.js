'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agent extends Model {
    static associate(models) {
      Agent.belongsToMany(models.Listing, {
        through: 'AgentListing'
      });
    }
  }
  Agent.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Agent'
    }
  );
  return Agent;
};
