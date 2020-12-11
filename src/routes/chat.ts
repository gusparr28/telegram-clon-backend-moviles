import { Router } from 'express';
const router = Router();

import { createChat, getChatById, getChatsByUser, deleteChat } from '../controllers/chat.controller';

router.post('/chat', createChat);
router.get('/chat/:id', getChatById);
router.get('/get-chats/:id', getChatsByUser);
router.delete('/delete/:id', deleteChat);

export default router;