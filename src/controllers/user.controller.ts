import { Response } from 'express';

import User from '../models/User';

export const getUserInfo = async (req: any, res: Response) => {
    const { number } = req.params;
    try {
        const user = await User.findOne({ number });
        return res.status(200).json({ status: 200, user });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
}