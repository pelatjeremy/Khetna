import mongoose from 'mongoose';
import { evaluationSchema } from '../schemas/evaluation.schema.js';

export const Evaluation =
  mongoose.models.Evaluation || mongoose.model('Evaluation', evaluationSchema);
