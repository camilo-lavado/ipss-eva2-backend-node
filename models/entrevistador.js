const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Entrevistador = sequelize.define('Entrevistador', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    especialidad: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'entrevistadores',
    timestamps: false
});

module.exports = Entrevistador;