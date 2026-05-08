'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre_usuario: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rol: {
        type: Sequelize.STRING,
        allowNull: false
      },
      entrevistador_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'entrevistadores', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      ultimo_login: {
        type: Sequelize.DATE,
        allowNull: true
      },
      estado: {
        type: Sequelize.TINYINT,
        defaultValue: 1
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};