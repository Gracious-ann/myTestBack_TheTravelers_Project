import { Router } from 'express';
// import { authenticate } from '../middleware/authenticate.js';
// import { upload } from '../multer.js';
import { getStories } from '../controllers/storiesControllers.js';
import { celebrate } from 'celebrate';
import { getStoriesSchema } from '../validations/storiesValidation.js';

const router = Router();

router.get('/stories', celebrate(getStoriesSchema), getStories);
// router.post('/stories', authenticate, upload.single('storyImage'), createStory);

export default router;
