export class AnalysisRequestDTO {
  constructor({ assetSymbol = null, timeframe = null, context = null } = {}) {
    this.assetSymbol = assetSymbol;
    this.timeframe = timeframe;
    this.context = context;
  }
}
