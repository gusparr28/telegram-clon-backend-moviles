import { Router } from 'express';
const router = Router();

import { createChat, getChatById, getChatsByUser } from '../controllers/chat.controller';

router.post('/chat', createChat);
router.get('/chat/:id', getChatById);
router.get('/get-chats/:id', getChatsByUser);

export default router;