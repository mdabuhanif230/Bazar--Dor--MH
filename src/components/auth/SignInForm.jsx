"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import SocialLogin from "./SocialLogin";

function EyeIcon({ visible }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />

            {visible && <path d="M3 3 21 21" />}
        </svg>
    );
}

export default function SignInForm() {
    const router = useRouter();

    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    async function submit(event) {
        event.preventDefault();
        setError("");

        const values = new FormData(event.currentTarget);

        const email = String(values.get("email") || "").trim();
        const password = String(values.get("password") || "");

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            const message = "সঠিক ইমেইল দিন।";

            setError(message);
            toast.error(message);
            return;
        }

        if (password.length < 8 || password.length > 128) {
            const message = "পাসওয়ার্ড ৮ থেকে ১২৮ অক্ষরের মধ্যে দিন।";

            setError(message);
            toast.error(message);
            return;
        }

        setBusy(true);

        try {
            const result = await authClient.signIn.email({
                email,
                password,
            });

            if (result.error) {
                throw new Error(
                    result.error.message || "ইমেইল বা পাসওয়ার্ড ভুল।"
                );
            }

            toast.success("সফলভাবে সাইন ইন হয়েছে।");

            router.push("/");
            router.refresh();
        } catch (error) {
            const message = error.message || "সাইন ইন ব্যর্থ হয়েছে।";

            setError(message);
            toast.error(message);
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="panel auth-card">
            <form onSubmit={submit} noValidate>
                <label htmlFor="email">ইমেইল</label>

                <input
                    className="input"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="আপনার ইমেইল লিখুন"
                    required
                    maxLength={254}
                />

                <label htmlFor="password">পাসওয়ার্ড</label>

                <div className="relative">
                    <input
                        className="input"
                        style={{ paddingRight: "48px" }}
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="কমপক্ষে ৮ অক্ষর"
                        minLength={8}
                        maxLength={128}
                        required
                    />

                    <button
                        type="button"
                        className="absolute right-0 top-0 flex h-9.75 w-11 items-center justify-center text-gray-500 hover:text-green-700"
                        aria-controls="password"
                        aria-label={
                            showPassword
                                ? "পাসওয়ার্ড লুকান"
                                : "পাসওয়ার্ড দেখুন"
                        }
                        title={
                            showPassword
                                ? "পাসওয়ার্ড লুকান"
                                : "পাসওয়ার্ড দেখুন"
                        }
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <EyeIcon visible={showPassword} />
                    </button>
                </div>

                {error && (
                    <p className="form-error" role="alert">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="btn btn-primary auth-submit"
                    disabled={busy}
                >
                    {busy ? (
                        <>
                            <span className="loading loading-spinner loading-xs" />
                            সাইন ইন হচ্ছে...
                        </>
                    ) : (
                        "সাইন ইন"
                    )}
                </button>
            </form>

            <SocialLogin />

            <p className="auth-switch">
                অ্যাকাউন্ট নেই?{" "}
                <Link href="/signup">সাইন আপ করুন</Link>
            </p>
        </div>
    );
}