import { Request, Response } from 'express';
import randtoken from 'rand-token';
import twilio from 'twilio';
import { config as dotenv } from 'dotenv';
dotenv();

export const signUp = async (req: Request, res: Response): Promise<Response> => {
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