import Equipo from '../models/Equipo';

export async function createEquipo(req, res) {
    const { nombre, paisRepresentado, club, entrenador } = req.body;
    const newEquipo = await Equipo.create({
        nombre,
        paisRepresentado,
        club,
        entrenador
    }, {
        fields: ['nombre', 'paisRepresentado', 'club', 'entrenador']
    });
    res.json({
        message: 'Se ha creado un nuevo Equipo exitosamente'
    });
}

export async function getEquipos(req, res) {
    const equipos = await Equipo.findAll({
        attributes: ['nombre', 'paisRepresentado', 'club', 'entrenador'],
        order: [
            ['equipoid', 'DESC']
        ]
    });
    res.json(equipos);
}

export async function getOneEquipo(req, res) {
    const { equipoid } = req.params;
    const equipo = await Equipo.findOne({
        where: {
            equipoid
        }
    });

    res.json(equipo);
}

export async function deleteEquipo(req, res) {
    const { equipoid } = req.params;
    await Equipo.destroy({
        where: {
            equipoid
        }
    });
    res.json({
        message: 'Se ha eliminado el Equipo exitosamente'
    });
}

export async function updateEquipo(req, res) {
    const { equipoid } = req.params;
    const { nombre, paisRepresentado, club, entrenador } = req.body;

    await Equipo.findOne({
        attributes: ['nombre', 'paisRepresentado', 'club', 'entrenador'],
        where: { equipoid }
    });

    const updatedEquipo = await Equipo.update({
        nombre,
        paisRepresentado,
        club,
        entrenador
    }, {
        where: { equipoid }
    });

    res.json({
        message: 'Equipo actualizado',
        updatedEquipo
    });
}
