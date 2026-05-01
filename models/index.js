const sequelize = require('../config/db');

const Usuario = require('./usuario');
const Candidato = require('./candidato');
const Cargo = require('./cargo');
const Entrevistador = require('./entrevistador');
const Entrevista = require('./entrevista');
const Experiencia = require('./experiencia');

// Relaciones

// Relación 1 a 1: Un Entrevistador tiene un Usuario asignado (o ninguno)
Entrevistador.hasOne(Usuario, { 
    foreignKey: 'entrevistador_id', 
    onDelete: 'SET NULL' 
});

// Un Usuario pertenece a un Entrevistador
Usuario.belongsTo(Entrevistador, { 
    foreignKey: 'entrevistador_id' 
});

// Cargo - Entrevistas (1 a N)
Cargo.hasMany(Entrevista, { foreignKey: 'cargo_id' });
Entrevista.belongsTo(Cargo, { foreignKey: 'cargo_id' });

// Candidato - Entrevistas (1 a N)
Candidato.hasMany(Entrevista, { foreignKey: 'candidato_id' });
Entrevista.belongsTo(Candidato, { foreignKey: 'candidato_id' });

// Candidato - Experiencias (1 a N)
Candidato.hasMany(Experiencia, { foreignKey: 'candidato_id' });
Experiencia.belongsTo(Candidato, { foreignKey: 'candidato_id' });

// Entrevistador - Entrevistas (1 a N)
Entrevistador.hasMany(Entrevista, { foreignKey: 'entrevistador_id' });
Entrevista.belongsTo(Entrevistador, { foreignKey: 'entrevistador_id' });

module.exports = {
    sequelize,
    Usuario,
    Candidato,
    Cargo,
    Entrevistador,
    Entrevista,
    Experiencia
};