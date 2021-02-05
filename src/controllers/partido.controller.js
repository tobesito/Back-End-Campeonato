import Equipo from '../models/Equipo';
import Partido from '../models/Partido';
import Torneo from '../models/Torneo';

export async function createPartido(req, res) {
    const { fechaHora, equipo1id, equipo2id, puntosEquipo1, puntosEquipo2, ordenPartido, estado, torneoid } = req.body;
    const newPartido = await Partido.create({
        fechaHora,
        equipo1id,
        equipo2id,
        puntosEquipo1,
        puntosEquipo2,
        ordenPartido,
        estado,
        torneoid
    }, {
        fields: ['fechaHora', 'equipo1id', 'equipo2id', 'puntosEquipo1', 'puntosEquipo2', 'ordenPartido', 'estado', 'torneoid']
    });
    res.json({
        message: 'Se ha creado una nueva Partido exitosamente'
    });
}

export async function getPartidos(req, res) {
    const partidos = await Partido.findAll({
        include: [
            { model: Equipo, as: 'equipo1' },
            { model: Equipo, as: 'equipo2' },
            { model: Torneo }
        ],
        attributes: ['fechaHora', 'equipo1id', 'equipo2id', 'puntosEquipo1', 'puntosEquipo2', 'ordenPartido', 'estado', 'torneoid'],
        order: [
            ['partidoid', 'DESC']
        ]
    });
    res.json(partidos);
}

export async function getOnePartido(req, res) {
    const { partidoid } = req.params;
    const partido = await Partido.findOne({
        include: [
            { model: Equipo, as: 'equipo1' },
            { model: Equipo, as: 'equipo2' },
            { model: Torneo }
        ],
        where: {
            partidoid
        }
    });

    res.json(partido);
}

export async function deletePartido(req, res) {
    const { partidoid } = req.params;
    await Partido.destroy({
        where: {
            partidoid
        }
    });
    res.json({
        message: 'Se ha eliminado el Partido exitosamente'
    });
}

export async function updatePartido(req, res) {
    const { partidoid } = req.params;
    const { fechaHora, equipo1id, equipo2id, puntosEquipo1, puntosEquipo2, ordenPartido, estado, torneoid } = req.body;

    await Partido.findOne({
        include: [
            { model: Equipo, as: 'equipo1' },
            { model: Equipo, as: 'equipo2' },
            { model: Torneo }
        ],
        attributes: ['fechaHora', 'equipo1id', 'equipo2id', 'puntosEquipo1', 'puntosEquipo2', 'ordenPartido', 'estado', 'torneoid'],
        where: { partidoid }
    });

    const updatedPartido = await Partido.update({
        fechaHora,
        equipo1id,
        equipo2id,
        puntosEquipo1,
        puntosEquipo2,
        ordenPartido,
        estado,
        torneoid
    }, {
        where: { partidoid }
    });

    res.json({
        message: 'Partido actualizado',
        updatedPartido
    });
}
