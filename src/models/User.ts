import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    number: {
        type: String,
        unique: true
    },
    photo: {
        type: String
    }
});

export default model('User', userSchema);