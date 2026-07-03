const TRADE_SIGNALS = new Set(['BUY', 'SELL']);
const NEUTRAL_SIGNALS = new Set(['HOLD', 'WATCH', 'NEUTRAL']);

const toNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const readFirst = (...values) => values.find((value) => value !== undefined && value !== null);

const readSignal = (session) => {
  const recommendation =
    session.recommendation && typeof session.recommendation === 'object'
      ? session.recommendation
      : {};

  const signal = readFirst(
    session.signal,
    session.action,
    session.decision,
    session.recommendation,
    recommendation.signal,
    recommendation.action,
    recommendation.decision,
    recommendation.recommendation,
  );

  return typeof signal === 'string' ? signal.trim().toUpperCase() : null;
};

const readPrice = (session, fieldNames) => {
  const recommendation =
    session.recommendation && typeof session.recommendation === 'object'
      ? session.recommendation
      : {};

  for (const fieldName of fieldNames) {
    const price = toNumber(readFirst(session[fieldName], recommendation[fieldName]));

    if (price !== null) {
      return price;
    }
  }

  return null;
};

export class BacktestSession {
  constructor({
    id = null,
    symbol = null,
    signal = null,
    entryPrice = null,
    exitPrice = null,
    performance = null,
    status = 'invalid',
    timestamp = null,
    source = null,
    error = null,
  } = {}) {
    this.id = id;
    this.symbol = symbol;
    this.signal = signal;
    this.entryPrice = entryPrice;
    this.exitPrice = exitPrice;
    this.performance = performance;
    this.status = status;
    this.timestamp = timestamp;
    this.source = source;
    this.error = error;
  }

  static normalize(session, index = 0) {
    if (!session || typeof session !== 'object') {
      return BacktestSession.invalid(index, 'INVALID_SESSION', 'Session must be an object.');
    }

    const signal = readSignal(session);
    const entryPrice = readPrice(session, ['entryPrice', 'entry', 'openPrice', 'price']);
    const exitPrice = readPrice(session, [
      'exitPrice',
      'evaluationPrice',
      'closePrice',
      'currentPrice',
      'resultPrice',
    ]);

    if (!signal || (!TRADE_SIGNALS.has(signal) && !NEUTRAL_SIGNALS.has(signal))) {
      return BacktestSession.invalid(
        index,
        'INVALID_SIGNAL',
        'Session signal is missing or unsupported.',
      );
    }

    if (NEUTRAL_SIGNALS.has(signal)) {
      return new BacktestSession({
        id: session.id ?? null,
        symbol: session.symbol ?? session.asset ?? null,
        signal,
        entryPrice,
        exitPrice,
        performance: 0,
        status: 'neutral',
        timestamp: session.timestamp ?? session.createdAt ?? session.date ?? null,
        source: session,
      });
    }

    if (entryPrice === null || entryPrice <= 0) {
      return BacktestSession.invalid(
        index,
        'INVALID_ENTRY_PRICE',
        'Entry price must be a positive number.',
      );
    }

    if (exitPrice === null || exitPrice <= 0) {
      return BacktestSession.invalid(
        index,
        'INVALID_EXIT_PRICE',
        'Exit or evaluation price must be a positive number.',
      );
    }

    const direction = signal === 'SELL' ? -1 : 1;
    const performance = ((exitPrice - entryPrice) / entryPrice) * direction * 100;

    return new BacktestSession({
      id: session.id ?? null,
      symbol: session.symbol ?? session.asset ?? null,
      signal,
      entryPrice,
      exitPrice,
      performance,
      status: performance > 0 ? 'winning' : performance < 0 ? 'losing' : 'neutral',
      timestamp: session.timestamp ?? session.createdAt ?? session.date ?? null,
      source: session,
    });
  }

  static invalid(index, code, message) {
    return new BacktestSession({
      status: 'invalid',
      error: { code, message, index },
    });
  }
}
