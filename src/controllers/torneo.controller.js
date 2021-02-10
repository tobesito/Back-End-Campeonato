import Torneo from '../models/Torneo';
import Etapa from '../models/Etapa';
import Partido from '../models/Partido';
import Equipo from '../models/Equipo';
import Jugador from '../models/Jugador';

export async function createTorneo(req, res) {
    const { nombre, lugar, fecha_inicio, fecha_fin, cantidad_equipos, jugadores_por_equipo, observaciones } = req.body;

    try {
        const newTorneo = await Torneo.create({
            nombre,
            lugar,
            fecha_inicio,
            fecha_fin,
            cantidad_equipos,
            jugadores_por_equipo,
            observaciones
        }, {
            fields: ['nombre', 'lugar', 'fecha_inicio', 'fecha_fin', 'cantidad_equipos', 'jugadores_por_equipo', 'observaciones']
        });
        res.json('Se ha creado una nueva Torneo exitosamente');
    }
    catch (e) {
        res.status(500).json('Algo salió mal' + e);
    }
}

export async function getTorneos(req, res) {
    try {
        const torneos = await Torneo.findAll({
            order: [
                ['torneo_id', 'DESC']
            ]
        });
        res.json(torneos);
    }
    catch (e) {
        res.json('Algo salió mal' + e);
    }
}

export async function getOneTorneo(req, res) {
    const { torneo_id } = req.params;
    
    try {
        const torneo = await Torneo.findOne({
            include: [{
                model: Etapa, include: [
                    {
                        model: Partido,
                        include: [
                            {
                                model: Equipo, as: 'equipo1',
                                include: [
                                    Jugador
                                ]
                            },
                            {
                                model: Equipo, as: 'equipo2',
                                include: [
                                    Jugador
                                ]
                            }
                        ]
                    }
                ]
            }],
            where: {
                torneo_id
            }
        });
    
        res.json(torneo);
    }
    catch (e) {
        res.json('Algo salió mal' + e);
    }
}

export async function deleteTorneo(req, res) {
    const { torneo_id } = req.params;
    
    try {
        await Torneo.destroy({
            where: {
                torneo_id
            }
        });
        res.json('Se ha eliminado el Torneo exitosamente');
    }
    catch (e) {
        res.json('Algo salió mal' + e);
    }
}

export async function updateTorneo(req, res) {
    const { torneo_id } = req.params;
    const { nombre, lugar, fecha_inicio, fecha_fin, jugadores_por_equipo, observaciones } = req.body;

    try {
        await Torneo.findOne({
            attributes: ['torneo_id', 'nombre', 'lugar', 'fecha_inicio', 'fecha_fin', 'jugadores_por_equipo', 'observaciones'],
            where: { torneo_id }
        });
    
        const updatedTorneo = await Torneo.update({
            nombre,
            lugar,
            fecha_inicio,
            fecha_fin,
            jugadores_por_equipo,
            observaciones
        }, {
            where: { torneo_id }
        });
    
        res.json('Torneo actualizado');
    }
    catch (e) {
        res.json('Algo salió mal' + e);
    }
}
