"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@heroui/react";
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
        if (busy) return;

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
            <div
                role="status"
                aria-label="প্রোফাইল লোড হচ্ছে"
                className="h-9 w-28 rounded-lg bg-[#dfe9e2] motion-safe:animate-pulse"
            />
        );
    } else if (session?.user) {
        const user = session.user;

        authContent = (
            <details className="relative">
                <summary className="flex list-none items-center gap-2 [&::marker]:content-[''] [&::-webkit-details-marker]:hidden">
                    <ProfileAvatar
                        key={`${user.id}-${user.image || ""}`}
                        user={user}
                    />

                    <span className="max-w-[130px] truncate max-[540px]:max-w-20 max-[540px]:text-xs">
                        {user.name || user.email}
                    </span>
                </summary>

                <div className="absolute top-[42px] right-0 z-50 min-w-[225px] rounded-lg border border-[#e4ece6] bg-white p-4 shadow-[0_10px_25px_#1d302414]">
                    <strong className="block wrap-anywhere">
                        {user.name}
                    </strong>

                    <small className="mb-2 block text-[11px] text-[#78877d] wrap-anywhere">
                        {user.email}
                    </small>

                    <Link
                        href="/profile"
                        onClick={closeUserMenu}
                        className="block w-full py-1.5 text-left text-[13px]"
                    >
                        আমার প্রোফাইল
                    </Link>

                    <Button
                        type="button"
                        variant="ghost"
                        onPress={logout}
                        isDisabled={busy}
                        className="h-auto min-h-0 w-full justify-start rounded-none bg-transparent px-0 py-1.5 text-[13px] font-normal text-[#db504c] shadow-none"
                    >
                        {busy ? "অপেক্ষা করুন..." : "সাইন আউট"}
                    </Button>
                </div>
            </details>
        );
    } else {
        authContent = (
            <>
                <Link
                    href="/signin"
                    className="text-[13px] font-semibold"
                >
                    সাইন ইন
                </Link>

                <Link
                    href="/signup"
                    className="inline-flex h-8 items-center justify-center rounded-md border border-[#008d3d] bg-[#008d3d] px-3 text-sm font-medium text-white hover:border-[#007833] hover:bg-[#007833]"
                >
                    সাইন আপ
                </Link>
            </>
        );
    }

    return (
        <header className="border-b border-[#e4ece6] bg-[#fcfefc]">
            <div className="mx-auto w-[calc(100%-48px)] max-w-[1120px] max-[767px]:w-[calc(100%-32px)]">
                <div className="flex min-h-[72px] items-center justify-between gap-4 max-[540px]:min-h-[66px]">
                    <Link
                        href="/"
                        aria-label="বাজার দর হোম"
                        className="flex items-center gap-2.5"
                    >
                        <Image
                            src="/images/logo-icon.png"
                            alt="বাজার দর লোগো"
                            width={39}
                            height={39}
                            className="h-8.5 w-8.5 shrink-0 rounded-[10px] object-contain sm:h-9.75 sm:w-9.75"
                        />

                        <span>
                            <strong className="block text-[21px] leading-[1.1] max-[540px]:text-lg">
                                বাজার দর
                            </strong>

                            <small className="mt-1 block text-[11px] text-[#78877d] max-[540px]:text-[9px]">
                                {date}
                            </small>
                        </span>
                    </Link>

                    <div className="flex items-center gap-5 max-[540px]:gap-2.5">
                        {authContent}
                    </div>
                </div>

                <nav
                    aria-label="পণ্যের বিভাগ"
                    className="flex items-center gap-2.5 overflow-x-auto pt-1.5 pb-2.5 [scrollbar-width:thin] max-[540px]:gap-[3px]"
                >
                    {categories.map(function (category) {
                        const categoryPath = `/category/${category.slug}`;
                        const isActive = path === categoryPath;

                        return (
                            <Link
                                key={category.slug}
                                href={categoryPath}
                                aria-current={isActive ? "page" : undefined}
                                className={`inline-flex shrink-0 items-center gap-[7px] rounded-md px-[15px] py-1.5 text-[13px] whitespace-nowrap hover:bg-[#eaf4ed] max-[900px]:px-2.5 max-[540px]:py-[5px] ${isActive
                                        ? "bg-[#e1f0e6] font-semibold text-[#008d3d]"
                                        : ""
                                    }`}
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