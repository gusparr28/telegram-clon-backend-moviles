"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const chat_controller_1 = require("../controllers/chat.controller");
router.post('/chat', chat_controller_1.createChat);
router.get('/chat/:id', chat_controller_1.getChatById);
router.get('/get-chats/:id', chat_controller_1.getChatsByUser);
exports.default = router;
