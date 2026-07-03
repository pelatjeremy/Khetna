import { Router } from 'express';
import { savePortfolio } from '../controllers/portfolio.controller.js';

const router = Router();

router.post('/save', savePortfolio);

export default router;
