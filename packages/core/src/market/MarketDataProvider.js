export class MarketDataProvider {
  async getLatestSnapshot(assetId) {
    void assetId;

    // TODO: connect this method to the future Business Service responsible for retrieving MarketSnapshot documents.
    throw new Error('MarketDataProvider.getLatestSnapshot is not implemented yet.');
  }

  async getSnapshotHistory(assetId, options = {}) {
    void assetId;
    void options;

    // TODO: connect this method to the future Business Service responsible for retrieving historical MarketSnapshot documents.
    throw new Error('MarketDataProvider.getSnapshotHistory is not implemented yet.');
  }
}
