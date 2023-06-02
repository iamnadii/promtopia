import React, { FormEvent } from 'react';
import Link from 'next/link';

interface PostType {
    prompt: string;
    tag: string;
}
interface FormProps {
    type: string;
    post: PostType;
    setPost: React.Dispatch<React.SetStateAction<PostType>>;
    submitting: boolean;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}
const Form: React.FC<FormProps> = ({
    type,
    post,
    setPost,
    submitting,
    handleSubmit,
}) => {
    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{type} Post</span>
            </h1>
            <p className="desc max-w-md text-left">
                {type} and share amazing prompts with the world, and let your
                imagination run wild any AI-Powered platform.
            </p>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-7 mt-10 w-full max-w-2xl glassmorphism"
            >
                <label htmlFor="prompt">
                    <span className="font-santoshi font-semibold text-base text-gray-700">
                        Your AI Prompt
                    </span>
                    <textarea
                        name="prompt"
                        className="form_textarea"
                        value={post.prompt}
                        onChange={(event) =>
                            setPost({ ...post, prompt: event.target.value })
                        }
                        placeholder="Write your prompt here..."
                    />
                </label>
                <label htmlFor="tag">
                    <span className="font-santoshi font-semibold text-base text-gray-700">
                        Tag
                        <span className="font-normal">
                            (#product, #webdevelopment, #idea)
                        </span>
                    </span>
                    <input
                        name="tag"
                        className="form_input"
                        value={post.tag}
                        onChange={(event) =>
                            setPost({ ...post, tag: event.target.value })
                        }
                        placeholder="#tag"
                    />
                </label>
                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link href="/" className="text-sm text-gray-500">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-5 py-1.5 text-sm bg-primary-orange text-white rounded-full"
                    >
                        {submitting ? `${type}...` : type}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Form;
