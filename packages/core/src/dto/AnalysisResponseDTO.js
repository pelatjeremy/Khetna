export class AnalysisResponseDTO {
  constructor({ status = null, analysis = null, metadata = null } = {}) {
    this.status = status;
    this.analysis = analysis;
    this.metadata = metadata;
  }
}
