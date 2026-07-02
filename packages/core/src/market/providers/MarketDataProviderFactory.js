import { FinnhubMarketDataProvider } from './FinnhubMarketDataProvider.js';

export class MarketDataProviderFactory {
  static create({ provider = process.env.MARKET_DATA_PROVIDER } = {}) {
    const providerName = provider ? String(provider).trim().toLowerCase() : 'finnhub';

    if (providerName === 'finnhub') {
      return new FinnhubMarketDataProvider();
    }

    throw new Error(`Unknown market data provider: ${providerName}.`);
  }
}
