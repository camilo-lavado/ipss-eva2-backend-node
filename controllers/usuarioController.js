const Usuario = require('../models/usuario');

const crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await Usuario.crear(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
};

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.obtenerPorId(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const usuarioActualizado = await Usuario.actualizar(req.params.id, req.body);
        res.json(usuarioActualizado);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        await Usuario.eliminar(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
};

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.listar();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al listar usuarios:', error);
        res.status(500).json({ error: 'Error al listar usuarios' });
    }
};

const login = async (req, res) => {
    try {
        console.log("\n--- NUEVO INTENTO DE LOGIN ---");
        console.log("[DEBUG] Datos recibidos en body:", req.body);
        
        const { nombre_usuario, password } = req.body;

        if (!nombre_usuario || !password) {
            return res.status(400).json({ error: 'Faltan datos' });
        }

        const usuario = await Usuario.login(nombre_usuario, password);

        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas o usuario inactivo' });
        }

        res.json({ mensaje: 'Login exitoso', usuario });

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    crearUsuario,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario,
    listarUsuarios,
    login
};