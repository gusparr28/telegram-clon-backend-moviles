"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// modules importation
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import { createServer } from 'http';
// import { Server } from 'socket.io';
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const chat_1 = __importDefault(require("./routes/chat"));
const app = express_1.default();
// const httpServer: any = createServer(app);
// const io = new Server(httpServer);
// socket 
// io.on('connection', (socket) => {
//     console.log(socket);
//     socket.on('disconnect', function () {
//         io.emit('users-changed', { user: socket.username, event: 'left' });
//     });
//     socket.on('set-name', (name: any) => {
//         socket.username = name;
//         io.emit('users-changed', { user: name, event: 'joined' });
//     });
//     socket.on('send-message', (message: any) => {
//         io.emit('message', { msg: message.text, user: socket.username, createdAt: new Date() });
//     });
// });
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default({
    origin: true
}));
// routes
app.use(auth_1.default);
app.use(user_1.default);
app.use(chat_1.default);
// settings
app.set('port', process.env.PORT || 3000);
exports.default = app;
