import { Request, Response } from 'express';
import randtoken from 'rand-token';
import twilio from 'twilio';
import { config as dotenv } from 'dotenv';
dotenv();

import User from '../models/User';

export const sendCode = async (req: Request, res: Response): Promise<Response> => {
    const { number } = req.body;
    try {
        let token = randtoken.generator({
            chars: "0-9"
        }).generate(5);
        let params = {
            from: "+14198275002",
            to: number,
            body: "Your confirmation code is " + token
        };
        await twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN).messages.create(params);
        return res.status(200).json({ message: "Message sent", token, status: 200 });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
}

export const signUp = async (req: Request, res: Response): Promise<Response> => {
    const { name, lastName, photo, number } = req.body;
    try {
        if (!name || !lastName) return res.status(422).json({
            status: 422,
            error: "Please complete all fields"
        });
        const savedUser = await User.findOne({ number });
        if (savedUser) return res.status(422).json({
            status: 422,
            error: "Number already registered"
        });
        const newUser = new User({
            name,
            lastName,
            number,
            photo
        });
        await newUser.save();
        return res.status(200).json({ status: 200 });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
}

export const signIn = async (req: Request, res: Response): Promise<Response> => {
    const { number } = req.body;
    try {
        const savedNumber = await User.findOne({ number });
        if (savedNumber) return res.status(200).json({ status: 200 });
        return res.status(422).json({ error: "Number doesn't exist", status: 422 });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
}