const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cargo = sequelize.define('Cargo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    departamento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    }
}, {
    tableName: 'cargos',
    timestamps: false
});

module.exports = Cargo;