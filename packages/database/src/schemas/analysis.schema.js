import { Schema } from 'mongoose';

const analysisScoreSchema = new Schema(
  {
    value: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    label: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    _id: false,
    versionKey: false,
  },
);

export const analysisSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    portfolioSnapshot: {
      type: Schema.Types.ObjectId,
      ref: 'PortfolioSnapshot',
    },
    marketSnapshots: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'MarketSnapshot',
        },
      ],
      default: [],
    },
    asset: {
      type: Schema.Types.ObjectId,
      ref: 'Asset',
    },
    trade: {
      type: Schema.Types.ObjectId,
      ref: 'Trade',
    },
    scope: {
      type: String,
      required: true,
      enum: ['portfolio', 'asset', 'trade'],
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    summary: {
      type: String,
      trim: true,
      default: '',
    },
    score: {
      type: analysisScoreSchema,
      default: () => ({}),
    },
    analyzedAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

analysisSchema.index({ user: 1, analyzedAt: -1 });
analysisSchema.index({ scope: 1, status: 1 });
