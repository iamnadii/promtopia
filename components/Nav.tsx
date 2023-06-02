'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
    const { data: session }: { data: any } = useSession();
    const [providers, setProviders] = useState<unknown>(null);
    const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

    useEffect(() => {
        const setTheProvider = async () => {
            const response: any = await getProviders();
            setProviders(response);
        };
        setTheProvider();
    }, []);

    return (
        <nav className="flex-between mb-16 pt-3 w-full">
            <Link href="/" className="flex gap-2">
                <Image
                    src="/assets/images/logo.svg"
                    alt="Promptopia Logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text">Promptopia</p>
            </Link>
            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-3">
                        <Link href="create-prompt" className="black_btn">
                            Create Post
                        </Link>
                        <button
                            type="button"
                            className="outline_btn"
                            onClick={() => {
                                signOut();
                            }}
                        >
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image
                                src={session?.user?.image}
                                alt="profile"
                                width={37}
                                height={37}
                                className="rounded-full"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => {
                                const { id, name } = provider;
                                return (
                                    <button
                                        type="button"
                                        className="black_btn"
                                        key={name}
                                        onClick={() => {
                                            signIn(id);
                                        }}
                                    >
                                        Sign In
                                    </button>
                                );
                            })}
                    </>
                )}
            </div>
            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image
                            src={session?.user?.image}
                            alt="Promptopia Logo"
                            width={30}
                            height={30}
                            className="rounded-full"
                            onClick={() => {
                                setToggleDropdown((prev) => !prev);
                            }}
                        />
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    className="dropdown_link"
                                    href="/profile"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                    }}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    className="dropdown_link"
                                    href="/create-prompt"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                    }}
                                >
                                    Create Post
                                </Link>
                                <button
                                    className="w-full mt-3 black_btn"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => {
                                const { id, name } = provider;
                                return (
                                    <button
                                        type="button"
                                        className="black_btn"
                                        key={name}
                                        onClick={() => {
                                            signIn(id);
                                        }}
                                    >
                                        Sign In
                                    </button>
                                );
                            })}
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;
