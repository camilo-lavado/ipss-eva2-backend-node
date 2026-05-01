const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

const crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await Usuario.create(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear usuario' });
    }
};

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const [actualizado] = await Usuario.update(req.body, {
            where: { id: req.params.id }
        });
        if (!actualizado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        const usuarioActualizado = await Usuario.findByPk(req.params.id);
        res.json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const eliminado = await Usuario.destroy({
            where: { id: req.params.id }
        });
        if (!eliminado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
};

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            where: { estado: 1 }
        });
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al listar usuarios' });
    }
};

const login = async (req, res) => {
    try {
        const { nombre_usuario, password } = req.body;

        if (!nombre_usuario || !password) {
            return res.status(400).json({ error: 'Faltan datos' });
        }

        const usuario = await Usuario.findOne({
            where: { nombre_usuario, estado: 1 }
        });

        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas o usuario inactivo' });
        }

        const hashCompatible = usuario.password.replace(/^\$2y\$/, '$2a$'); 
        const validPassword = await bcrypt.compare(password, hashCompatible);

        if (validPassword) {
            await usuario.update({ ultimo_login: new Date() });
            
            const usuarioData = usuario.toJSON();
            delete usuarioData.password;
            
            return res.json({ mensaje: 'Login exitoso', usuario: usuarioData });
        }

        return res.status(401).json({ error: 'Credenciales inválidas o usuario inactivo' });

    } catch (error) {
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