"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageInfoSchema = new mongoose_1.Schema({
    message: {
        type: String
    },
    user: {
        type: String
    }
});
exports.default = messageInfoSchema;
