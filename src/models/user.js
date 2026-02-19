import { Schema } from 'mongoose';
import { model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // прибирає пробіли на початку та в кінці
      maxlength: 32,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
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

// Перевизначаємо метод toJSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
