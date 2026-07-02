import cors from 'cors';
import express from 'express';
import healthRoutes from './routes/health.routes.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/health', healthRoutes);

  return app;
}
