import {Router} from 'express';
import { createJugador, getJugadores, getOneJugador, deleteJugador, updateJugador } from '../controllers/jugador.controller';

const router = Router();

// api/jugadores/
router.post('/', createJugador);
router.get('/', getJugadores);

// api/jugadores/:jugador_id
router.get('/:jugador_id', getOneJugador);
router.delete('/:jugador_id', deleteJugador);
router.put('/:jugador_id', updateJugador);


export default router;