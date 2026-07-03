const POSITION_KEYS = ['position', 'portfolioPosition', 'holding'];
const PRICE_KEYS = ['currentPrice', 'marketPrice', 'price', 'close'];
const AVERAGE_COST_KEYS = ['averageCost', 'averagePrice', 'avgPrice', 'costBasis'];
const INVESTED_KEYS = ['investedCapital', 'capitalInvested'];

function toNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function pickNumber(source, keys, fallback = 0) {
  for (const key of keys) {
    if (source?.[key] !== undefined && source?.[key] !== null) {
      return toNumber(source[key], fallback);
    }
  }

  return fallback;
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export class PortfolioPositionMapper {
  map(input = {}) {
    const position = this.extractPosition(input);
    const quantity = Math.max(0, pickNumber(position, ['quantity', 'qty', 'shares']));

    if (quantity <= 0) {
      return this.mapEmptyPosition(input);
    }

    const currentPrice = pickNumber({ ...position, ...input.marketSnapshot, ...input }, PRICE_KEYS);
    const investedCapitalInput = pickNumber(position, INVESTED_KEYS, null);
    const averageCost =
      pickNumber(position, AVERAGE_COST_KEYS) ||
      (investedCapitalInput > 0 ? investedCapitalInput / quantity : 0);
    const investedCapital = averageCost * quantity;
    const currentValue = currentPrice * quantity;
    const unrealizedPnL = (currentPrice - averageCost) * quantity;
    const unrealizedPnLPercent = investedCapital > 0 ? (unrealizedPnL / investedCapital) * 100 : 0;

    return {
      hasPosition: true,
      quantity,
      averageCost,
      currentPrice,
      investedCapital,
      currentValue,
      unrealizedPnL,
      unrealizedPnLPercent,
      distanceToAverageCost: currentPrice - averageCost,
      distanceToStop: this.mapStopDistance(input, position, currentPrice),
      distanceToTargets: this.mapTargetDistances(input, position, currentPrice),
      currency: position.currency ?? input.currency ?? input.portfolioSnapshot?.currency ?? null,
    };
  }

  mapEmptyPosition(input = {}) {
    const currentPrice = pickNumber({ ...input.marketSnapshot, ...input }, PRICE_KEYS);

    return {
      hasPosition: false,
      quantity: 0,
      averageCost: 0,
      currentPrice,
      investedCapital: 0,
      currentValue: 0,
      unrealizedPnL: 0,
      unrealizedPnLPercent: 0,
      distanceToAverageCost: 0,
      distanceToStop: null,
      distanceToTargets: [],
      currency: input.currency ?? input.portfolioSnapshot?.currency ?? null,
    };
  }

  extractPosition(input = {}) {
    for (const key of POSITION_KEYS) {
      if (input[key]) {
        return input[key];
      }
    }

    const positions = asArray(input.portfolioSnapshot?.positions);
    const symbol = input.symbol ?? input.asset ?? input.assetId;

    if (!symbol) {
      return positions[0] ?? input;
    }

    return (
      positions.find((position) =>
        [position.symbol, position.asset, position.assetId, position.ticker]
          .filter(Boolean)
          .map(String)
          .includes(String(symbol)),
      ) ??
      positions[0] ??
      input
    );
  }

  mapStopDistance(input, position, currentPrice) {
    const stopPrice = pickNumber(
      {
        ...input.risk,
        ...input.recommendation,
        ...position,
        ...input,
      },
      ['stopPrice', 'stopLoss', 'stop'],
      null,
    );

    return Number.isFinite(stopPrice) ? currentPrice - stopPrice : null;
  }

  mapTargetDistances(input, position, currentPrice) {
    const targets =
      input.targets ??
      input.targetPrices ??
      input.recommendation?.targets ??
      input.recommendation?.targetPrices ??
      position.targets ??
      position.targetPrices;

    return asArray(targets)
      .map((target) => (typeof target === 'object' ? (target.price ?? target.value) : target))
      .map((target) => toNumber(target, null))
      .filter((target) => Number.isFinite(target))
      .map((target) => target - currentPrice);
  }
}
