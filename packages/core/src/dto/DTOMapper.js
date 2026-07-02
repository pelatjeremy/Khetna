import { AnalysisResponseDTO } from './AnalysisResponseDTO.js';
import { HealthResponseDTO } from './HealthResponseDTO.js';
import { RecommendationResponseDTO } from './RecommendationResponseDTO.js';
import { VersionResponseDTO } from './VersionResponseDTO.js';

export class DTOMapper {
  toAnalysisResponseDTO(result = {}) {
    return new AnalysisResponseDTO({
      status: result.status ?? null,
      analysis: result.analysis ?? result.aiAnalysis ?? null,
      metadata: result.metadata ?? null,
    });
  }

  toRecommendationResponseDTO(result = {}) {
    return new RecommendationResponseDTO({
      status: result.status ?? null,
      recommendation: result.recommendation ?? null,
      confidence: result.recommendation?.recommendation?.confidence ?? result.confidence ?? null,
      riskLevel: result.recommendation?.riskLevel ?? result.riskLevel ?? null,
      metadata: result.metadata ?? null,
    });
  }

  toHealthResponseDTO(data = {}) {
    return new HealthResponseDTO({
      status: data.status ?? null,
      service: data.service ?? null,
      timestamp: data.timestamp ?? null,
    });
  }

  toVersionResponseDTO(data = {}) {
    return new VersionResponseDTO({
      name: data.name ?? null,
      version: data.version ?? null,
      environment: data.environment ?? null,
    });
  }
}
