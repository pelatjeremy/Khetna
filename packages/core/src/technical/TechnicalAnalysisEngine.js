import { TechnicalAnalysisContract } from '../contracts/index.js';
import { TechnicalIndicatorProvider } from './TechnicalIndicatorProvider.js';
import { TechnicalSnapshotMapper } from './TechnicalSnapshotMapper.js';

const REQUIRED_CANDLES = 200;

export class TechnicalAnalysisEngine extends TechnicalAnalysisContract {
  constructor({
    indicatorProvider = new TechnicalIndicatorProvider(),
    snapshotMapper = new TechnicalSnapshotMapper(),
  } = {}) {
    super();
    this.indicatorProvider = indicatorProvider;
    this.snapshotMapper = snapshotMapper;
  }

  async analyze(marketData) {
    const candles = this.normalizeCandles(marketData);

    if (candles.length < REQUIRED_CANDLES) {
      return this.snapshotMapper.toError({
        requiredCandles: REQUIRED_CANDLES,
        receivedCandles: candles.length,
      });
    }

    const indicators = this.indicatorProvider.calculateIndicators(candles);

    return this.snapshotMapper.toTechnicalSnapshot({
      symbol: marketData?.symbol ?? marketData?.assetId ?? null,
      timestamp: this.resolveTimestamp(marketData, candles),
      source: marketData?.source ?? marketData?.provider ?? null,
      indicators,
    });
  }

  async getIndicators(marketData) {
    const result = await this.analyze(marketData);

    return result?.snapshot
      ? {
          ema20: result.snapshot.ema20,
          ema50: result.snapshot.ema50,
          ema100: result.snapshot.ema100,
          ema200: result.snapshot.ema200,
          rsi14: result.snapshot.rsi14,
        }
      : {};
  }

  async getTrendSummary(marketData) {
    void marketData;

    return null;
  }

  normalizeCandles(marketData) {
    const source = Array.isArray(marketData)
      ? marketData
      : (marketData?.candles ?? marketData?.history ?? marketData?.prices ?? []);

    return source
      .map((candle) => this.normalizeCandle(candle))
      .filter((candle) => Number.isFinite(candle.close));
  }

  normalizeCandle(candle) {
    if (typeof candle === 'number') {
      return {
        close: candle,
        timestamp: null,
      };
    }

    return {
      close: Number(candle?.close ?? candle?.c ?? candle?.currentPrice ?? candle?.price),
      timestamp: candle?.timestamp ?? null,
    };
  }

  resolveTimestamp(marketData, candles) {
    return marketData?.timestamp ?? candles.at(-1)?.timestamp ?? null;
  }
}
