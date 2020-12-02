import { Router } from 'express';
const router = Router();

import { sendCode, signIn, signUp } from '../controllers/auth.controller';

router.post('/signup', signUp);
router.post('/code', sendCode);
router.post('/signin', signIn);
    
export default router;