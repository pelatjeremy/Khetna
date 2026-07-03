function clampPercent(value) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, value));
}

export class PortfolioExposure {
  calculate(position = {}, context = {}) {
    const portfolioValue = Number(
      context.portfolioValue ??
        context.totalPortfolioValue ??
        context.portfolioSnapshot?.totalValue ??
        position.currentValue,
    );
    const currentValue = Number(position.currentValue ?? 0);
    const investedCapital = Number(position.investedCapital ?? 0);
    const exposureAmount = position.hasPosition ? currentValue : 0;
    const exposurePercent =
      Number.isFinite(portfolioValue) && portfolioValue > 0
        ? clampPercent((exposureAmount / portfolioValue) * 100)
        : position.hasPosition
          ? 100
          : 0;

    return {
      investedCapital: position.hasPosition ? investedCapital : 0,
      currentValue: position.hasPosition ? currentValue : 0,
      exposureAmount,
      exposurePercent,
      currency:
        position.currency ?? context.currency ?? context.portfolioSnapshot?.currency ?? null,
    };
  }
}
