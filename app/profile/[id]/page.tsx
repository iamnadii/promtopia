'use client';

import React, { useEffect, useState } from 'react';
import Profile from '@components/Profile';
import { useRouter, useSearchParams } from 'next/navigation';

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
interface UserProfileProps {
    params: Record<string, string | string[]>;
}
const UserProfile: React.FC<UserProfileProps> = ({ params }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userName = searchParams.get('name');
    const [posts, setPosts] = useState<Prompt[]>([]);

    const getAllPosts = async () => {
        const res = await fetch(`api/users/${params.id}/posts`);
        const data: Prompt[] = await res.json();
        console.log('user posts', data);

        setPosts(data);
    };

    useEffect(() => {
        if (params?.id) getAllPosts();
    }, [params?.id]);
    return (
        <div>
            <Profile
                name={userName}
                desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination.`}
                data={posts}
            />
        </div>
    );
};

export default UserProfile;
