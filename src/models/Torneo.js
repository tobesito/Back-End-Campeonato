import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Torneo = sequelize.define('torneos', {
    torneoid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    lugar: {
        type: Sequelize.STRING
    },
    fechaInicio: {
        type: Sequelize.DATE
    },
    fechaFin: {
        type: Sequelize.DATE
    },
    jugadoresPorEquipo: {
        type: Sequelize.INTEGER
    },
    observaciones: {
        type: Sequelize.TEXT
    },
},
    {
        timestamps: false
    }
);

export default Torneo;