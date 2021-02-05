import {Router} from 'express';
import { createEquipo, getEquipos, getOneEquipo, deleteEquipo, updateEquipo } from '../controllers/equipo.controller';

const router = Router();

// api/equipos/
router.post('/', createEquipo);
router.get('/', getEquipos);

// api/equipos/:equipoid
router.get('/:equipoid', getOneEquipo);
router.delete('/:equipoid', deleteEquipo);
router.put('/:equipoid', updateEquipo);


export default router;