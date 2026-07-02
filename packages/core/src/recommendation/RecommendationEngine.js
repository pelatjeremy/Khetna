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

  generate(input = {}) {
    const scores = this.scoreAggregator.aggregate(input);
    const rawRecommendation = this.builder.build({
      ...input,
      scores,
    });

    return this.mapper.toRecommendation(rawRecommendation);
  }
}
