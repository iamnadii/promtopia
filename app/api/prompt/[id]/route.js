import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if (!prompt) new Response('Prompt not found', { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (err) {
        return new Response('Internal server error', { status: 500 });
    }
};
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();
    try {
        await connectToDB();

        const updatePrompt = await Prompt.findById(params.id);
        if (!updatePrompt) new Response('Prompt not found', { status: 404 });

        updatePrompt.prompt = prompt;
        updatePrompt.tag = tag;

        await updatePrompt.save();

        return new Response(JSON.stringify(updatePrompt), { status: 200 });
    } catch (err) {
        return new Response('Error updating prompt', { status: 500 });
    }
};
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response('Prompt deleted', { status: 200 });
    } catch (err) {
        return new Response('Error deleting prompt', { status: 500 });
    }
};
