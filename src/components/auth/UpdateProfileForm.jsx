"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Input } from "@heroui/react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({ initialName }) {
    const router = useRouter();

    const [name, setName] = useState(initialName || "");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    function handleNameChange(event) {
        setName(event.target.value);
    }

    async function submit(event) {
        event.preventDefault();

        if (busy) {
            return;
        }

        setError("");

        const updatedName = name.trim();

        if (updatedName.length < 2 || updatedName.length > 80) {
            const message = "নাম ২ থেকে ৮০ অক্ষরের মধ্যে দিন।";

            setError(message);
            toast.error(message);
            return;
        }

        setBusy(true);

        try {
            const result = await authClient.updateUser({
                name: updatedName,
            });

            if (result.error) {
                throw new Error(result.error.message);
            }

            await authClient.getSession({
                query: {
                    disableCookieCache: true,
                },
            });

            toast.success("আপনার নাম আপডেট হয়েছে।");
            router.push("/profile");
            router.refresh();
        } catch (error) {
            const message = error.message || "তথ্য আপডেট হয়নি।";

            setError(message);
            toast.error(message);
        } finally {
            setBusy(false);
        }
    }

    let buttonText = "তথ্য আপডেট করুন";

    if (busy) {
        buttonText = "আপডেট হচ্ছে...";
    }

    return (
        <section className="mx-auto mt-[25px] mb-[60px] max-w-[680px]">
            <h1 className="text-[25px] font-semibold">
                তথ্য আপডেট করুন
            </h1>

            <p className="mb-5 text-xs text-[#78877d]">
                আপনার নাম পরিবর্তন করে সংরক্ষণ করুন।
            </p>

            <form
                onSubmit={submit}
                noValidate
                className="rounded-xl border border-[#e7eee9] bg-[#ffffffba] p-6"
            >
                <label
                    htmlFor="profile-name"
                    className="mb-1.5 block text-xs font-medium"
                >
                    নাম
                </label>

                <Input
                    id="profile-name"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    autoComplete="name"
                    maxLength={80}
                    required
                    className="mb-[13px] h-[39px] w-full rounded-md border border-[#e4ece6] bg-[#fbfdfb] px-3 text-xs shadow-none"
                />

                {error && (
                    <p
                        role="alert"
                        className="mb-2.5 text-xs text-[#d74742]"
                    >
                        {error}
                    </p>
                )}

                <Button
                    type="submit"
                    isDisabled={busy}
                    className="mt-[5px] h-[38px] min-h-[38px] w-full rounded-md border border-[#008d3d] bg-[#008d3d] text-[13px] font-medium text-white shadow-none hover:border-[#007833] hover:bg-[#007833] disabled:cursor-wait"
                >
                    {buttonText}
                </Button>
            </form>

            <Link
                href="/profile"
                className="mt-[22px] block text-center text-xs text-[#78877d] hover:text-[#008d3d]"
            >
                ← প্রোফাইলে ফিরে যান
            </Link>
        </section>
    );
}