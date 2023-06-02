'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

interface PostType {
    prompt: string;
    tag: string;
}
const UpdatePrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [post, setPost] = useState<PostType>({
        prompt: '',
        tag: '',
    });

    const getPromptDetail = async () => {
        const res = await fetch(`/api/prompt/${promptId}`);
        const data = await res.json();
        console.log('update', data);

        setPost({
            prompt: data.prompt,
            tag: data.tag,
        });
    };

    useEffect(() => {
        if (promptId) getPromptDetail();
    }, [promptId]);

    const UpdatePromptFunc = async (
        e: FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) alert('Prompt Id not found..');

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });
            if (response.ok) {
                router.push('/');
            }
        } catch (err) {
            console.log(err);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={UpdatePromptFunc}
        />
    );
};

export default UpdatePrompt;
