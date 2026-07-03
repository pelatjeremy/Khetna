import { PortfolioExposure } from './PortfolioExposure.js';
import { PortfolioPositionMapper } from './PortfolioPositionMapper.js';
import { PortfolioRiskAnalyzer } from './PortfolioRiskAnalyzer.js';

export class PortfolioIntelligenceEngine {
  constructor({
    positionMapper = new PortfolioPositionMapper(),
    exposure = new PortfolioExposure(),
    riskAnalyzer = new PortfolioRiskAnalyzer(),
  } = {}) {
    this.positionMapper = positionMapper;
    this.exposure = exposure;
    this.riskAnalyzer = riskAnalyzer;
  }

  run(session = {}) {
    return this.build(session);
  }

  build(session = {}) {
    const position = this.positionMapper.map(session);
    const exposure = this.exposure.calculate(position, session);
    const risk = this.riskAnalyzer.analyze(position, exposure);

    return {
      hasPosition: position.hasPosition,
      position,
      exposure,
      risk,
      generatedAt: session.timestamp ?? null,
      source: 'portfolio-intelligence',
    };
  }
}
