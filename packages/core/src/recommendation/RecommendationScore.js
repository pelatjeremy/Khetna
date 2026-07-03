export const RECOMMENDATION_VALUES = [
  'BUY_STRONG',
  'BUY',
  'WATCH',
  'HOLD',
  'REDUCE',
  'SELL',
  'SELL_STRONG',
];

export const CONFIDENCE_VALUES = ['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'];

export class RecommendationScore {
  calculate(context = {}) {
    const components = {
      market: this.scoreMarket(context.marketSnapshot),
      technical: this.scoreTechnical(context.technicalSnapshot),
      ai: this.scoreAI(context.aiAnalysis),
    };

    const available = Object.values(components).filter((value) => Number.isFinite(value));

    if (available.length === 0) {
      return {
        score: 50,
        components,
        confidence: 'LOW',
        recommendation: 'WATCH',
        reasons: ['Insufficient source data; neutral recommendation kept.'],
        warnings: ['No usable market, technical or AI score was available.'],
      };
    }

    const score = this.clamp(
      available.reduce((total, value) => total + value, 0) / available.length,
    );

    return {
      score,
      components,
      confidence: this.mapConfidence(score, available.length),
      recommendation: this.mapRecommendation(score),
      reasons: this.buildReasons(components),
      warnings:
        available.length < 3 ? ['Recommendation score computed from partial source data.'] : [],
    };
  }

  aggregate(input = {}) {
    return this.calculate(input);
  }

  clamp(score) {
    const value = Number(score);

    if (!Number.isFinite(value)) {
      return 50;
    }

    return Math.min(100, Math.max(0, Math.round(value)));
  }

  scoreMarket(marketSnapshot) {
    const close = this.numberFrom(marketSnapshot, ['close', 'currentPrice', 'price']);
    const reference = this.numberFrom(marketSnapshot, [
      'previousClose',
      'previousClosePrice',
      'open',
      'openPrice',
    ]);

    if (!Number.isFinite(close) || !Number.isFinite(reference) || reference <= 0) {
      return null;
    }

    const percentMove = ((close - reference) / reference) * 100;
    return this.clamp(50 + percentMove * 4);
  }

  scoreTechnical(technicalSnapshot) {
    if (!technicalSnapshot || technicalSnapshot.success === false) {
      return null;
    }

    const snapshot = technicalSnapshot.snapshot ?? technicalSnapshot;
    const ema20 = this.numberFrom(snapshot, ['ema20']);
    const ema50 = this.numberFrom(snapshot, ['ema50']);
    const ema200 = this.numberFrom(snapshot, ['ema200']);
    const rsi14 = this.numberFrom(snapshot, ['rsi14', 'rsi']);
    let score = 50;
    let signals = 0;

    if (Number.isFinite(ema20) && Number.isFinite(ema50)) {
      score += ema20 > ema50 ? 10 : -10;
      signals += 1;
    }

    if (Number.isFinite(ema50) && Number.isFinite(ema200)) {
      score += ema50 > ema200 ? 10 : -10;
      signals += 1;
    }

    if (Number.isFinite(rsi14)) {
      signals += 1;
      if (rsi14 < 30) score += 12;
      else if (rsi14 > 70) score -= 12;
      else if (rsi14 >= 45 && rsi14 <= 60) score += 5;
    }

    return signals > 0 ? this.clamp(score) : null;
  }

  scoreAI(aiAnalysis) {
    if (!aiAnalysis || aiAnalysis.metadata?.success === false || aiAnalysis.metadata?.error) {
      return null;
    }

    const opportunities = this.asArray(aiAnalysis.opportunities).length;
    const risks = this.asArray(aiAnalysis.risks).length;
    const confidence = this.confidenceWeight(aiAnalysis.confidence);
    const summary = String(aiAnalysis.summary ?? '').toLowerCase();
    let score = 50 + opportunities * 7 - risks * 7 + confidence;

    if (/\b(growth|upside|positive|bullish|opportunity)\b/.test(summary)) score += 5;
    if (/\b(risk|downside|negative|bearish|uncertain)\b/.test(summary)) score -= 5;

    return this.clamp(score);
  }

  mapRecommendation(score) {
    if (score >= 85) return 'BUY_STRONG';
    if (score >= 70) return 'BUY';
    if (score >= 58) return 'WATCH';
    if (score >= 43) return 'HOLD';
    if (score >= 30) return 'REDUCE';
    if (score >= 15) return 'SELL';
    return 'SELL_STRONG';
  }

  mapConfidence(score, sourceCount) {
    if (sourceCount >= 3 && (score >= 85 || score <= 15)) return 'VERY_HIGH';
    if (sourceCount >= 3) return 'HIGH';
    if (sourceCount === 2) return 'MEDIUM';
    return 'LOW';
  }

  buildReasons(components) {
    return Object.entries(components)
      .filter(([, value]) => Number.isFinite(value))
      .map(([source, value]) => `${source} signal contributed ${this.clamp(value)}/100.`);
  }

  numberFrom(source, keys) {
    for (const key of keys) {
      const value = Number(source?.[key]);
      if (Number.isFinite(value)) {
        return value;
      }
    }

    return null;
  }

  confidenceWeight(confidence) {
    const normalized = String(confidence ?? '').toUpperCase();
    if (normalized === 'VERY_HIGH') return 8;
    if (normalized === 'HIGH') return 5;
    if (normalized === 'MEDIUM') return 2;
    if (normalized === 'LOW') return -2;
    return 0;
  }

  asArray(value) {
    return Array.isArray(value) ? value : [];
  }
}
