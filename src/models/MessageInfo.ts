import { Schema } from 'mongoose';

const messageInfoSchema = new Schema({
    message: {
        type: String
    },
    user: {
        type: String
    }
});

export default messageInfoSchema;