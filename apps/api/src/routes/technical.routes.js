import { Router } from 'express';
import { createTechnical } from '../controllers/technical.controller.js';

const router = Router();

router.post('/', createTechnical);

export default router;
