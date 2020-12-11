import { Schema, model } from 'mongoose';
import MessageInfo from './MessageInfo';

const chatSchema = new Schema({
    userOne: {
        type: String
    },
    userTwo: {
        type: String
    },
    messageInfo: [MessageInfo]
});

export default model('Chat', chatSchema);