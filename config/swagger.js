const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'RecruitAPI',
            version: '1.0.0',
            description: 'API REST de gestión de reclutamiento — IPSS Evaluación 2',
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Desarrollo local' }
        ],
        components: {
            schemas: {
                Candidato: {
                    type: 'object',
                    required: ['nombres', 'apellidos', 'email'],
                    properties: {
                        id:        { type: 'integer', readOnly: true, example: 1 },
                        nombres:   { type: 'string', example: 'Ana' },
                        apellidos: { type: 'string', example: 'Pérez' },
                        email:     { type: 'string', format: 'email', example: 'ana.perez@mail.com' },
                        telefono:  { type: 'string', nullable: true, example: '+56912345678' }
                    }
                },
                Cargo: {
                    type: 'object',
                    required: ['titulo', 'departamento'],
                    properties: {
                        id:           { type: 'integer', readOnly: true, example: 1 },
                        titulo:       { type: 'string', example: 'Desarrollador Backend' },
                        departamento: { type: 'string', example: 'Tecnología' },
                        estado:       { type: 'integer', enum: [0, 1], default: 1, description: '1=activo, 0=inactivo' }
                    }
                },
                Entrevistador: {
                    type: 'object',
                    required: ['nombres', 'apellidos', 'email', 'especialidad'],
                    properties: {
                        id:           { type: 'integer', readOnly: true, example: 1 },
                        nombres:      { type: 'string', example: 'Luis' },
                        apellidos:    { type: 'string', example: 'Aravena' },
                        email:        { type: 'string', format: 'email', example: 'l.aravena@empresa.cl' },
                        especialidad: { type: 'string', example: 'Recursos Humanos' }
                    }
                },
                Entrevista: {
                    type: 'object',
                    required: ['cargo_id', 'candidato_id', 'entrevistador_id', 'fecha_hora', 'estado'],
                    properties: {
                        id:               { type: 'integer', readOnly: true, example: 1 },
                        cargo_id:         { type: 'integer', example: 2 },
                        candidato_id:     { type: 'integer', example: 3 },
                        entrevistador_id: { type: 'integer', example: 1 },
                        fecha_hora:       { type: 'string', format: 'date-time', example: '2026-06-15T10:00:00Z' },
                        estado:           { type: 'string', enum: ['PROGRAMADA', 'REALIZADA', 'CANCELADA', 'PENDIENTE'], example: 'PROGRAMADA' },
                        observaciones:    { type: 'string', nullable: true, example: 'Entrevista técnica inicial' }
                    }
                },
                Experiencia: {
                    type: 'object',
                    required: ['candidato_id', 'empresa', 'cargo_ejercido', 'meses_duracion'],
                    properties: {
                        id:              { type: 'integer', readOnly: true, example: 1 },
                        candidato_id:    { type: 'integer', example: 3 },
                        empresa:         { type: 'string', example: 'Empresa XYZ' },
                        cargo_ejercido:  { type: 'string', example: 'Analista de Sistemas' },
                        meses_duracion:  { type: 'integer', example: 24 }
                    }
                },
                Usuario: {
                    type: 'object',
                    required: ['nombre_usuario', 'password', 'rol'],
                    properties: {
                        id:               { type: 'integer', readOnly: true, example: 1 },
                        nombre_usuario:   { type: 'string', example: 'admin_sistema' },
                        password:         { type: 'string', format: 'password', writeOnly: true, example: 'password' },
                        rol:              { type: 'string', enum: ['ADMIN', 'ENTREVISTADOR'], example: 'ADMIN' },
                        entrevistador_id: { type: 'integer', nullable: true, example: null },
                        ultimo_login:     { type: 'string', format: 'date-time', readOnly: true, nullable: true },
                        estado:           { type: 'integer', enum: [0, 1], default: 1 }
                    }
                },
                LoginRequest: {
                    type: 'object',
                    required: ['nombre_usuario', 'password'],
                    properties: {
                        nombre_usuario: { type: 'string', example: 'admin_sistema' },
                        password:       { type: 'string', format: 'password', example: 'password' }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: { type: 'string', example: 'Mensaje de error' }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js']
};

module.exports = swaggerJsdoc(options);
