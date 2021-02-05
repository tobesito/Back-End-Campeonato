import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

import Equipo from './Equipo';
import Torneo from './Torneo';

const Partido = sequelize.define('partidos', {
    partidoid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fechaHora: {
        type: Sequelize.DATE
    },
    equipo1id: {
        type: Sequelize.INTEGER
    },
    equipo2id: {
        type: Sequelize.INTEGER
    },
    puntosEquipo1: {
        type: Sequelize.INTEGER
    },
    puntosEquipo2: {
        type: Sequelize.INTEGER
    },
    ordenPartido: {
        type: Sequelize.INTEGER
    },
    estado: {
        type: Sequelize.STRING
    },
    torneoid: {
        type: Sequelize.INTEGER
    },
},
    {
        timestamps: false
    }
);

//Relaciones "hasOne/hasMany"
Partido.hasOne(Equipo, { foreignKey: 'equipoid', sourceKey: 'equipo1id', as: 'equipo1' });
Partido.hasOne(Equipo, { foreignKey: 'equipoid', sourceKey: 'equipo2id', as: 'equipo2' });

Partido.hasOne(Torneo, { foreignKey: 'torneoid', sourceKey: 'torneoid' });

//Relaciones "belongsTo/belongsToMany"
Equipo.belongsTo(Partido, { foreignKey: 'equipoid', as: 'equipo1' });
Equipo.belongsTo(Partido, { foreignKey: 'equipoid', as: 'equipo2' });

Torneo.belongsTo(Partido, { foreignKey: 'torneoid' });


export default Partido;