import { Router } from 'express';

import { getUsers, getUserById } from '../controllers/usersController.js';
import { celebrate } from 'celebrate';
import {
  getUsersSchema,
  userIdParamSchema,
} from '../validations/usersValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use('/users', authenticate);
router.get('/users', celebrate(getUsersSchema), getUsers);
router.get('/users/:userId', celebrate(userIdParamSchema), getUserById);

export default router;
