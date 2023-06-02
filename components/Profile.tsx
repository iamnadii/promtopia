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
interface ProfileProps {
    name: string | null;
    desc: string;
    data: Prompt[];
    handleEdit?: (post: Prompt) => any;
    handleDelete?: (post: Prompt) => any;
}
const Profile: React.FC<ProfileProps> = ({
    name,
    desc,
    data,
    handleEdit,
    handleDelete,
}) => {
    return (
        <section className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{name} Profile</span>
            </h1>
            <p className="desc text-left">{desc}</p>
            <div className="mt-10 prompt_layout">
                {data.map((post) => {
                    return (
                        <PromptCard
                            key={post._id}
                            post={post}
                            handleEdit={() => handleEdit && handleEdit(post)}
                            handleDelete={() =>
                                handleDelete && handleDelete(post)
                            }
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default Profile;
