// modules importation
import express from 'express';
import cors from 'cors';

const app = express();

import authRoutes from './routes/auth';
import userRoutes from './routes/user';

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