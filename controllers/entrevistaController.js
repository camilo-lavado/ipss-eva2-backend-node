const Entrevista = require('../models/entrevista');

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
        const { cargo_id, candidato_id, entrevistador_id, fecha_hora } = req.body;
        if (!cargo_id || !candidato_id || !entrevistador_id || !fecha_hora) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }
        const data = { ...req.body };
        if (!data.estado) data.estado = 'PROGRAMADA';
        const nuevaEntrevista = await Entrevista.create(data);
        res.status(201).json(nuevaEntrevista);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEntrevista = async (req, res) => {
    try {
        const { cargo_id, candidato_id, entrevistador_id, fecha_hora, estado } = req.body;
        if (!cargo_id || !candidato_id || !entrevistador_id || !fecha_hora || !estado) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        const [actualizado] = await Entrevista.update(req.body, { where: { id: req.params.id } });
        if (!actualizado) {
            return res.status(404).json({ error: 'Entrevista no encontrada' });
        }
        const entrevistaActualizada = await Entrevista.findByPk(req.params.id);
        res.json(entrevistaActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteEntrevista = async (req, res) => {
    try {
        const eliminado = await Entrevista.destroy({ where: { id: req.params.id } });
        if (!eliminado) {
            return res.status(404).json({ error: 'Entrevista no encontrada' });
        }
        res.json({ message: 'Entrevista eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getEntrevistas, getEntrevistaById, createEntrevista, updateEntrevista, deleteEntrevista };