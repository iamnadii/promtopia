import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

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
interface PromptCardProps {
    key: string;
    post: Prompt;
    handleTagClick?: (tag: string) => void;
    handleEdit?: () => {};
    handleDelete?: () => {};
}
const PromptCard: React.FC<PromptCardProps> = ({
    post,
    handleTagClick,
    handleEdit,
    handleDelete,
}) => {
    const { data: session }: { data: any } = useSession();
    const pathName = usePathname();
    const router = useRouter();
    const [copied, setCopied] = useState<string>('');
    const handleCopied = (): void => {
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => setCopied(''), 1000);
    };
    const handleProfile = (): void => {
        if (post.creator._id === session?.user.id)
            return router.push('/profile');
        router.push(
            `/profile/${post.creator._id}?name=${post.creator.username}`,
        );
    };
    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
                <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                    <Image
                        src={post.creator.image}
                        alt="user_image"
                        width={40}
                        height={40}
                        className="rounded-full object-contain"
                    />
                    <div className="flex flex-col">
                        <h3
                            className="font-satoshi font-semibold text-gray-900"
                            onClick={handleProfile}
                        >
                            {post.creator.username}
                        </h3>
                        <p className="font-inter text-sm text-gray-500">
                            {post.creator.email}
                        </p>
                    </div>
                </div>
                <div className="copy_btn" onClick={handleCopied}>
                    <Image
                        src={
                            copied === post.prompt
                                ? '/assets/icons/tick.svg'
                                : '/assets/icons/copy.svg'
                        }
                        alt=""
                        width={17}
                        height={17}
                    />
                </div>
            </div>
            <p className="my-4 font-satoshi text-sm text-gray-700">
                {post.prompt}
            </p>
            <p
                className="font-inter text-sm blue_gradient cursor-pointer"
                onClick={() => {
                    if (handleTagClick && post && post.tag) {
                        handleTagClick(post.tag);
                    }
                }}
            >
                #{post.tag}
            </p>
            {session?.user?.id === post.creator._id &&
                pathName === '/profile' && (
                    <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
                        <p
                            className="font-inter text-sm green_gradient cursor-pointer"
                            onClick={handleEdit}
                        >
                            Edit
                        </p>
                        <p
                            className="font-inter text-sm orange_gradient cursor-pointer"
                            onClick={handleDelete}
                        >
                            Delete
                        </p>
                    </div>
                )}
        </div>
    );
};

export default PromptCard;
