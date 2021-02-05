import {Router} from 'express';
import { createTorneo, getTorneos, getOneTorneo, deleteTorneo, updateTorneo } from '../controllers/torneo.controller';

const router = Router();

// api/torneos/
router.post('/', createTorneo);
router.get('/', getTorneos);

// api/torneos/:torneoid
router.get('/:torneoid', getOneTorneo);
router.delete('/:torneoid', deleteTorneo);
router.put('/:torneoid', updateTorneo);


export default router;