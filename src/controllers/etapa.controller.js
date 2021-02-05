import Etapa from '../models/Etapa';

export async function createEtapa(req, res) {
    const { nombre, siguienteEtapaid, anteriorEtapaid } = req.body;
    const newEtapa = await Etapa.create({
        nombre,
        siguienteEtapaid,
        anteriorEtapaid
    }, {
        fields: ['nombre', 'siguienteEtapaid', 'anteriorEtapaid']
    });
    res.json({
        message: 'Se ha creado una nueva Etapa exitosamente'
    });
}

export async function getEtapas(req, res) {
    const etapas = await Etapa.findAll({
        include: [
            { model: Etapa, as: 'etapaAnterior',
            attributes: ['etapaid', 'nombre'] },
            { model: Etapa, as: 'etapaSiguiente',
            attributes: ['etapaid', 'nombre'] }
        ],
        attributes: ['etapaid', 'nombre', 'siguienteEtapaid', 'anteriorEtapaid'],
        order: [
            ['etapaid', 'DESC']
        ]
    });
    res.json(etapas);
}

export async function getOneEtapa(req, res) {
    const { etapaid } = req.params;
    const etapa = await Etapa.findOne({
        where: {
            etapaid
        }
    });

    res.json(etapa);
}

export async function deleteEtapa(req, res) {
    const { etapaid } = req.params;
    await Etapa.destroy({
        where: {
            etapaid
        }
    });
    res.json({
        message: 'Se ha eliminado la Etapa exitosamente'
    });
}

export async function updateEtapa(req, res) {
    const { etapaid } = req.params;
    const { nombre, siguienteEtapaid, anteriorEtapaid } = req.body;

    await Etapa.findOne({
        attributes: ['nombre', 'siguienteEtapaid', 'anteriorEtapaid'],
        where: { etapaid }
    });

    const updatedEtapa = await Etapa.update({
        nombre,
        siguienteEtapaid,
        anteriorEtapaid
    }, {
        where: { etapaid }
    });

    res.json({
        message: 'Etapa actualizada',
        updatedEtapa
    });
}
