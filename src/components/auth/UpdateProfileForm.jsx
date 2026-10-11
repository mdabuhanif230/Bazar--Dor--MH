"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({ initialName }) {
    const router = useRouter();

    const [name, setName] = useState(initialName);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    function handleNameChange(event) {
        setName(event.target.value);
    }

    async function submit(event) {
        event.preventDefault();
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
        <section className="profile-page">
            <h1>তথ্য আপডেট করুন</h1>

            <p className="muted">
                আপনার নাম পরিবর্তন করে সংরক্ষণ করুন।
            </p>

            <form
                className="panel update-form"
                onSubmit={submit}
                noValidate
            >
                <label htmlFor="profile-name">নাম</label>

                <input
                    className="input"
                    id="profile-name"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    autoComplete="name"
                    maxLength={80}
                    required
                />

                {error && (
                    <p role="alert" className="form-error">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="btn btn-primary auth-submit"
                    disabled={busy}
                >
                    {buttonText}
                </button>
            </form>

            <Link className="back-link" href="/profile">
                ← প্রোফাইলে ফিরে যান
            </Link>
        </section>
    );
}