import { NotificationMessage } from './NotificationMessage.js';

function normalizeNotificationError(error) {
  return {
    success: false,
    error: {
      code: error?.code || 'NOTIFICATION_ERROR',
      message: error?.message || 'Notification failed.',
    },
  };
}

function readResultValue(result, key) {
  if (!result || typeof result !== 'object') {
    return null;
  }

  return result[key] ?? null;
}

export class NotificationEngine {
  constructor({ channels = [] } = {}) {
    this.channels = channels;
  }

  prepare(context) {
    return this.buildMessage(context);
  }

  notify(result, options = {}) {
    try {
      const message = this.buildMessage(result, options);
      const routes = this.route(message, options.channels);

      return {
        success: routes.every((route) => route.result?.success !== false),
        message,
        routes,
      };
    } catch (error) {
      return normalizeNotificationError(error);
    }
  }

  buildMessage(result, { source = 'trading-core', metadata = {} } = {}) {
    const type = this.detectType(result);
    const recommendation = readResultValue(result, 'recommendation');
    const symbol =
      readResultValue(result, 'symbol') ||
      readResultValue(readResultValue(result, 'context'), 'symbol') ||
      readResultValue(readResultValue(result, 'metadata'), 'symbol');
    const status = readResultValue(result, 'status') || 'completed';

    return new NotificationMessage({
      success: status !== 'failed',
      type,
      title: type === 'trading-session' ? 'Trading session completed' : 'Recommendation completed',
      body: this.buildBody({ symbol, recommendation, status }),
      severity: status === 'failed' ? 'error' : 'info',
      source,
      payload: result?.toJSON ? result.toJSON() : result,
      metadata: {
        ...metadata,
        status,
        symbol,
      },
    });
  }

  route(message, channels = []) {
    const targetChannels = channels.length > 0 ? channels : this.channels;

    return targetChannels
      .filter((channel) => channel && channel.canHandle(message))
      .map((channel) => ({
        channel: channel.name || 'unknown',
        result: this.sendToChannel(channel, message),
      }));
  }

  detectType(result) {
    if (readResultValue(result, 'sessionId') || readResultValue(result, 'marketSnapshot')) {
      return 'trading-session';
    }

    return 'recommendation-result';
  }

  buildBody({ symbol, recommendation, status }) {
    const action =
      readResultValue(recommendation, 'action') || readResultValue(recommendation, 'decision');
    const target = symbol ? ` for ${symbol}` : '';
    const suffix = action ? `: ${action}` : '.';

    return `Trading analysis ${status}${target}${suffix}`;
  }

  sendToChannel(channel, message) {
    try {
      return channel.send(message);
    } catch (error) {
      return normalizeNotificationError(error);
    }
  }
}
