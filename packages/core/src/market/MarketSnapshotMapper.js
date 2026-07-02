export class MarketSnapshotMapper {
  toMarketContext(snapshot) {
    if (!snapshot) {
      return null;
    }

    return {
      assetId: snapshot.assetId,
      timestamp: snapshot.timestamp,
      open: snapshot.open,
      high: snapshot.high,
      low: snapshot.low,
      close: snapshot.close,
      volume: snapshot.volume,
      source: snapshot.source,
      rawSnapshot: snapshot,
    };
  }

  toMarketContextList(snapshots = []) {
    return snapshots.map((snapshot) => this.toMarketContext(snapshot));
  }
}
