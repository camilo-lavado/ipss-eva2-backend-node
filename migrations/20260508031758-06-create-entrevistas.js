'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('entrevistas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cargo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'cargos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      candidato_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'candidatos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      entrevistador_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'entrevistadores', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      fecha_hora: {
        type: Sequelize.DATE,
        allowNull: false
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false
      },
      observaciones: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('entrevistas');
  }
};