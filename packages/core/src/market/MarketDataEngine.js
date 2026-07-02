import { MarketDataProviderFactory } from './providers/MarketDataProviderFactory.js';
import { MarketSnapshotMapper } from './MarketSnapshotMapper.js';

export class MarketDataEngine {
  constructor({
    provider,
    providerFactory = MarketDataProviderFactory,
    providerName,
    mapper = new MarketSnapshotMapper(),
  } = {}) {
    this.provider = provider;
    this.providerFactory = providerFactory;
    this.providerName = providerName;
    this.mapper = mapper;
  }

  async getLatestSnapshot(symbol, options = {}) {
    return this.getSnapshot(symbol, options);
  }

  async getSnapshot(symbol, { providerName = this.providerName } = {}) {
    const normalizedSymbol = this.normalizeSymbol(symbol);

    try {
      const provider = this.resolveProvider(providerName);
      const quote = await this.fetchQuote(provider, normalizedSymbol);

      return this.normalizeSnapshot(quote, normalizedSymbol);
    } catch (error) {
      throw new Error(
        `Market data snapshot failed for ${normalizedSymbol}: ${this.cleanError(error)}`,
      );
    }
  }

  async getSnapshotHistory(assetId, options = {}) {
    // TODO: keep history options provider-neutral when the internal MarketSnapshot retrieval service is connected.
    return this.provider.getSnapshotHistory(assetId, options);
  }

  async prepareMarketContext(assetId, options = {}) {
    // TODO: extend this context preparation only with provider-neutral MarketSnapshot fields required by future engines.
    const snapshot = await this.getLatestSnapshot(assetId, options);

    return this.mapper.toMarketContext(snapshot);
  }

  normalizeSymbol(symbol) {
    if (!symbol) {
      throw new Error('symbol is required to fetch market data.');
    }

    const normalizedSymbol = String(symbol).trim().toUpperCase();

    if (!normalizedSymbol) {
      throw new Error('symbol is required to fetch market data.');
    }

    return normalizedSymbol;
  }

  resolveProvider(providerName) {
    if (this.provider) {
      return this.provider;
    }

    if (!this.providerFactory || typeof this.providerFactory.create !== 'function') {
      throw new Error('Market data provider factory is not configured.');
    }

    return this.providerFactory.create({ provider: providerName });
  }

  async fetchQuote(provider, symbol) {
    if (provider && typeof provider.getQuote === 'function') {
      return provider.getQuote(symbol);
    }

    if (provider && typeof provider.getLatestSnapshot === 'function') {
      return provider.getLatestSnapshot(symbol);
    }

    throw new Error('Market data provider cannot fetch quotes.');
  }

  normalizeSnapshot(quote, symbol) {
    const raw = quote?.raw ?? quote;
    const rawTimestamp = raw?.t ?? quote?.rawTimestamp ?? null;

    return {
      symbol: quote?.symbol ?? symbol,
      provider: quote?.provider ?? this.providerName ?? 'unknown',
      currentPrice: raw?.c ?? quote?.currentPrice ?? quote?.price ?? null,
      openPrice: raw?.o ?? quote?.openPrice ?? null,
      highPrice: raw?.h ?? quote?.highPrice ?? null,
      lowPrice: raw?.l ?? quote?.lowPrice ?? null,
      previousClosePrice: raw?.pc ?? quote?.previousClosePrice ?? null,
      timestamp: this.normalizeTimestamp(rawTimestamp, quote?.timestamp),
      rawTimestamp,
      source: quote?.source ?? quote?.provider ?? this.providerName ?? 'market-data-provider',
    };
  }

  normalizeTimestamp(rawTimestamp, fallbackTimestamp) {
    if (typeof rawTimestamp === 'number' && Number.isFinite(rawTimestamp) && rawTimestamp > 0) {
      return new Date(rawTimestamp * 1000);
    }

    return fallbackTimestamp ?? null;
  }

  cleanError(error) {
    let message = String(error?.message ?? error)
      .replace(/token=[^&\s]+/gi, 'token=[redacted]')
      .replace(/FINNHUB_API_KEY=[^&\s]+/gi, 'FINNHUB_API_KEY=[redacted]');

    for (const secret of [process.env.FINNHUB_API_KEY, this.provider?.apiKey]) {
      if (secret) {
        message = message.replaceAll(secret, '[redacted]');
      }
    }

    return message;
  }
}
