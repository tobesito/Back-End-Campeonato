import {Router} from 'express';
import { createJugador, getJugadores, getOneJugador, deleteJugador, updateJugador } from '../controllers/jugador.controller';

const router = Router();

// api/jugadores/
router.post('/', createJugador);
router.get('/', getJugadores);

// api/jugadores/:jugadorid
router.get('/:jugadorid', getOneJugador);
router.delete('/:jugadorid', deleteJugador);
router.put('/:jugadorid', updateJugador);


export default router;