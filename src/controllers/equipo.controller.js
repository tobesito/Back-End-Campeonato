import Equipo from '../models/Equipo';
import Jugador from '../models/Jugador';

export async function createEquipo(req, res) {
    const { nombre, pais_representado, club, entrenador } = req.body;
    try {
        const newEquipo = await Equipo.create({
            nombre,
            pais_representado,
            club,
            entrenador
        }, {
            fields: ['nombre', 'pais_representado', 'club', 'entrenador']
        });
        if (newEquipo) {
            res.json('Se ha creado un nuevo Equipo exitosamente');
        }
    }
    catch (e) {
        res.status(500).json('Algo salió mal' + e);
    }
}

export async function getEquipos(req, res) {
    try {
        const equipos = await Equipo.findAll({
            include: [Jugador],
            order: [
                ['equipo_id', 'DESC']
            ]
        });
        res.json(equipos);
    } catch (e) {
        res.json('Algo salió mal' + e);
    }

}

export async function getOneEquipo(req, res) {
    const { equipo_id } = req.params;
    try {
        const equipo = await Equipo.findOne({
            where: {
                equipo_id
            }
        });

        res.json(equipo);
    }
    catch (e) {
        res.json('Algo salió mal' + e);
    }
}

export async function deleteEquipo(req, res) {
    const { equipo_id } = req.params;

    try {
        await Equipo.destroy({
            where: {
                equipo_id
            }
        });
        res.json({
            message: 'Se ha eliminado el Equipo exitosamente'
        });
    }
    catch (e) {
        res.json('Algo salió mal' + e);
    }
}

export async function updateEquipo(req, res) {
    const { equipo_id } = req.params;
    const { nombre, pais_representado, club, entrenador } = req.body;

    try {
        await Equipo.findOne({
            attributes: ['nombre', 'pais_representado', 'club', 'entrenador'],
            where: { equipo_id }
        });

        const updatedEquipo = await Equipo.update({
            nombre,
            pais_representado,
            club,
            entrenador
        }, {
            where: { equipo_id }
        });

        res.json({
            message: 'Equipo actualizado',
            updatedEquipo
        });
    }
    catch (e) {
        res.json('Algo salió mal' + e);
    }
}
