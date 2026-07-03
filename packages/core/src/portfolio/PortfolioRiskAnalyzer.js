const RISK_LEVELS = ['none', 'low', 'medium', 'high'];

function clampScore(value) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round(value)));
}

export class PortfolioRiskAnalyzer {
  analyze(position = {}, exposure = {}) {
    if (!position.hasPosition) {
      return {
        riskLevel: 'none',
        riskScore: 0,
        riskFactors: [],
      };
    }

    const factors = this.buildFactors(position, exposure);
    const riskScore = clampScore(factors.reduce((total, factor) => total + factor.score, 0));

    return {
      riskLevel: this.mapRiskLevel(riskScore),
      riskScore,
      riskFactors: factors.map(({ name, value }) => ({ name, value })),
    };
  }

  buildFactors(position, exposure) {
    const factors = [];
    const lossPercent = Math.max(0, -Number(position.unrealizedPnLPercent ?? 0));
    const exposurePercent = Number(exposure.exposurePercent ?? 0);
    const stopDistancePercent =
      position.distanceToStop !== null && position.currentPrice > 0
        ? Math.abs(position.distanceToStop / position.currentPrice) * 100
        : null;

    if (exposurePercent >= 75) {
      factors.push({ name: 'exposure', value: exposurePercent, score: 30 });
    } else if (exposurePercent >= 40) {
      factors.push({ name: 'exposure', value: exposurePercent, score: 18 });
    } else if (exposurePercent > 0) {
      factors.push({ name: 'exposure', value: exposurePercent, score: 8 });
    }

    if (lossPercent >= 15) {
      factors.push({ name: 'unrealizedLoss', value: lossPercent, score: 45 });
    } else if (lossPercent >= 7) {
      factors.push({ name: 'unrealizedLoss', value: lossPercent, score: 28 });
    } else if (lossPercent > 0) {
      factors.push({ name: 'unrealizedLoss', value: lossPercent, score: 10 });
    }

    if (stopDistancePercent !== null && stopDistancePercent <= 2) {
      factors.push({ name: 'stopDistance', value: stopDistancePercent, score: 25 });
    } else if (stopDistancePercent !== null && stopDistancePercent <= 5) {
      factors.push({ name: 'stopDistance', value: stopDistancePercent, score: 12 });
    }

    return factors;
  }

  mapRiskLevel(score) {
    if (score <= 0) return RISK_LEVELS[1];
    if (score < 25) return RISK_LEVELS[1];
    if (score < 60) return RISK_LEVELS[2];
    return RISK_LEVELS[3];
  }
}
