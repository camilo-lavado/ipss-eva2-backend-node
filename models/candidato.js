const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Candidato = sequelize.define('Candidato', {
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
    telefono: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'candidatos',
    timestamps: false
});

module.exports = Candidato;