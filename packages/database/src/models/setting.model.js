import mongoose from 'mongoose';
import { settingSchema } from '../schemas/setting.schema.js';

export const Setting = mongoose.models.Setting || mongoose.model('Setting', settingSchema);
