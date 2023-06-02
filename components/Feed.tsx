'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import PromptCard from './PromptCard';

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
const PromptCardList = ({
    data,
    handleTagClick,
}: {
    data: Prompt[];
    handleTagClick: (tag: string) => void;
}) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => {
                return (
                    <PromptCard
                        key={post._id}
                        post={post}
                        handleTagClick={handleTagClick}
                    />
                );
            })}
        </div>
    );
};
const Feed = () => {
    const [posts, setPosts] = useState<Prompt[]>([]);

    // search state
    const [searchText, setSearchText] = useState<string>('');
    const [searchTimeout, setSearchTimeout] = useState<any>(null);
    const [searchedPrompts, setSearchedPrompts] = useState<Prompt[]>([]);

    const filteredPosts = (searchText: string) => {
        const regex = new RegExp(searchText, 'i');
        return posts.filter(
            (post) =>
                regex.test(post.creator.username) ||
                regex.test(post.prompt) ||
                regex.test(post.tag),
        );
    };
    const handleSearchPromptChange = (
        e: ChangeEvent<HTMLInputElement>,
    ): void => {
        e.preventDefault();
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        // debouce method
        setSearchTimeout(
            setTimeout(() => {
                const searchedPromptsByAll = filteredPosts(e.target.value);
                setSearchedPrompts(searchedPromptsByAll);
            }, 500),
        );
    };

    const handleTagClick = (tag: string): void => {
        setSearchText(tag);

        const searchedPromptsByTag = filteredPosts(tag);
        setSearchedPrompts(searchedPromptsByTag);
    };

    const getAllPosts = async () => {
        const res = await fetch('api/prompt');
        const data: Prompt[] = await res.json();
        console.log(data);

        setPosts(data);
    };

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    className="search_input peer"
                    required
                    value={searchText}
                    onChange={handleSearchPromptChange}
                    placeholder="Search for a tag or username"
                />
            </form>
            {searchText ? (
                <PromptCardList
                    data={searchedPrompts}
                    handleTagClick={handleTagClick}
                />
            ) : (
                <PromptCardList data={posts} handleTagClick={handleTagClick} />
            )}
        </section>
    );
};

export default Feed;
