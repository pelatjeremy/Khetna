import mongoose from 'mongoose';
import { analysisSchema } from '../schemas/analysis.schema.js';

export const Analysis = mongoose.models.Analysis || mongoose.model('Analysis', analysisSchema);
