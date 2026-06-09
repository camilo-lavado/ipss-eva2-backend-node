const { Entrevista, sequelize } = require('../models');

const getEntrevistas = async (req, res) => {
    try {
        const entrevistas = await Entrevista.findAll();
        res.json(entrevistas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEntrevistaById = async (req, res) => {
    try {
        const entrevista = await Entrevista.findByPk(req.params.id);
        if (!entrevista) {
            return res.status(404).json({ error: 'Entrevista no encontrada' });
        }
        res.json(entrevista);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createEntrevista = async (req, res) => {
    try {
        const resultado = await sequelize.transaction(async (t) => {
            const data = { ...req.body };
            if (!data.estado) data.estado = 'PROGRAMADA';
            return await Entrevista.create(data, { transaction: t });
        });
        res.status(201).json(resultado);
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({ error: 'cargo_id, candidato_id o entrevistador_id no existen' });
        }
        res.status(error.status || 500).json({ error: error.message });
    }
};

const updateEntrevista = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {
            const [actualizado] = await Entrevista.update(req.body, {
                where: { id: req.params.id },
                transaction: t
            });
            if (!actualizado) {
                const error = new Error('Entrevista no encontrada');
                error.status = 404;
                throw error;
            }
        });

        const entrevistaActualizada = await Entrevista.findByPk(req.params.id);
        res.json(entrevistaActualizada);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const deleteEntrevista = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {
            const eliminado = await Entrevista.destroy({ where: { id: req.params.id }, transaction: t });
            if (!eliminado) {
                const error = new Error('Entrevista no encontrada');
                error.status = 404;
                throw error;
            }
        });
        res.json({ message: 'Entrevista eliminada correctamente' });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

module.exports = { getEntrevistas, getEntrevistaById, createEntrevista, updateEntrevista, deleteEntrevista };
