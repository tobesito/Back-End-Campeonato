import Torneo from '../models/Torneo';

export async function createTorneo(req, res) {
    const { nombre, lugar, fechaInicio, fechaFin, jugadoresPorEquipo, observaciones } = req.body;
    const newTorneo = await Torneo.create({
        nombre,
        lugar,
        fechaInicio,
        fechaFin,
        jugadoresPorEquipo,
        observaciones
    }, {
        fields: ['nombre', 'lugar', 'fechaInicio', 'fechaFin', 'jugadoresPorEquipo', 'observaciones']
    });
    res.json({
        message: 'Se ha creado una nueva Torneo exitosamente'
    });
}

export async function getTorneos(req, res) {
    const torneos = await Torneo.findAll({
        attributes: ['torneoid', 'nombre', 'lugar', 'fechaInicio', 'fechaFin', 'jugadoresPorEquipo', 'observaciones'],
        order: [
            ['torneoid', 'DESC']
        ]
    });
    res.json(torneos);
}

export async function getOneTorneo(req, res) {
    const { torneoid } = req.params;
    const torneo = await Torneo.findOne({
        where: {
            torneoid
        }
    });

    res.json(torneo);
}

export async function deleteTorneo(req, res) {
    const { torneoid } = req.params;
    await Torneo.destroy({
        where: {
            torneoid
        }
    });
    res.json({
        message: 'Se ha eliminado el Torneo exitosamente'
    });
}

export async function updateTorneo(req, res) {
    const { torneoid } = req.params;
    const { nombre, lugar, fechaInicio, fechaFin, jugadoresPorEquipo, observaciones } = req.body;

    await Torneo.findOne({
        attributes: ['torneoid', 'nombre', 'lugar', 'fechaInicio', 'fechaFin', 'jugadoresPorEquipo', 'observaciones'],
        where: { torneoid }
    });

    const updatedTorneo = await Torneo.update({
        nombre,
        lugar,
        fechaInicio,
        fechaFin,
        jugadoresPorEquipo,
        observaciones
    }, {
        where: { torneoid }
    });

    res.json({
        message: 'Torneo actualizado',
        updatedTorneo
    });
}
