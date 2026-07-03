import { sendSuccess } from './response.controller.js';

export const getHealth = (_request, response) => {
  sendSuccess(response, {
    status: 'ok',
    service: 'tradeai-api',
  });
};
