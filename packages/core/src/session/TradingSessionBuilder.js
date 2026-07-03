import { randomUUID } from 'node:crypto';

import { TradingSession } from './TradingSession.js';
import { TradingSessionContext } from './TradingSessionContext.js';
import { TradingSessionMetadata } from './TradingSessionMetadata.js';

export class TradingSessionBuilder {
  build(input = {}) {
    const context =
      input instanceof TradingSessionContext ? input : new TradingSessionContext(input);
    const timestamp = context.timestamp ?? new Date().toISOString();

    return new TradingSession({
      sessionId: context.sessionId ?? randomUUID(),
      timestamp,
      symbol: context.symbol,
      portfolioSnapshot: context.portfolioSnapshot,
      marketSnapshot: context.marketSnapshot,
      technicalSnapshot: context.technicalSnapshot,
      aiAnalysis: context.aiAnalysis,
      recommendation: context.recommendation,
      metadata: this.buildMetadata(context.metadata, timestamp),
    });
  }

  buildMetadata(metadata = {}, createdAt) {
    if (metadata instanceof TradingSessionMetadata) {
      return metadata;
    }

    return new TradingSessionMetadata({
      createdAt,
      ...metadata,
    });
  }
}
