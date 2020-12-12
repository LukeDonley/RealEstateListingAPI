'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Agents', [
      {
        first_name: 'Test',
        last_name: 'Agent1',
        email: 'agent1@test.com',
        phone: '123-456-7890',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Test',
        last_name: 'Agent2',
        email: 'agent2@test.com',
        phone: '111-222-3333',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Test',
        last_name: 'Agent3',
        email: 'agent3@test.com',
        phone: '444-555-6666',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Agents', null, {});
  }
};
