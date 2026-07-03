import { Router } from 'express';
import { createAnalysis } from '../controllers/analysis.controller.js';
import { saveAnalysis } from '../controllers/persistence.controller.js';

const router = Router();

router.post('/', createAnalysis);
router.post('/save', saveAnalysis);

export default router;
