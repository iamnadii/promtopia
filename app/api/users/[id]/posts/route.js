import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const allPrompts = await Prompt.find({ creator: params.id }).populate(
            'creator',
        );

        return new Response(JSON.stringify(allPrompts), { status: 200 });
    } catch (err) {
        return new Response('Failed to fetch prompts created by user', {
            status: 500,
        });
    }
};
