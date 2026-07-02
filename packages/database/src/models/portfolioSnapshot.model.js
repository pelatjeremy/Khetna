import mongoose from 'mongoose';
import { portfolioSnapshotSchema } from '../schemas/portfolioSnapshot.schema.js';

export const PortfolioSnapshot =
  mongoose.models.PortfolioSnapshot || mongoose.model('PortfolioSnapshot', portfolioSnapshotSchema);
