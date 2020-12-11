import { Request, Response } from 'express';

import Chat from '../models/Chat';

export const createChat = async (req: Request, res: Response) => {
    const { userOne, userTwo } = req.body;
    try {
        const newChat = new Chat({
            userOne,
            userTwo
        });
        await newChat.save();
        res.status(200).json({ status: 200, message: 'Chat successfully created', newChat });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
};

export const getChatById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const chat = await Chat.findById(id);
        return res.status(200).json({ status: 200, chat });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
};

export const getChatsByUser = async (req: any, res: Response) => {
    const { id } = req.params;
    try {
        const chatOne = await Chat.find({ userOne: id });
        const chatTwo = await Chat.find({ userTwo: id });
        return res.status(200).json({ status: 200, chat: [...chatOne, ...chatTwo] });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    };
};

export const deleteChat = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await Chat.findByIdAndDelete(id);
        return res.status(200).json({ status: 200, message: 'Task successfully deleted' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    };
};
