import 'dotenv/config';
import { createApp } from './app.js';
import { apiConfig } from './config/api.config.js';

const app = createApp();

app.listen(apiConfig.port, () => {
  console.log(`API listening on port ${apiConfig.port}`);
});
