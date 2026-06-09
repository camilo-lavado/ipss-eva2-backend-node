const validarCandidato = (req, res, next) => {
    const { nombres, apellidos, email } = req.body || {};
    if (!nombres || !apellidos || !email) {
        return res.status(400).json({ error: 'nombres, apellidos y email son obligatorios' });
    }
    next();
};

const validarCargoCrear = (req, res, next) => {
    const { titulo, departamento } = req.body || {};
    if (!titulo || !departamento) {
        return res.status(400).json({ error: 'titulo y departamento son obligatorios' });
    }
    next();
};

const validarCargoActualizar = (req, res, next) => {
    const { titulo, departamento, estado } = req.body || {};
    if (!titulo || !departamento || estado === undefined) {
        return res.status(400).json({ error: 'titulo, departamento y estado son obligatorios' });
    }
    next();
};

const validarEntrevistador = (req, res, next) => {
    const { nombres, apellidos, email, especialidad } = req.body || {};
    if (!nombres || !apellidos || !email || !especialidad) {
        return res.status(400).json({ error: 'nombres, apellidos, email y especialidad son obligatorios' });
    }
    next();
};

const validarEntrevistaCrear = (req, res, next) => {
    const { cargo_id, candidato_id, entrevistador_id, fecha_hora } = req.body || {};
    if (!cargo_id || !candidato_id || !entrevistador_id || !fecha_hora) {
        return res.status(400).json({ error: 'cargo_id, candidato_id, entrevistador_id y fecha_hora son obligatorios' });
    }
    next();
};

const validarEntrevistaActualizar = (req, res, next) => {
    const { cargo_id, candidato_id, entrevistador_id, fecha_hora, estado } = req.body || {};
    if (!cargo_id || !candidato_id || !entrevistador_id || !fecha_hora || !estado) {
        return res.status(400).json({ error: 'cargo_id, candidato_id, entrevistador_id, fecha_hora y estado son obligatorios' });
    }
    next();
};

const validarExperiencia = (req, res, next) => {
    const { candidato_id, empresa, cargo_ejercido, meses_duracion } = req.body || {};
    if (!candidato_id || !empresa || !cargo_ejercido || !meses_duracion) {
        return res.status(400).json({ error: 'candidato_id, empresa, cargo_ejercido y meses_duracion son obligatorios' });
    }
    next();
};

const validarUsuarioCrear = (req, res, next) => {
    const { nombre_usuario, password, rol } = req.body || {};
    if (!nombre_usuario || !password || !rol) {
        return res.status(400).json({ error: 'nombre_usuario, password y rol son obligatorios' });
    }
    next();
};

const validarUsuarioActualizar = (req, res, next) => {
    const { nombre_usuario, rol } = req.body || {};
    if (!nombre_usuario || !rol) {
        return res.status(400).json({ error: 'nombre_usuario y rol son obligatorios' });
    }
    next();
};

module.exports = {
    validarCandidato,
    validarCargoCrear,
    validarCargoActualizar,
    validarEntrevistador,
    validarEntrevistaCrear,
    validarEntrevistaActualizar,
    validarExperiencia,
    validarUsuarioCrear,
    validarUsuarioActualizar
};
