const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Experiencia = sequelize.define('Experiencia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    candidato_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    empresa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cargo_ejercido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    meses_duracion: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'experiencias',
    timestamps: false
});

module.exports = Experiencia;