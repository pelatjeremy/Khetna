export class RecommendationRequestDTO {
  constructor({ assetSymbol = null, timeframe = null, portfolioContext = null } = {}) {
    this.assetSymbol = assetSymbol;
    this.timeframe = timeframe;
    this.portfolioContext = portfolioContext;
  }
}
