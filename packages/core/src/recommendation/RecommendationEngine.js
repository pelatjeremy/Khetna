import { RecommendationBuilder } from './RecommendationBuilder.js';
import { RecommendationMapper } from './RecommendationMapper.js';
import { RecommendationScore } from './RecommendationScore.js';

export class RecommendationEngine {
  constructor({
    builder = new RecommendationBuilder(),
    scoreAggregator = new RecommendationScore(),
    mapper = new RecommendationMapper(),
  } = {}) {
    this.builder = builder;
    this.scoreAggregator = scoreAggregator;
    this.mapper = mapper;
  }

  run(input = {}) {
    return this.generate(input);
  }

  generate(input = {}) {
    let context = {};

    try {
      context = this.builder.build(input);
      const scoreResult = this.scoreAggregator.calculate(context);

      return this.mapper.toResult({
        ...context,
        score: scoreResult.score,
        recommendation: scoreResult.recommendation,
        confidence: scoreResult.confidence,
        reasons: [...context.reasons, ...scoreResult.reasons],
        warnings: [...context.warnings, ...scoreResult.warnings],
        metadata: {
          ...context.metadata,
          scoreComponents: scoreResult.components,
        },
      });
    } catch (error) {
      return this.mapper.toError(error, context);
    }
  }
}
