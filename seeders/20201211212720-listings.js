'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Listings', [
      {
        mls_number: '1111111',
        address_line_1: '1111 Test St',
        address_line_2: '',
        city: 'Minnapolis',
        state: 'Minnesota',
        postal_code: '55407',
        asking_price: '220000.00',
        listing_date: '2020-12-12',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mls_number: '2222222',
        address_line_1: '2222 Test Blvd',
        address_line_2: '',
        city: 'St. Paul',
        state: 'Minnesota',
        postal_code: '55101',
        asking_price: '400000.00',
        listing_date: '2020-12-12',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Listings', null, {});
  }
};
