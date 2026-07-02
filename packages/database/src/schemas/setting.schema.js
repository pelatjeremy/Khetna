import { Schema } from 'mongoose';

export const settingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    scope: {
      type: String,
      required: true,
      enum: ['global', 'user'],
      default: 'global',
    },
    key: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: Schema.Types.Mixed,
      default: null,
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

settingSchema.index({ scope: 1, key: 1, user: 1 }, { unique: true });
