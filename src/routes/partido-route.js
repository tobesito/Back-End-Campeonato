import {Router} from 'express';
import { createPartido, getPartidos, getOnePartido, deletePartido, updatePartido } from '../controllers/partido.controller';

const router = Router();

// api/partidos/
router.post('/', createPartido);
router.get('/', getPartidos);

// api/partidos/:partidoid
router.get('/:partidoid', getOnePartido);
router.delete('/:partidoid', deletePartido);
router.put('/:partidoid', updatePartido);


export default router;