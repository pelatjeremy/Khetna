import { CONFIDENCE_VALUES, RECOMMENDATION_VALUES } from './RecommendationScore.js';

export class RecommendationMapper {
  toResult(context = {}) {
    const score = this.clamp(context.score);
    const recommendation = this.enumValue(
      context.recommendation,
      RECOMMENDATION_VALUES,
      this.recommendationFromScore(score),
    );
    const confidence = this.enumValue(context.confidence, CONFIDENCE_VALUES, 'LOW');
    const warnings = this.asArray(context.warnings);

    return {
      success: context.success ?? warnings.length === 0,
      symbol: context.symbol ?? null,
      timestamp: context.timestamp ?? new Date().toISOString(),
      marketSnapshot: this.sanitizeValue(context.marketSnapshot ?? null),
      technicalSnapshot: this.sanitizeValue(context.technicalSnapshot ?? null),
      aiAnalysis: this.sanitizeValue(context.aiAnalysis ?? null),
      recommendation,
      confidence,
      score,
      reasons: this.asArray(context.reasons),
      warnings,
      metadata: {
        engine: 'recommendation',
        version: '2.0.0',
        ...this.sanitizeValue(context.metadata),
      },
    };
  }

  toRecommendation(context = {}) {
    return this.toResult(context);
  }

  toError(error, context = {}) {
    return this.toResult({
      ...context,
      success: false,
      score: context.score ?? 50,
      recommendation: context.recommendation ?? 'WATCH',
      confidence: context.confidence ?? 'LOW',
      warnings: [...this.asArray(context.warnings), this.cleanError(error)],
      metadata: {
        ...context.metadata,
        error: this.cleanError(error),
      },
    });
  }

  clamp(score) {
    const value = Number(score);

    if (!Number.isFinite(value)) {
      return 50;
    }

    return Math.min(100, Math.max(0, Math.round(value)));
  }

  enumValue(value, allowedValues, fallback) {
    return allowedValues.includes(value) ? value : fallback;
  }

  recommendationFromScore(score) {
    if (score >= 85) return 'BUY_STRONG';
    if (score >= 70) return 'BUY';
    if (score >= 58) return 'WATCH';
    if (score >= 43) return 'HOLD';
    if (score >= 30) return 'REDUCE';
    if (score >= 15) return 'SELL';
    return 'SELL_STRONG';
  }

  cleanError(error) {
    return String(error?.message ?? error ?? 'unknown error')
      .replace(/(api[_-]?key|token|secret|password)=([^&\s]+)/gi, '$1=[redacted]')
      .replace(/Bearer\s+[A-Za-z0-9._-]+/gi, 'Bearer [redacted]');
  }

  sanitizeValue(value, key = '') {
    if (value === null || value === undefined) {
      return value;
    }

    if (/api[_-]?key|token|secret|password/i.test(key)) {
      return '[redacted]';
    }

    if (typeof value === 'string') {
      return this.cleanError(value);
    }

    if (value instanceof Date) {
      return value;
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.sanitizeValue(item));
    }

    if (typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value).map(([entryKey, entryValue]) => [
          entryKey,
          this.sanitizeValue(entryValue, entryKey),
        ]),
      );
    }

    return value;
  }

  asArray(value) {
    return Array.isArray(value) ? value : [];
  }
}
