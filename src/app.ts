// modules importation
import express from 'express';
import cors from 'cors';
const app = express();
import { createServer } from 'http';
// import { Server } from 'socket.io';

import Chat from './models/Chat';

import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import chatRoutes from './routes/chat';

const httpServer: any = createServer(app);
// const io = new Server(httpServer);
const port = process.env.PORT || 3000;
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:8100",
        credentials: true
    }
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: true
}));

io.on('connection', (socket: any) => {
    socket.on('join', ({ room }: any) => {
        socket.join(room);
        socket.room = room;
    });
    socket.on('send-message', async (message: any) => {
        try {
            await Chat.findByIdAndUpdate(socket.room, {
                messageInfo: message
            }, { new: true });
            io.to(socket.room).emit('message', message);
        } catch (e) {
            console.error(e);
        };
    });
    socket.on('typing', (user: any) => {
        socket.broadcast.to(socket.room).emit('user-typing', { message: user + ' is typing...' });
    });
    socket.on('disconnect', () => {
        console.log('User has left');
    });
});

// routes
app.use(authRoutes);
app.use(userRoutes);
app.use(chatRoutes);

// settings
// app.set('port', process.env.PORT || 3000);

export default {
    httpServer, port
}