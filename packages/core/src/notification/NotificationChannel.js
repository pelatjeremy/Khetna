export class NotificationChannel {
  constructor(name = 'abstract') {
    this.name = name;
  }

  canHandle(message) {
    return Boolean(message);
  }

  send(message) {
    return {
      success: false,
      channel: this.name,
      message,
      delivered: false,
      error: {
        code: 'CHANNEL_NOT_IMPLEMENTED',
        message: 'Notification channel is abstract.',
      },
    };
  }
}

export class MockNotificationChannel extends NotificationChannel {
  constructor(name = 'mock') {
    super(name);
    this.messages = [];
  }

  send(message) {
    this.messages = [...this.messages, message];

    return {
      success: true,
      channel: this.name,
      delivered: true,
      external: false,
      message,
      timestamp: new Date().toISOString(),
    };
  }
}
