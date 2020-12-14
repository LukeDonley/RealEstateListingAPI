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
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phone: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Agent'
    }
  );
  return Agent;
};
