import { EMA, RSI } from 'technicalindicators';

const EMA_PERIODS = [20, 50, 100, 200];
const RSI_PERIOD = 14;

export class TechnicalIndicatorProvider {
  calculateIndicators(candles) {
    const closePrices = candles.map((candle) => Number(candle.close));

    return {
      ema20: this.getLatestValue(EMA.calculate({ period: EMA_PERIODS[0], values: closePrices })),
      ema50: this.getLatestValue(EMA.calculate({ period: EMA_PERIODS[1], values: closePrices })),
      ema100: this.getLatestValue(EMA.calculate({ period: EMA_PERIODS[2], values: closePrices })),
      ema200: this.getLatestValue(EMA.calculate({ period: EMA_PERIODS[3], values: closePrices })),
      rsi14: this.getLatestValue(RSI.calculate({ period: RSI_PERIOD, values: closePrices })),
    };
  }

  getLatestValue(values) {
    return values.at(-1) ?? null;
  }
}
