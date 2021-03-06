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
// modules importation
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const http_1 = require("http");
const Chat_1 = __importDefault(require("./models/Chat"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const chat_1 = __importDefault(require("./routes/chat"));
const httpServer = http_1.createServer(app);
const port = process.env.PORT || 3000;
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:8100",
        credentials: true
    }
});
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default({
    origin: true
}));
io.on('connection', (socket) => {
    socket.on('join', ({ room }) => {
        socket.join(room);
        socket.room = room;
    });
    socket.on('send-message', (message) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(message);
            yield Chat_1.default.findByIdAndUpdate(socket.room, {
                messageInfo: message
            }, { new: true });
            socket.io.to(socket.room).emit('message', message);
        }
        catch (e) {
            console.error(e);
        }
        ;
    }));
    socket.on('typing', (user) => {
        socket.broadcast.to(socket.room).emit('user-typing', { message: user + ' is typing...' });
    });
    socket.on('disconnect', () => {
        console.log('User has left');
    });
});
// routes
app.use(auth_1.default);
app.use(user_1.default);
app.use(chat_1.default);
exports.default = {
    httpServer, port
};
