import mongoose from 'mongoose';
import { assetSchema } from '../schemas/asset.schema.js';

export const Asset = mongoose.models.Asset || mongoose.model('Asset', assetSchema);
