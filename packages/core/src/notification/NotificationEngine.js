import { NotificationMessage } from './NotificationMessage.js';

export class NotificationEngine {
  constructor() {
    // TODO: Keep the engine stateless until concrete orchestration needs emerge.
  }

  prepare(context) {
    // TODO: Map future recommendation context to notification content.
    return new NotificationMessage({
      metadata: {
        context,
        prepared: false,
      },
    });
  }

  route(message, channels = []) {
    // TODO: Route only through abstract channels; no delivery side effects occur here.
    return channels
      .filter((channel) => channel && channel.canHandle(message))
      .map((channel) => ({
        channel,
        result: channel.send(message),
      }));
  }
}
