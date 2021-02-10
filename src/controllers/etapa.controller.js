import Etapa from '../models/Etapa';

export async function createEtapa(req, res) {
    const { nombre, torneo_id } = req.body;

    try {
        const newEtapa = await Etapa.create({
            nombre,
            torneo_id
        }, {
            fields: ['nombre', 'torneo_id']
        });
        res.json('Se ha creado una nueva Etapa exitosamente');
    }
    catch (e) {
        res.status(500).json('Algo salió mal' + e);
    }
}

export async function getEtapas(req, res) {
    try {
        const etapas = await Etapa.findAll({
            include: [
                {
                    model: Etapa, as: 'etapaAnterior',
                    attributes: ['etapa_id', 'nombre']
                },
                {
                    model: Etapa, as: 'etapaSiguiente',
                    attributes: ['etapa_id', 'nombre']
                }
            ],
            order: [
                ['etapa_id', 'DESC']
            ]
        });
        res.json(etapas);
    }
    catch (e) {
        res.json('Algo salió mal' + e);
    }
}

export async function getOneEtapa(req, res) {
    const { etapa_id } = req.params;

    try {
        const etapa = await Etapa.findOne({
            where: {
                etapa_id
            }
        });

        res.json(etapa);
    }
    catch (e) {
        res.json('Algo salió mal' + e);
    }
}

export async function deleteEtapa(req, res) {
    try {
        const { etapa_id } = req.params;
        await Etapa.destroy({
            where: {
                etapa_id
            }
        });
        res.json('Se ha eliminado la Etapa exitosamente');
    }
    catch (e) {
        res.json('Algo salió mal' + e);
    }
}

export async function updateEtapa(req, res) {
    const { etapa_id } = req.params;
    const { nombre, torneo_id } = req.body;

    try {
        await Etapa.findOne({
            attributes: ['nombre', 'torneo_id'],
            where: { etapa_id }
        });

        const updatedEtapa = await Etapa.update({
            nombre,
            torneo_id
        }, {
            where: { etapa_id }
        });

        res.json('Etapa actualizada');
    }
    catch (e) {
        res.json('Algo salió mal' + e);
    }
}
