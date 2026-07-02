export class TechnicalSnapshotMapper {
  toTechnicalSnapshot({ symbol, timestamp, source, indicators }) {
    return {
      success: true,
      snapshot: {
        symbol,
        timestamp,
        source,
        ema20: indicators.ema20,
        ema50: indicators.ema50,
        ema100: indicators.ema100,
        ema200: indicators.ema200,
        rsi14: indicators.rsi14,
      },
    };
  }

  toError({ requiredCandles, receivedCandles }) {
    return {
      success: false,
      error: {
        code: 'INSUFFICIENT_MARKET_DATA',
        message: 'Not enough market data to compute technical indicators.',
        requiredCandles,
        receivedCandles,
      },
    };
  }
}
