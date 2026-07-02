import { Router } from 'express';

const router = Router();

router.get('/', (_request, response) => {
  response.status(200).json({
    status: 'ok',
    service: 'tradeai-api',
    timestamp: new Date().toISOString(),
  });
});

export default router;
