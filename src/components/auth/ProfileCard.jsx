"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

function ProfilePhoto({ user }) {
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
                width={80}
                height={80}
                unoptimized
                referrerPolicy="no-referrer"
                onError={() => setImageFailed(true)}
                className="h-20 w-20 shrink-0 rounded-2xl object-cover"
            />
        );
    }

    return (
        <span
            aria-label="আপনার প্রোফাইল"
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-3xl font-semibold text-green-800"
        >
            {firstLetter}
        </span>
    );
}

export default function ProfileCard({ initialUser }) {
    const { data: session } = authClient.useSession();

    const user = session?.user || initialUser;

    if (!user) {
        return null;
    }

    return (
        <section className="mx-auto mt-[25px] mb-[60px] max-w-[680px]">
            <h1 className="text-[25px] font-semibold">
                আমার প্রোফাইল
            </h1>

            <p className="mb-5 text-xs text-[#78877d]">
                আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
            </p>

            <div className="mt-6 flex flex-col gap-5 rounded-xl border border-[#e7eee9] bg-[#ffffffba] p-6 sm:flex-row sm:items-center">
                <div className="flex min-w-0 items-center gap-4">
                    <ProfilePhoto
                        key={`${user.id}-${user.image || ""}`}
                        user={user}
                    />

                    <div className="min-w-0">
                        <h2 className="text-xl font-semibold">
                            {user.name}
                        </h2>

                        <p className="break-all text-[#78877d]">
                            {user.email}
                        </p>
                    </div>
                </div>

                <Link
                    href="/profile/update"
                    className="inline-flex min-h-8 shrink-0 items-center justify-center rounded-md border border-[#008d3d] bg-[#008d3d] px-3 text-sm font-medium text-white hover:border-[#007833] hover:bg-[#007833] sm:ml-auto"
                >
                    তথ্য আপডেট করুন
                </Link>
            </div>
        </section>
    );
}