import {
  PortfolioSnapshotRepository,
  TradeRepository,
} from '@tradeai/database/src/repositories/index.js';

function getAssetId(trade) {
  return String(trade.asset?._id ?? trade.asset);
}

function toNumber(value) {
  return Number(value ?? 0);
}

function buildPosition(trade) {
  return {
    asset: trade.asset?._id ?? trade.asset,
    currency: trade.currency,
    quantity: 0,
    averagePrice: 0,
    capitalInvested: 0,
    realizedGainLoss: 0,
  };
}

function applyTrade(position, trade) {
  const quantity = toNumber(trade.quantity);
  const price = toNumber(trade.price);
  const fees = toNumber(trade.fees);

  if (trade.side === 'buy') {
    position.quantity += quantity;
    position.capitalInvested += quantity * price + fees;
    position.averagePrice =
      position.quantity > 0 ? position.capitalInvested / position.quantity : 0;
    return;
  }

  const soldCost = Math.min(quantity, position.quantity) * position.averagePrice;
  position.quantity = Math.max(position.quantity - quantity, 0);
  position.capitalInvested = Math.max(position.capitalInvested - soldCost, 0);
  position.realizedGainLoss += quantity * price - fees - soldCost;
  position.averagePrice = position.quantity > 0 ? position.capitalInvested / position.quantity : 0;
}

function summarizePosition(position) {
  const marketPrice = position.averagePrice;
  const marketValue = position.quantity * marketPrice;
  const unrealizedGainLoss = marketValue - position.capitalInvested;
  const gainLoss = position.realizedGainLoss + unrealizedGainLoss;
  const performance = position.capitalInvested > 0 ? gainLoss / position.capitalInvested : 0;

  return {
    ...position,
    marketPrice,
    marketValue,
    unrealizedGainLoss,
    gainLoss,
    performance,
  };
}

export const PortfolioService = {
  async rebuildPortfolio(userId) {
    const trades = await TradeRepository.findByUser(userId, { sort: { executedAt: 1 } });
    const positionsByAsset = new Map();

    for (const trade of trades) {
      const assetId = getAssetId(trade);

      if (!positionsByAsset.has(assetId)) {
        positionsByAsset.set(assetId, buildPosition(trade));
      }

      applyTrade(positionsByAsset.get(assetId), trade);
    }

    const positions = [...positionsByAsset.values()].map(summarizePosition);
    const totalValue = positions.reduce((sum, position) => sum + position.marketValue, 0);
    const capitalInvested = positions.reduce((sum, position) => sum + position.capitalInvested, 0);
    const gainLoss = positions.reduce((sum, position) => sum + position.gainLoss, 0);

    return {
      user: userId,
      capturedAt: new Date(),
      totalValue,
      capitalInvested,
      gainLoss,
      performance: capitalInvested > 0 ? gainLoss / capitalInvested : 0,
      positions,
    };
  },

  async createPortfolioSnapshot(userId) {
    const portfolio = await this.rebuildPortfolio(userId);

    return PortfolioSnapshotRepository.create({
      user: portfolio.user,
      capturedAt: portfolio.capturedAt,
      totalValue: portfolio.totalValue,
      positions: portfolio.positions.map((position) => ({
        asset: position.asset,
        quantity: position.quantity,
        averagePrice: position.averagePrice,
        marketPrice: position.marketPrice,
        marketValue: position.marketValue,
        currency: position.currency,
      })),
    });
  },
};
