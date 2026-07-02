export class TechnicalSnapshotMapper {
  toTechnicalSnapshot(input) {
    if (!input) {
      return null;
    }

    return {
      indicators: input.indicators ?? {},
      trend: input.trend ?? null,
      volatility: input.volatility ?? null,
      supportResistance: input.supportResistance ?? {
        supports: [],
        resistances: [],
      },
      metadata: input.metadata ?? {},
      rawTechnicalAnalysis: input,
    };
  }
}
