import mongoose from 'mongoose';
import { config as dotenv } from 'dotenv';
dotenv();

const MONGOURI: any = process.env.MONGOURI;

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('Successfully connected to MongoDB'))
    .catch(err => console.log(err));