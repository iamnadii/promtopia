import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

export const GET = async (req, res) => {
    try {
        await connectToDB();
        const allPrompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(allPrompts), { status: 200 });
    } catch (err) {
        return new Response(err.message, { status: 500 });
    }
};
