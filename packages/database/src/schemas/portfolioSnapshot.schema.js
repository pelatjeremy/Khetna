import { Schema } from 'mongoose';

const portfolioPositionSchema = new Schema(
  {
    asset: {
      type: Schema.Types.ObjectId,
      ref: 'Asset',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    averagePrice: {
      type: Number,
      min: 0,
      default: 0,
    },
    marketPrice: {
      type: Number,
      min: 0,
      default: 0,
    },
    marketValue: {
      type: Number,
      min: 0,
      default: 0,
    },
    currency: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      default: 'USD',
    },
  },
  {
    _id: false,
    versionKey: false,
  },
);

export const portfolioSnapshotSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    capturedAt: {
      type: Date,
      required: true,
    },
    totalValue: {
      type: Number,
      min: 0,
      default: 0,
    },
    cashBalance: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      default: 'USD',
    },
    positions: {
      type: [portfolioPositionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

portfolioSnapshotSchema.index({ user: 1, capturedAt: -1 });
