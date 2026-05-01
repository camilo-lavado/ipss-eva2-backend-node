const Cargo = require('../models/cargo');

const getCargos = async (req, res) => {
    try {
        const cargos = await Cargo.findAll();
        res.json(cargos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCargoById = async (req, res) => {
    try {
        const cargo = await Cargo.findByPk(req.params.id);
        if (!cargo) {
            return res.status(404).json({ error: 'Cargo no encontrado' });
        }
        res.json(cargo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createCargo = async (req, res) => {
    try {
        const { titulo, departamento } = req.body;
        if (!titulo || !departamento) {
            return res.status(400).json({ error: 'Título y Departamento son obligatorios' });
        }
        const data = { ...req.body };
        if (data.estado === undefined) data.estado = 1; 
        const nuevoCargo = await Cargo.create(data);
        res.status(201).json(nuevoCargo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCargo = async (req, res) => {
    try {
        const { titulo, departamento, estado } = req.body;
        if (!titulo || !departamento || estado === undefined) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        const [actualizado] = await Cargo.update(req.body, { where: { id: req.params.id } });
        if (!actualizado) {
            return res.status(404).json({ error: 'Cargo no encontrado o no actualizado' });
        }
        const cargoActualizado = await Cargo.findByPk(req.params.id);
        res.json(cargoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCargo = async (req, res) => {
    try {
        const eliminado = await Cargo.destroy({ where: { id: req.params.id } });
        if (!eliminado) {
            return res.status(404).json({ error: 'Cargo no encontrado' });
        }
        res.json({ message: 'Cargo eliminado' });
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({ error: 'No se puede eliminar: el cargo tiene entrevistas asociadas.' });
        }
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getCargos, getCargoById, createCargo, updateCargo, deleteCargo };