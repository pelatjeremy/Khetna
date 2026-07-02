export class NotificationMessage {
  constructor({ title = null, body = null, level = null, metadata = {} } = {}) {
    this.title = title;
    this.body = body;
    this.level = level;
    this.metadata = metadata;
  }
}
