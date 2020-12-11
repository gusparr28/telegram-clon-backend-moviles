"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MessageInfo_1 = __importDefault(require("./MessageInfo"));
const chatSchema = new mongoose_1.Schema({
    userOne: {
        type: String
    },
    userTwo: {
        type: String
    },
    messageInfo: [MessageInfo_1.default]
});
exports.default = mongoose_1.model('Chat', chatSchema);
