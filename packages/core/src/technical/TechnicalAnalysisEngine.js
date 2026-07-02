import { TechnicalAnalysisContract } from '../contracts/index.js';
import { TechnicalIndicatorProvider } from './TechnicalIndicatorProvider.js';
import { TechnicalSnapshotMapper } from './TechnicalSnapshotMapper.js';

export class TechnicalAnalysisEngine extends TechnicalAnalysisContract {
  constructor({
    indicatorProvider = new TechnicalIndicatorProvider(),
    snapshotMapper = new TechnicalSnapshotMapper(),
  } = {}) {
    super();
    this.indicatorProvider = indicatorProvider;
    this.snapshotMapper = snapshotMapper;
  }

  async analyze(marketData) {
    const technicalAnalysis = await this.indicatorProvider.analyze(marketData);

    return this.snapshotMapper.toTechnicalSnapshot(technicalAnalysis);
  }

  async getIndicators(marketData) {
    const snapshot = await this.analyze(marketData);

    return snapshot?.indicators ?? {};
  }

  async getTrendSummary(marketData) {
    const snapshot = await this.analyze(marketData);

    return snapshot?.trend ?? null;
  }
}
