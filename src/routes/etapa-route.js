import {Router} from 'express';
import { createEtapa, getEtapas, getOneEtapa, deleteEtapa, updateEtapa } from '../controllers/etapa.controller';

const router = Router();

// api/etapas/
router.post('/', createEtapa);
router.get('/', getEtapas);

// api/etapas/:etapaid
router.get('/:etapaid', getOneEtapa);
router.delete('/:etapaid', deleteEtapa);
router.put('/:etapaid', updateEtapa);


export default router;