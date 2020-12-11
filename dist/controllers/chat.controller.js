"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChat = exports.getChatsByUser = exports.getChatById = exports.createChat = void 0;
const Chat_1 = __importDefault(require("../models/Chat"));
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userOne, userTwo } = req.body;
    try {
        const newChat = new Chat_1.default({
            userOne,
            userTwo
        });
        yield newChat.save();
        res.status(200).json({ status: 200, message: 'Chat successfully created', newChat });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
});
exports.createChat = createChat;
const getChatById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const chat = yield Chat_1.default.findById(id);
        return res.status(200).json({ status: 200, chat });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
});
exports.getChatById = getChatById;
const getChatsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const chatOne = yield Chat_1.default.find({ userOne: id });
        const chatTwo = yield Chat_1.default.find({ userTwo: id });
        return res.status(200).json({ status: 200, chat: [...chatOne, ...chatTwo] });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
    ;
});
exports.getChatsByUser = getChatsByUser;
const deleteChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield Chat_1.default.findByIdAndDelete(id);
        return res.status(200).json({ status: 200, message: 'Chat successfully deleted' });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
    ;
});
exports.deleteChat = deleteChat;
