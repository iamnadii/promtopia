'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Profile from '@components/Profile';
import { useRouter } from 'next/navigation';

interface User {
    _id: string;
    email: string;
    username: string;
    image: string;
}
interface Prompt {
    _id: string;
    prompt: string;
    tag: string;
    creator: User;
}
const MyProfile = () => {
    const router = useRouter();
    const { data: session }: { data: any } = useSession();
    const [posts, setPosts] = useState<Prompt[]>([]);

    const handleEdit = (post: Prompt): any => {
        router.push(`/update-prompt?id=${post._id}`);
    };
    const handleDelete = async (post: Prompt): Promise<void> => {
        const hasConfirmed = confirm('Are you sure you want to delete ?');

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id}`, {
                    method: 'DELETE',
                });

                const filteredPosts = posts.filter((p) => p._id !== post._id);

                setPosts(filteredPosts);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const getAllPosts = async () => {
        const res = await fetch(`api/users/${session?.user.id}/posts`);
        const data: Prompt[] = await res.json();
        console.log('------------>', data);
        setPosts(data);
    };

    useEffect(() => {
        if (session?.user?.id) getAllPosts();
    }, [session?.user?.id]);
    return (
        <div>
            <Profile
                name="My"
                desc="Welcome to your personalized profile page"
                data={posts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default MyProfile;
