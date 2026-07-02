export class VersionResponseDTO {
  constructor({ name = null, version = null, environment = null } = {}) {
    this.name = name;
    this.version = version;
    this.environment = environment;
  }
}
