export class NotificationMessage {
  constructor({
    success = true,
    type = 'notification',
    title = 'Trading notification',
    body = '',
    severity = 'info',
    source = 'notification',
    payload = null,
    timestamp = new Date().toISOString(),
    metadata = {},
    level = null,
  } = {}) {
    this.success = success;
    this.type = type;
    this.title = title;
    this.body = body;
    this.severity = severity || level || 'info';
    this.source = source;
    this.payload = payload;
    this.timestamp = timestamp;
    this.metadata = metadata;
  }

  toJSON() {
    return {
      success: this.success,
      type: this.type,
      title: this.title,
      body: this.body,
      severity: this.severity,
      source: this.source,
      payload: this.payload,
      timestamp: this.timestamp,
      metadata: this.metadata,
    };
  }
}
