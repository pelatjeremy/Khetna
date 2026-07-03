import { apiDelegates } from '../config/api.config.js';
import { handleCorePost } from './response.controller.js';

export const createTechnical = handleCorePost(apiDelegates.technical);
