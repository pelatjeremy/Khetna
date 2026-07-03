export class PersistenceContext {
  constructor(repositories = {}) {
    this.repositories = repositories;
  }

  getRepository(name) {
    const aliases = {
      analysisRepository: 'AnalysisRepository',
      marketSnapshotRepository: 'MarketSnapshotRepository',
      portfolioSnapshotRepository: 'PortfolioSnapshotRepository',
    };

    return this.repositories[name] ?? this.repositories[aliases[name]] ?? null;
  }
}
