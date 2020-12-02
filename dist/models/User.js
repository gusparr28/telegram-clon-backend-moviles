"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    number: {
        type: String,
        unique: true
    },
    photo: {
        type: String
    }
});
exports.default = mongoose_1.model('User', userSchema);
