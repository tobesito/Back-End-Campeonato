import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Equipo = sequelize.define('equipos', {
    equipoid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    paisRepresentado: {
        type: Sequelize.STRING
    },
    club: {
        type: Sequelize.STRING
    },
    entrenador: {
        type: Sequelize.STRING
    },
},
    {
        timestamps: false
    }
);

export default Equipo;