// modules importation
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import chatRoutes from './routes/chat';

const app = express();
const httpServer: any = createServer(app);
const io = new Server(httpServer);
const port = process.env.PORT || 3000;

// socket 
io.on('connection', (socket) => {
    console.log(socket);
    socket.on('disconnect', function () {
        io.emit('users-changed', { user: socket.username, event: 'left' });
    });

    socket.on('set-name', (name: any) => {
        socket.username = name;
        io.emit('users-changed', { user: name, event: 'joined' });
    });

    socket.on('send-message', (message: any) => {
        io.emit('message', { msg: message.text, user: socket.username, createdAt: new Date() });
    });
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:8100',
    credentials: true
}));

// routes
app.use(authRoutes);
app.use(userRoutes);
app.use(chatRoutes);

export default () => {
    return { httpServer, port };
}