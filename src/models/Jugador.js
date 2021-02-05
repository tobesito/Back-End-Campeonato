import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Equipo from './Equipo';

const Jugador = sequelize.define('jugadores', {
    jugadorid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    equipoid: {
        type: Sequelize.INTEGER
    },
    posicion: {
        type: Sequelize.STRING
    },
},
    {
        timestamps: false
    }
);

//Relaciones "hasOne/hasMany"
Jugador.hasOne(Equipo, { foreignKey: 'equipoid', sourceKey: 'equipoid' });

//Relaciones "belongsTo/belongsToMany"
Equipo.belongsTo(Jugador, { foreignKey: 'equipoid' });

export default Jugador;