import Equipo from '../models/Equipo';
import Jugador from '../models/Jugador';

export async function createJugador(req, res) {
    const { nombre, equipoid, posicion } = req.body;
    const newJugador = await Jugador.create({
        nombre,
        equipoid,
        posicion
    }, {
        fields: ['nombre', 'equipoid', 'posicion']
    });
    res.json({
        message: 'Se ha creado un nuevo Jugador exitosamente'
    });
}

export async function getJugadores(req, res) {
    const jugadores = await Jugador.findAll({
        include: [Equipo],
        attributes: ['nombre', 'equipoid', 'posicion'],
        order: [
            ['jugadorid', 'DESC']
        ]
    });
    res.json(jugadores);
}

export async function getOneJugador(req, res) {
    const { jugadorid } = req.params;
    const jugador = await Jugador.findOne({
        include: [Equipo],
        where: {
            jugadorid
        }
    });

    res.json(jugador);
}

export async function deleteJugador(req, res) {
    const { jugadorid } = req.params;
    await Jugador.destroy({
        where: {
            jugadorid
        }
    });
    res.json({
        message: 'Se ha eliminado el Jugador exitosamente'
    });
}

export async function updateJugador(req, res) {
    const { jugadorid } = req.params;
    const { nombre, equipoid, posicion } = req.body;

    await Jugador.findOne({
        include: [Equipo],
        attributes: ['nombre', 'equipoid', 'posicion'],
        where: { jugadorid }
    });

    const updatedJugador = await Jugador.update({
        nombre,
        equipoid,
        posicion
    }, {
        where: { jugadorid }
    });

    res.json({
        message: 'Jugador actualizado',
        updatedJugador
    });
}
