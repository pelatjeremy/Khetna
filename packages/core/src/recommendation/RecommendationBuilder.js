export class RecommendationBuilder {
  build(input = {}) {
    const marketSnapshot = this.sanitizeValue(input.marketSnapshot ?? input.marketAnalysis ?? null);
    const technicalSnapshot = this.sanitizeValue(
      input.technicalSnapshot ?? input.technicalAnalysis ?? null,
    );
    const aiAnalysis = this.sanitizeValue(input.aiAnalysis ?? null);
    const warnings = [...this.asArray(input.warnings)];

    this.collectSourceWarning(warnings, 'market', marketSnapshot);
    this.collectSourceWarning(warnings, 'technical', technicalSnapshot);
    this.collectSourceWarning(warnings, 'ai', aiAnalysis);

    return {
      symbol: this.resolveSymbol(input, marketSnapshot, technicalSnapshot),
      timestamp: input.timestamp ?? input.generatedAt ?? new Date().toISOString(),
      marketSnapshot,
      technicalSnapshot,
      aiAnalysis,
      reasons: this.asArray(input.reasons),
      warnings,
      metadata: {
        engine: 'recommendation',
        version: '2.0.0',
        sources: {
          market: Boolean(marketSnapshot),
          technical: Boolean(technicalSnapshot),
          ai: Boolean(aiAnalysis),
        },
        ...this.sanitizeValue(input.metadata),
      },
    };
  }

  resolveSymbol(input, marketSnapshot, technicalSnapshot) {
    const asset = input.asset;

    return (
      input.symbol ??
      marketSnapshot?.symbol ??
      marketSnapshot?.assetId ??
      technicalSnapshot?.snapshot?.symbol ??
      technicalSnapshot?.symbol ??
      (typeof asset === 'string' ? asset : (asset?.symbol ?? asset?.id ?? asset?.assetId)) ??
      null
    );
  }

  collectSourceWarning(warnings, source, value) {
    if (!value) {
      warnings.push(`${source} data is missing.`);
      return;
    }

    if (value.success === false || value.metadata?.success === false || value.metadata?.error) {
      warnings.push(
        `${source} data error: ${this.cleanError(value.error ?? value.metadata?.error)}`,
      );
    }
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
