import { Schema } from 'mongoose';

export const marketSnapshotSchema = new Schema(
  {
    asset: {
      type: Schema.Types.ObjectId,
      ref: 'Asset',
      required: true,
    },
    capturedAt: {
      type: Date,
      required: true,
    },
    source: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    open: {
      type: Number,
      min: 0,
      default: 0,
    },
    high: {
      type: Number,
      min: 0,
      default: 0,
    },
    low: {
      type: Number,
      min: 0,
      default: 0,
    },
    close: {
      type: Number,
      min: 0,
      default: 0,
    },
    volume: {
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
    timestamps: true,
    versionKey: false,
  },
);

marketSnapshotSchema.index({ asset: 1, capturedAt: -1 });
marketSnapshotSchema.index({ source: 1, capturedAt: -1 });
