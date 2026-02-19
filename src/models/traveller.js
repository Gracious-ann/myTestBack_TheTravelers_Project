// src/models/student.js

import { Schema } from 'mongoose';
import { model } from 'mongoose';

const travellersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // прибирає пробіли на початку та в кінці
      maxlength: 32,
    },
    avatarUrl: {
      type: String,
      default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
    },

    articlesAmount: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Travellers = model('Travellers', travellersSchema);
