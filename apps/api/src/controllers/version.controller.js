import { sendSuccess } from './response.controller.js';

export const getVersion = (_request, response) => {
  sendSuccess(response, {
    name: 'TradeAI API',
    version: '2.0.0',
  });
};
