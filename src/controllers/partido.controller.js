import Equipo from '../models/Equipo';
import Partido from '../models/Partido';
import Torneo from '../models/Torneo';

export async function createPartido(req, res) {
    const { fecha_hora, equipo1_id, equipo2_id, puntos_equipo1, puntos_equipo2, orden_partido, estado, torneo_id } = req.body;
    const newPartido = await Partido.create({
        fecha_hora,
        equipo1_id,
        equipo2_id,
        puntos_equipo1,
        puntos_equipo2,
        orden_partido,
        estado,
        torneo_id
    }, {
        fields: ['fecha_hora', 'equipo1_id', 'equipo2_id', 'puntos_equipo1', 'puntos_equipo2', 'orden_partido', 'estado', 'torneo_id']
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
        ],
        order: [
            ['partido_id', 'DESC']
        ]
    });
    res.json(partidos);
}

export async function getOnePartido(req, res) {
    const { partido_id } = req.params;
    const partido = await Partido.findOne({
        include: [
            { model: Equipo, as: 'equipo1' },
            { model: Equipo, as: 'equipo2' },
        ],
        where: {
            partido_id
        }
    });

    res.json(partido);
}

export async function deletePartido(req, res) {
    const { partido_id } = req.params;
    await Partido.destroy({
        where: {
            partido_id
        }
    });
    res.json({
        message: 'Se ha eliminado el Partido exitosamente'
    });
}

export async function updatePartido(req, res) {
    const { partido_id } = req.params;
    const { fecha_hora, equipo1_id, equipo2_id, puntos_equipo1, puntos_equipo2, orden_partido, estado, torneo_id } = req.body;

    await Partido.findOne({
        include: [
            { model: Equipo, as: 'equipo1' },
            { model: Equipo, as: 'equipo2' },
            // { model: Torneo }
        ],
        attributes: ['fecha_hora', 'equipo1_id', 'equipo2_id', 'puntos_equipo1', 'puntos_equipo2', 'orden_partido', 'estado', 'torneo_id'],
        where: { partido_id }
    });

    const updatedPartido = await Partido.update({
        fecha_hora,
        equipo1_id,
        equipo2_id,
        puntos_equipo1,
        puntos_equipo2,
        orden_partido,
        estado,
        etapa_id
    }, {
        where: { partido_id }
    });

    res.json({
        message: 'Partido actualizado',
        updatedPartido
    });
}
