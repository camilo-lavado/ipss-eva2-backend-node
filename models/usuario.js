const db = require('../config/db');

class Usuario {
    constructor(id, nombre_usuario, password, rol, entrevistador_id, ultimo_login, estado) {
        this.id = id;
        this.nombre_usuario = nombre_usuario;
        this.password = password;
        this.rol = rol;
        this.entrevistador_id = entrevistador_id;
        this.ultimo_login = ultimo_login;
        this.estado = estado;
    }

   // Métodos para interactuar con la base de datos usando jsonBody

    static async crear(jsonBody) {
        const { nombre_usuario, password, rol, entrevistador_id, ultimo_login, estado } = jsonBody;
        const [result] = await db.execute(
            'INSERT INTO usuarios (nombre_usuario, password, rol, entrevistador_id, ultimo_login, estado) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre_usuario, password, rol, entrevistador_id, ultimo_login, estado]
        );
        return new Usuario(result.insertId, nombre_usuario, password, rol, entrevistador_id, ultimo_login, estado);
    }
    
    static async obtenerPorId(id) {
        const [rows] = await db.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
        if (rows.length === 0) return null;
        const { nombre_usuario, password, rol, entrevistador_id, ultimo_login, estado } = rows[0];
        return new Usuario(id, nombre_usuario, password, rol, entrevistador_id, ultimo_login, estado);
    }

    static async actualizar(id, jsonBody) {
        const { nombre_usuario, password, rol, entrevistador_id, ultimo_login, estado } = jsonBody;
        await db.execute(
            'UPDATE usuarios SET nombre_usuario = ?, password = ?, rol = ?, entrevistador_id = ?, ultimo_login = ?, estado = ? WHERE id = ?',
            [nombre_usuario, password, rol, entrevistador_id, ultimo_login, estado, id]
        );
        return new Usuario(id, nombre_usuario, password, rol, entrevistador_id, ultimo_login, estado);
    }
    
    static async eliminar(id) {
        await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);
    }

    static async listar() {
        const [rows] = await db.execute('SELECT * FROM usuarios');
        return rows.map(row => new Usuario(row.id, row.nombre_usuario, row.password, row.rol, row.entrevistador_id, row.ultimo_login, row.estado));
    }
}

module.exports = Usuario;