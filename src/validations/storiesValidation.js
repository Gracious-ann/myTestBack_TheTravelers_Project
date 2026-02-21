import Joi from 'joi';

export const getStoriesSchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1),
    perPage: Joi.number().integer().min(1).max(50),
    category: Joi.string().hex().length(24),
  }),
};
