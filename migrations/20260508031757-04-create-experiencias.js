'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('experiencias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      candidato_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'candidatos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      empresa: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cargo_ejercido: {
        type: Sequelize.STRING,
        allowNull: false
      },
      meses_duracion: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('experiencias');
  }
};