const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Entrevista = sequelize.define('Entrevista', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cargo_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    candidato_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    entrevistador_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_hora: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'entrevistas',
    timestamps: false
});

module.exports = Entrevista;