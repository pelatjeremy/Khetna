import cors from 'cors';
import express from 'express';
import analysisRoutes from './routes/analysis.routes.js';
import healthRoutes from './routes/health.routes.js';
import marketRoutes from './routes/market.routes.js';
import portfolioRoutes from './routes/portfolio.routes.js';
import recommendationRoutes from './routes/recommendation.routes.js';
import technicalRoutes from './routes/technical.routes.js';
import versionRoutes from './routes/version.routes.js';
import { sendError } from './controllers/response.controller.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/health', healthRoutes);
  app.use('/version', versionRoutes);
  app.use('/market', marketRoutes);
  app.use('/technical', technicalRoutes);
  app.use('/analysis', analysisRoutes);
  app.use('/recommendation', recommendationRoutes);
  app.use('/portfolio', portfolioRoutes);
  app.use((_request, response) =>
    sendError(response, {
      statusCode: 404,
      code: 'NOT_FOUND',
      message: 'Route not found',
    }),
  );
  app.use((error, _request, response, _next) =>
    sendError(response, {
      statusCode: error.statusCode || 500,
      code: error.code,
      message: error.message,
    }),
  );

  return app;
}
