import * as Models from '../models';

export const generateUniqueTinyUrlId = async (): Promise<string> => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let tinyUrlId = '';

    // loop until generate unique tinyUrlId
    while (true) {
        // create tinyUrlId with random 8 characters
        for (let i = 0; i < 8; i++) {
            tinyUrlId += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        // check if generated tinyUrlId is unique or not.
        const existingPortfolio = await Models.Portfolio.findOne({ tinyUrlId });
        if (!existingPortfolio) {
            break; 
        }
        tinyUrlId = '';
    }

    return tinyUrlId;
};
