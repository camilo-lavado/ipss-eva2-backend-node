const Usuario = require('../models/usuario');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');

const crearUsuario = async (req, res) => {
    try {
        const resultado = await sequelize.transaction(async (t) => {
            return await Usuario.create(req.body, { transaction: t });
        });
        res.status(201).json(resultado);
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
        await sequelize.transaction(async (t) => {
            const [actualizado] = await Usuario.update(req.body, {
                where: { id: req.params.id },
                transaction: t
            });
            
            if (!actualizado) {
                const error = new Error('Usuario no encontrado');
                error.status = 404;
                throw error;
            }
        });
        
        const usuarioActualizado = await Usuario.findByPk(req.params.id);
        res.json(usuarioActualizado);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || 'Error al actualizar usuario' });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {
            const eliminado = await Usuario.destroy({
                where: { id: req.params.id },
                transaction: t
            });
            
            if (!eliminado) {
                const error = new Error('Usuario no encontrado');
                error.status = 404;
                throw error;
            }
        });
        res.status(204).send();
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || 'Error al eliminar usuario' });
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

        const resultado = await sequelize.transaction(async (t) => {
            const usuario = await Usuario.findOne({
                where: { nombre_usuario, estado: 1 },
                transaction: t
            });

            if (!usuario) {
                const error = new Error('Credenciales inválidas o usuario inactivo');
                error.status = 401;
                throw error;
            }

            const hashCompatible = usuario.password.replace(/^\$2y\$/, '$2a$'); 
            const validPassword = await bcrypt.compare(password, hashCompatible);

            if (!validPassword) {
                const error = new Error('Credenciales inválidas o usuario inactivo');
                error.status = 401;
                throw error;
            }

            await usuario.update({ ultimo_login: new Date() }, { transaction: t });
            
            const usuarioData = usuario.toJSON();
            delete usuarioData.password;
            return usuarioData;
        });

        res.json({ mensaje: 'Login exitoso', usuario: resultado });

    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || 'Error interno del servidor' });
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