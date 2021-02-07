import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import Equipo from './Equipo';

const Jugador = sequelize.define('jugadores', {
    jugador_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    equipo_id: {
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
Jugador.hasOne(Equipo, { foreignKey: 'equipo_id', sourceKey: 'equipo_id' });

//Relaciones "belongsTo/belongsToMany"
Equipo.belongsTo(Jugador, { foreignKey: 'equipo_id' });

export default Jugador;