export class NotificationChannel {
  constructor(name = null) {
    this.name = name;
  }

  canHandle(message) {
    // TODO: Let future channel implementations decide message compatibility.
    return Boolean(message);
  }

  send(message) {
    // TODO: No delivery is performed in this skeleton.
    return {
      message,
      delivered: false,
    };
  }
}
