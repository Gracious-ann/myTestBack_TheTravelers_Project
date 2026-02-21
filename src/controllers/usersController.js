import { User } from '../models/user.js';
import createHttpError from 'http-errors';

//всі юзери| логіка пагінації
export const getUsers = async (req, res) => {
  const { page = 1, perPage = 12 } = req.query;

  const skip = (page - 1) * perPage;

  const usersQuery = User.find({ userId: req.user._id });

  // Виконуємо одразу два запити паралельно
  const [totalItems, users] = await Promise.all([
    usersQuery.clone().countDocuments(),
    usersQuery.skip(skip).limit(perPage),
  ]);

  // Обчислюємо загальну кількість «сторінок»
  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    users,
  });
};

//юзери по id
export const getUserById = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById({ _id: userId, userId: req.user._id });

  if (!user) {
    throw createHttpError(404, 'Student not found');
  }

  res.status(200).json(user);
};

export const createStudent = async (req, res) => {
  const user = await User.create({
    ...req.body,
    userId: req.user._id,
  });

  res.status(201).json(user);
};
