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
exports.signIn = exports.signUp = exports.sendCode = void 0;
const rand_token_1 = __importDefault(require("rand-token"));
const twilio_1 = __importDefault(require("twilio"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
const User_1 = __importDefault(require("../models/User"));
const sendCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { number } = req.body;
    try {
        let token = rand_token_1.default.generator({
            chars: "0-9"
        }).generate(5);
        let params = {
            from: "+14198275002",
            to: number,
            body: "Your confirmation code is " + token
        };
        yield twilio_1.default(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN).messages.create(params);
        return res.status(200).json({ message: "Message sent", token, number, status: 200 });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
});
exports.sendCode = sendCode;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastName, photo, number } = req.body;
    try {
        if (!name || !lastName)
            return res.status(422).json({
                status: 422,
                error: "Please complete all fields"
            });
        const savedUser = yield User_1.default.findOne({ number });
        if (savedUser)
            return res.status(422).json({
                status: 422,
                error: "Number already registered"
            });
        const newUser = new User_1.default({
            name,
            lastName,
            number,
            photo
        });
        yield newUser.save();
        return res.status(200).json({ number, status: 200 });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { number } = req.body;
    try {
        const savedNumber = yield User_1.default.findOne({ number });
        if (savedNumber)
            return res.status(200).json({ status: 200 });
        return res.status(422).json({ error: "Number doesn't exist", status: 422 });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
});
exports.signIn = signIn;
