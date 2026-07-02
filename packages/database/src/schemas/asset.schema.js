import { Schema } from 'mongoose';

export const assetSchema = new Schema(
  {
    symbol: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    assetType: {
      type: String,
      required: true,
      enum: ['stock', 'etf', 'crypto', 'forex', 'index', 'commodity', 'other'],
    },
    exchange: {
      type: String,
      trim: true,
      default: '',
    },
    currency: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      default: 'USD',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

assetSchema.index({ assetType: 1 });
