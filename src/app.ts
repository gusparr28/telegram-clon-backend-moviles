// modules importation
import express from 'express';
import cors from 'cors';
const app = express();
// import { createServer } from 'http';
// import { Server } from 'socket.io';

import authRoutes from './routes/auth';
import userRoutes from './routes/user';
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: true
}));

// routes
app.use(authRoutes);
app.use(userRoutes);

// settings
app.set('port', process.env.PORT || 3000);

export default app;