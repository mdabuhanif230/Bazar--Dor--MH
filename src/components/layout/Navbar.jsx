"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

function ProfileAvatar({ user }) {
    const [imageFailed, setImageFailed] = useState(false);

    const firstLetter = (
        user.email?.trim().charAt(0) ||
        user.name?.trim().charAt(0) ||
        "U"
    ).toUpperCase();

    if (user.image && !imageFailed) {
        return (
            <Image
                src={user.image}
                alt="আপনার প্রোফাইল ছবি"
                width={36}
                height={36}
                unoptimized
                referrerPolicy="no-referrer"
                onError={() => setImageFailed(true)}
                className="h-9 w-9 shrink-0 rounded-full object-cover"
            />
        );
    }

    return (
        <span
            aria-label="আপনার প্রোফাইল"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-base font-semibold text-green-800"
        >
            {firstLetter}
        </span>
    );
}

export default function Navbar({
    categories = [],
    date = "আজকের বাজারদর",
}) {
    const path = usePathname();
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const [busy, setBusy] = useState(false);

    async function logout() {
        setBusy(true);

        try {
            const result = await authClient.signOut();

            if (result.error) {
                throw new Error(
                    result.error.message || "সাইন আউট হয়নি।"
                );
            }

            toast.success("সফলভাবে সাইন আউট হয়েছে।");

            router.push("/");
            router.refresh();
        } catch (error) {
            toast.error(error.message || "সাইন আউট হয়নি।");
        } finally {
            setBusy(false);
        }
    }

    function closeUserMenu(event) {
        const menu = event.currentTarget.closest("details");

        if (menu) {
            menu.removeAttribute("open");
        }
    }

    let authContent;

    if (isPending) {
        authContent = (
            <div className="skeleton h-9 w-28 rounded-lg" />
        );
    } else if (session?.user) {
        const user = session.user;

        authContent = (
            <details className="user-menu">
                <summary>
                    <ProfileAvatar
                        key={`${user.id}-${user.image || ""}`}
                        user={user}
                    />

                    <span className="user-name">
                        {user.name || user.email}
                    </span>

                    
                </summary>

                <div className="user-dropdown">
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>

                    <Link
                        href="/profile"
                        onClick={closeUserMenu}
                    >
                        আমার প্রোফাইল
                    </Link>

                    <button
                        type="button"
                        onClick={logout}
                        disabled={busy}
                    >
                        {busy ? "অপেক্ষা করুন..." : "সাইন আউট"}
                    </button>
                </div>
            </details>
        );
    } else {
        authContent = (
            <>
                <Link
                    href="/signin"
                    className="sign-in-link"
                >
                    সাইন ইন
                </Link>

                <Link
                    href="/signup"
                    className="btn btn-primary btn-sm"
                >
                    সাইন আপ
                </Link>
            </>
        );
    }

    return (
        <header className="site-header">
            <div className="site-container">
                <div className="nav-top">
                    <Link
                        href="/"
                        className="brand"
                        aria-label="বাজার দর হোম"
                    >
                        <Image
                            src="/images/logo-icon.png"
                            alt="বাজার দর লোগো"
                            width={39}
                            height={39}
                            className="h-8.5 w-8.5 shrink-0 rounded-[10px] object-contain sm:h-9.75 sm:w-9.75"
                        />

                        <span>
                            <strong>বাজার দর</strong>
                            <small>{date}</small>
                        </span>
                    </Link>

                    <div className="auth-actions">
                        {authContent}
                    </div>
                </div>

                <nav
                    className="category-nav"
                    aria-label="পণ্যের বিভাগ"
                >
                    {categories.map(function (category) {
                        const categoryPath = `/category/${category.slug}`;
                        const isActive = path === categoryPath;

                        return (
                            <Link
                                key={category.slug}
                                href={categoryPath}
                                className={
                                    isActive
                                        ? "category-link active"
                                        : "category-link"
                                }
                                aria-current={isActive ? "page" : undefined}
                            >
                                <span>{category.icon}</span>
                                {category.nameBn}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}