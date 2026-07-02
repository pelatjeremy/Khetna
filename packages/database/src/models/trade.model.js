import mongoose from 'mongoose';
import { tradeSchema } from '../schemas/trade.schema.js';

export const Trade = mongoose.models.Trade || mongoose.model('Trade', tradeSchema);
