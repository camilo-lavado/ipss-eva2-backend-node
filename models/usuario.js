const db = require('../config/db');
const bcrypt = require('bcrypt');

/*Se usa bcrypt para hashear las contraseñas */

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

    static async listar() {
        const [rows] = await db.execute(
            'SELECT id, nombre_usuario, rol, entrevistador_id, ultimo_login, estado FROM usuarios WHERE estado = 1'
        );
        return rows;
    }

    static async login(username, password) {
        const [rows] = await db.execute(
            'SELECT * FROM usuarios WHERE nombre_usuario = ? AND estado = 1',
            [username]
        );

        if (rows.length === 0) {
            return false;
        }

        const user = rows[0];
        
        // Compatibilidad con hashes generados por PHP en php son $2y$ mientras que bcrypt en Node.js espera $2a$
        const hashCompatible = user.password.replace(/^\$2y\$/, '$2a$'); 

        const validPassword = await bcrypt.compare(password, hashCompatible);

        if (validPassword) {
            await this.updateLastLogin(user.id);
            delete user.password;
            return user;
        }

        return false;
    }

    static async updateLastLogin(id) {
        await db.execute(
            'UPDATE usuarios SET ultimo_login = NOW() WHERE id = ?',
            [id]
        );
    }

    static async eliminar(id) {
        const [result] = await db.execute(
            'DELETE FROM usuarios WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }

    static async softDelete(id) {
        const [result] = await db.execute(
            'UPDATE usuarios SET estado = 0 WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }

    static async obtenerPorId(id) {
        const [rows] = await db.execute(
            'SELECT id, nombre_usuario, rol, entrevistador_id, ultimo_login, estado FROM usuarios WHERE id = ?',
            [id]
        );
        return rows.length > 0 ? rows[0] : null;
    }

    static async crear(jsonBody) {
        const { nombre_usuario, password, rol, entrevistador_id } = jsonBody;
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.execute(
            'INSERT INTO usuarios (nombre_usuario, password, rol, entrevistador_id) VALUES (?, ?, ?, ?)',
            [nombre_usuario, hashedPassword, rol, entrevistador_id || null]
        );
        return result.insertId;
    }

    static async actualizar(id, jsonBody) {
        const { nombre_usuario, rol, entrevistador_id } = jsonBody;
        const [result] = await db.execute(
            'UPDATE usuarios SET nombre_usuario = ?, rol = ?, entrevistador_id = ? WHERE id = ?',
            [nombre_usuario, rol, entrevistador_id || null, id]
        );
        return result.affectedRows > 0;
    }

    static async nombreUsuarioExiste(nombre_usuario, excludeId = null) {
        let query = 'SELECT id FROM usuarios WHERE nombre_usuario = ?';
        const params = [nombre_usuario];

        if (excludeId) {
            query += ' AND id != ?';
            params.push(excludeId);
        }

        const [rows] = await db.execute(query, params);
        return rows.length > 0;
    }
}

module.exports = Usuario;