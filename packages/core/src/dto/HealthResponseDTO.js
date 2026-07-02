export class HealthResponseDTO {
  constructor({ status = null, service = null, timestamp = null } = {}) {
    this.status = status;
    this.service = service;
    this.timestamp = timestamp;
  }
}
