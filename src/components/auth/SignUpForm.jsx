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

export default function SignUpForm() {
    const router = useRouter();

    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    async function submit(event) {
        event.preventDefault();
        setError("");

        const values = new FormData(event.currentTarget);

        const name = String(values.get("name") || "").trim();
        const email = String(values.get("email") || "").trim();
        const password = String(values.get("password") || "");
        const confirm = String(values.get("confirm") || "");

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let message = "";

        if (name.length < 2 || name.length > 80) {
            message = "নাম ২ থেকে ৮০ অক্ষরের মধ্যে দিন।";
        } else if (!emailPattern.test(email)) {
            message = "সঠিক ইমেইল দিন।";
        } else if (password.length < 8 || password.length > 128) {
            message = "পাসওয়ার্ড ৮ থেকে ১২৮ অক্ষরের মধ্যে দিন।";
        } else if (password !== confirm) {
            message = "পাসওয়ার্ড দুটি মিলছে না।";
        }

        if (message) {
            setError(message);
            toast.error(message);
            return;
        }

        setBusy(true);

        try {
            const result = await authClient.signUp.email({
                name,
                email,
                password,
            });

            if (result.error) {
                throw new Error(
                    result.error.message || "অ্যাকাউন্ট তৈরি হয়নি।"
                );
            }

            toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");

            router.push("/signin");
            router.refresh();
        } catch (error) {
            const message = error.message || "অ্যাকাউন্ট তৈরি হয়নি।";

            setError(message);
            toast.error(message);
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="panel auth-card">
            <form onSubmit={submit} noValidate>
                <label htmlFor="name">নাম</label>

                <input
                    className="input"
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="আপনার পুরো নাম"
                    required
                    maxLength={80}
                />

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
                        autoComplete="new-password"
                        placeholder="কমপক্ষে ৮ অক্ষর"
                        required
                        minLength={8}
                        maxLength={128}
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

                <label htmlFor="confirm">পাসওয়ার্ড নিশ্চিত করুন</label>

                <div className="relative">
                    <input
                        className="input"
                        style={{ paddingRight: "48px" }}
                        id="confirm"
                        name="confirm"
                        type={showConfirm ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="আবার লিখুন"
                        required
                        maxLength={128}
                    />

                    <button
                        type="button"
                        className="absolute right-0 top-0 flex h-9.75 w-11 items-center justify-center text-gray-500 hover:text-green-700"
                        aria-controls="confirm"
                        aria-label={
                            showConfirm
                                ? "নিশ্চিতকরণ পাসওয়ার্ড লুকান"
                                : "নিশ্চিতকরণ পাসওয়ার্ড দেখুন"
                        }
                        title={
                            showConfirm
                                ? "পাসওয়ার্ড লুকান"
                                : "পাসওয়ার্ড দেখুন"
                        }
                        onClick={() => setShowConfirm(!showConfirm)}
                    >
                        <EyeIcon visible={showConfirm} />
                    </button>
                </div>

                {error && (
                    <p className="form-error" role="alert">
                        {error}
                    </p>
                )}

                <button
                    className="btn btn-primary auth-submit"
                    disabled={busy}
                    type="submit"
                >
                    {busy ? (
                        <>
                            <span className="loading loading-spinner loading-xs" />
                            তৈরি হচ্ছে...
                        </>
                    ) : (
                        "অ্যাকাউন্ট তৈরি করুন"
                    )}
                </button>
            </form>

            <SocialLogin />

            <p className="auth-switch">
                অ্যাকাউন্ট আছে?{" "}
                <Link href="/signin">সাইন ইন করুন</Link>
            </p>
        </div>
    );
}