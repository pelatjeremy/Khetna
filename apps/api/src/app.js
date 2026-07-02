import cors from 'cors';
import express from 'express';
import analysisRoutes from './routes/analysis.routes.js';
import healthRoutes from './routes/health.routes.js';
import recommendationRoutes from './routes/recommendation.routes.js';
import versionRoutes from './routes/version.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { notFoundMiddleware } from './middlewares/notFound.middleware.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/health', healthRoutes);
  app.use('/version', versionRoutes);
  app.use('/analysis', analysisRoutes);
  app.use('/recommendation', recommendationRoutes);
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}
