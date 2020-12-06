// modules importation
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

import authRoutes from './routes/auth';
import userRoutes from './routes/user';

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: true
}));

// socket 
io.on('connection', (socket) => {
    console.log('socket', socket);
    socket.on('disconnect', () => {
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

// routes
app.use(authRoutes);
app.use(userRoutes);

// settings
app.set('port', process.env.PORT || 3000);

export default app;