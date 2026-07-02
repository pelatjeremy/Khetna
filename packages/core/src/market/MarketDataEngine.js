import { MarketDataProvider } from './MarketDataProvider.js';
import { MarketSnapshotMapper } from './MarketSnapshotMapper.js';

export class MarketDataEngine {
  constructor({ provider = new MarketDataProvider(), mapper = new MarketSnapshotMapper() } = {}) {
    this.provider = provider;
    this.mapper = mapper;
  }

  async getLatestSnapshot(assetId) {
    // TODO: keep this orchestration boundary stable when the internal MarketSnapshot retrieval service is connected.
    return this.provider.getLatestSnapshot(assetId);
  }

  async getSnapshotHistory(assetId, options = {}) {
    // TODO: keep history options provider-neutral when the internal MarketSnapshot retrieval service is connected.
    return this.provider.getSnapshotHistory(assetId, options);
  }

  async prepareMarketContext(assetId, options = {}) {
    // TODO: extend this context preparation only with provider-neutral MarketSnapshot fields required by future engines.
    const snapshot = await this.getLatestSnapshot(assetId, options);

    return this.mapper.toMarketContext(snapshot);
  }
}
