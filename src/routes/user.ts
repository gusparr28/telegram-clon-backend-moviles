import { Router } from 'express';
const router = Router();

import { getUserInfo } from '../controllers/user.controller';

router.get('/profile', getUserInfo)

export default router;