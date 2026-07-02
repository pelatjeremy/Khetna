import { Schema } from 'mongoose';

export const tradeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    asset: {
      type: Schema.Types.ObjectId,
      ref: 'Asset',
      required: true,
    },
    side: {
      type: String,
      required: true,
      enum: ['buy', 'sell'],
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    fees: {
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
    executedAt: {
      type: Date,
      required: true,
    },
    source: {
      type: String,
      enum: ['manual', 'imported'],
      default: 'manual',
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

tradeSchema.index({ user: 1, executedAt: -1 });
tradeSchema.index({ asset: 1, executedAt: -1 });
