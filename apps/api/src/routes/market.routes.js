import { Router } from 'express';
import { createMarket } from '../controllers/market.controller.js';

const router = Router();

router.post('/', createMarket);

export default router;
