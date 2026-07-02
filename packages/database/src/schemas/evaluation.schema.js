import { Schema } from 'mongoose';

export const evaluationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    analysis: {
      type: Schema.Types.ObjectId,
      ref: 'Analysis',
      required: true,
    },
    outcome: {
      type: String,
      required: true,
      enum: ['pending', 'accurate', 'partial', 'inaccurate'],
      default: 'pending',
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviewedAt: {
      type: Date,
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

evaluationSchema.index({ user: 1, createdAt: -1 });
evaluationSchema.index({ analysis: 1 });
