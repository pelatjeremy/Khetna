import { createTradingIntegrationCore } from '@tradeai/core';

export const apiConfig = {
  port: process.env.API_PORT || 3001,
};

export const tradingCore = createTradingIntegrationCore();
