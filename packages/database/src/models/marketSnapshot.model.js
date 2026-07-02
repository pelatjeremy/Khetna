import mongoose from 'mongoose';
import { marketSnapshotSchema } from '../schemas/marketSnapshot.schema.js';

export const MarketSnapshot =
  mongoose.models.MarketSnapshot || mongoose.model('MarketSnapshot', marketSnapshotSchema);
