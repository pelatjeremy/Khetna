export class FinnhubMarketDataProvider {
  constructor({ apiKey = process.env.FINNHUB_API_KEY, fetchFn = fetch } = {}) {
    this.apiKey = apiKey;
    this.fetchFn = fetchFn;
    this.baseUrl = 'https://finnhub.io/api/v1/quote';
  }

  async getLatestSnapshot(symbol) {
    return this.getQuote(symbol);
  }

  async getQuote(symbol) {
    if (!this.apiKey) {
      throw new Error('FINNHUB_API_KEY is required to use FinnhubMarketDataProvider.');
    }

    if (!symbol) {
      throw new Error('symbol is required to fetch market data.');
    }

    const normalizedSymbol = String(symbol).trim().toUpperCase();

    if (!normalizedSymbol) {
      throw new Error('symbol is required to fetch market data.');
    }

    const url = new URL(this.baseUrl);
    url.searchParams.set('symbol', normalizedSymbol);
    url.searchParams.set('token', this.apiKey);

    let response;

    try {
      response = await this.fetchFn(url);
    } catch (error) {
      throw new Error(`Finnhub quote request failed: ${error.message}`);
    }

    if (!response.ok) {
      throw new Error(`Finnhub quote request failed with status ${response.status}.`);
    }

    let data;

    try {
      data = await response.json();
    } catch {
      throw new Error(`Finnhub quote response is not valid JSON for ${normalizedSymbol}.`);
    }

    const currentPrice = data?.c;

    if (typeof currentPrice !== 'number' || !Number.isFinite(currentPrice) || currentPrice <= 0) {
      throw new Error(
        `Finnhub quote response does not contain a usable price for ${normalizedSymbol}.`,
      );
    }

    const timestamp =
      typeof data.t === 'number' && Number.isFinite(data.t) && data.t > 0
        ? new Date(data.t * 1000)
        : new Date();

    return {
      provider: 'finnhub',
      symbol: normalizedSymbol,
      price: currentPrice,
      volume: typeof data.v === 'number' && Number.isFinite(data.v) ? data.v : null,
      currency: 'USD',
      timestamp,
      raw: data,
    };
  }
}
