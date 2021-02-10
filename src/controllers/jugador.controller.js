import Equipo from '../models/Equipo';
import Jugador from '../models/Jugador';

export async function createJugador(req, res) {
    const { nombre, equipo_id, posicion } = req.body;

    try {
        const newJugador = await Jugador.create({
            nombre,
            equipo_id,
            posicion
        }, {
            fields: ['nombre', 'posicion', 'equipo_id']
        });
        res.json('Se ha creado un nuevo Jugador exitosamente');
    }
    catch (e) {
        res.status(500).json('Algo salió mal' + e);
    }
}

export async function getJugadores(req, res) {
    try {
        const jugadores = await Jugador.findAll({
            include: [Equipo],
            order: [
                ['jugador_id', 'DESC']
            ]
        });
        res.json(jugadores);
    }
    catch (e) {
        res.json('Algo salió mal' + e);
    }
}

export async function getOneJugador(req, res) {
    const { jugador_id } = req.params;

    try {
        const jugador = await Jugador.findOne({
            include: [Equipo],
            where: {
                jugador_id
            }
        });

        res.json(jugador);
    }
    catch (e) {
        res.json('Algo salió mal' + e);
    }
}

export async function deleteJugador(req, res) {
    const { jugador_id } = req.params;

    try {
        await Jugador.destroy({
            where: {
                jugador_id
            }
        });
        res.json('Se ha eliminado el Jugador exitosamente');
    }
    catch (e) {
        res.json('Algo salió mal' + e);
    }
}

export async function updateJugador(req, res) {
    const { jugador_id } = req.params;
    const { nombre, equipo_id, posicion } = req.body;

    try {
        await Jugador.findOne({
            include: [Equipo],
            attributes: ['nombre', 'equipo_id', 'posicion'],
            where: { jugador_id }
        });

        const updatedJugador = await Jugador.update({
            nombre,
            equipo_id,
            posicion
        }, {
            where: { jugador_id }
        });

        res.json('Jugador actualizado');
    }
    catch (e) {
        res.json('Algo salió mal' + e);
    }
}

export async function getJugadorByEquipo(req, res) {
    const { equipo_id } = req.params;

    try {
        const tasks = await Task.findAll({
            attributes: ['id', 'projectid', 'done', 'name'],
            where: { equipo_id }
        });
        res.json({ tasks });
    }
    catch (e) {
        res.json('Algo salió mal' + e);
    }
}
