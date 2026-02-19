import { Router } from 'express';

import { getUsers, getUserById } from '../controllers/usersController.js';
import { celebrate } from 'celebrate';
import {
  getUsersSchema,
  userIdParamSchema,
} from '../validations/usersValidation.js';

const router = Router();

router.get('/users', celebrate(getUsersSchema), getUsers);
router.get('/users/:userId', celebrate(userIdParamSchema), getUserById);

export default router;
