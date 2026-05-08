'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Cargos 
    await queryInterface.bulkInsert('cargos', [
      { titulo: 'Desarrollador Fullstack', departamento: 'Tecnología', estado: 1 },
      { titulo: 'Analista Contable', departamento: 'Finanzas', estado: 1 },
      { titulo: 'Ingeniero de Proyectos', departamento: 'Operaciones', estado: 0 },
      { titulo: 'Ejecutivo Comercial', departamento: 'Ventas', estado: 1 }
    ], {});

    // 2. Candidatos
    await queryInterface.bulkInsert('candidatos', [
      { nombres: 'Javier', apellidos: 'Pavez Muñoz', email: 'javier.munoz@email.cl', telefono: '+56987554321' },
      { nombres: 'Gonzalo', apellidos: 'Tapia Rojo', email: 'g.tapia.r@gmail.com', telefono: '+56922345678' },
      { nombres: 'Valeria', apellidos: 'Soto Valdés', email: 'vale.soto@outlook.cl', telefono: '+56956544433' },
      { nombres: 'Mauricio', apellidos: 'Lagos Contreras', email: 'mlagos@vtr.net', telefono: '+56999687766' }
    ], {});

    // 3. Entrevistadores
    await queryInterface.bulkInsert('entrevistadores', [
      { nombres: 'Cristian', apellidos: 'Fuenzalida', email: 'cfuenzalida@empresa.cl', especialidad: 'Recursos Humanos' },
      { nombres: 'Loreto', apellidos: 'Aravena', email: 'laravena@empresa.cl', especialidad: 'Tecnología' },
      { nombres: 'Sebastián', apellidos: 'Errázuriz', email: 'serrazuriz@empresa.cl', especialidad: 'Finanzas' }
    ], {});

    // 4. Experiencias
    await queryInterface.bulkInsert('experiencias', [
      { candidato_id: 1, empresa: 'Banco Estado', cargo_ejercido: 'Desarrollador Junior', meses_duracion: 24 },
      { candidato_id: 1, empresa: 'Cornershop', cargo_ejercido: 'Software Engineer', meses_duracion: 12 },
      { candidato_id: 2, empresa: 'Codelco', cargo_ejercido: 'Asistente Administrativo', meses_duracion: 36 },
      { candidato_id: 3, empresa: 'Falabella', cargo_ejercido: 'Analista de Riesgo', meses_duracion: 18 },
      { candidato_id: 4, empresa: 'Sonda', cargo_ejercido: 'Soporte Técnico', meses_duracion: 48 }
    ], {});

    // 5. Usuarios (con contraseña hasheada "password" para todos los usuarios)
    await queryInterface.bulkInsert('usuarios', [
      { nombre_usuario: 'admin_sistema', password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', rol: 'ADMIN', entrevistador_id: null, estado: 1 },
      { nombre_usuario: 'l_aravena', password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', rol: 'ENTREVISTADOR', entrevistador_id: 2, estado: 1 },
      { nombre_usuario: 's_errazuriz', password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', rol: 'ENTREVISTADOR', entrevistador_id: 3, estado: 1 }
    ], {});

    // 6. Entrevistas
    await queryInterface.bulkInsert('entrevistas', [
      { cargo_id: 1, candidato_id: 1, entrevistador_id: 2, fecha_hora: '2026-04-10 10:30:00', estado: 'PROGRAMADA', observaciones: 'Primera entrevista técnica via Meet' },
      { cargo_id: 2, candidato_id: 3, entrevistador_id: 3, fecha_hora: '2026-04-11 15:00:00', estado: 'PROGRAMADA', observaciones: 'Revisión de casos contables' },
      { cargo_id: 1, candidato_id: 2, entrevistador_id: 2, fecha_hora: '2026-04-05 09:00:00', estado: 'REALIZADA', observaciones: 'Candidato con buen perfil, pero falta manejo de Node.js' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('entrevistas', null, {});
    await queryInterface.bulkDelete('usuarios', null, {});
    await queryInterface.bulkDelete('experiencias', null, {});
    await queryInterface.bulkDelete('entrevistadores', null, {});
    await queryInterface.bulkDelete('candidatos', null, {});
    await queryInterface.bulkDelete('cargos', null, {});
  }
};