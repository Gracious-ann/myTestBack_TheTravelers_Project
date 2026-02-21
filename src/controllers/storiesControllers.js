import { Story } from '../models/stories.js';
import { Category } from '../models/category.js';

export const getStories = async (req, res) => {
  const { page = 1, perPage = 12, category } = req.query;

  const skip = (page - 1) * perPage;

  const storiesQuery = Story.find();

  if (category) {
    storiesQuery.where('category').equals(category);
  }

  // Виконуємо одразу два запити паралельно
  const [totalItems, stories] = await Promise.all([
    storiesQuery.clone().countDocuments(),
    storiesQuery
      .populate('category', 'name')
      .populate('ownerId', 'name avatarUrl')
      .skip(skip)
      .limit(perPage),
  ]);

  // Обчислюємо загальну кількість «сторінок»
  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    stories,
  });
};
