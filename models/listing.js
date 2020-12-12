'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    static associate(models) {
      Listing.belongsToMany(models.Agent, {
        through: 'AgentListing'
      });
    }
  }
  Listing.init(
    {
      mls_number: DataTypes.STRING,
      address_line_1: DataTypes.STRING,
      address_line_2: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      postal_code: DataTypes.STRING,
      asking_price: DataTypes.DECIMAL,
      listing_date: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Listing'
    }
  );
  return Listing;
};
