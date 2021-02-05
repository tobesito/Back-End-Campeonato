import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Etapa = sequelize.define('etapas', {
    etapaid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    anteriorEtapaid: {
        type: Sequelize.INTEGER
    },
    siguienteEtapaid: {
        type: Sequelize.INTEGER
    },
},
    {
        timestamps: false
    }
);

//Relaciones "hasOne/hasMany"
Etapa.hasOne(Etapa, { foreignKey: 'etapaid', sourceKey: 'anteriorEtapaid', as: 'etapaAnterior' });
Etapa.hasOne(Etapa, { foreignKey: 'etapaid', sourceKey: 'siguienteEtapaid', as: 'etapaSiguiente' });

//Relaciones "belongsTo/belongsToMany"
Etapa.belongsTo(Etapa, { foreignKey: 'etapaid', as: 'equipo1' });
Etapa.belongsTo(Etapa, { foreignKey: 'etapaid', as: 'equipo2' });



export default Etapa;