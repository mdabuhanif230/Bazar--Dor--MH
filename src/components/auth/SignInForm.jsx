"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input } from "@heroui/react";
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

    const inputStyle =
        "mb-[13px] h-[39px] w-full rounded-md border border-[#e4ece6] bg-[#fbfdfb] px-3 text-xs shadow-none";

    const labelStyle =
        "mb-1.5 block text-xs font-medium";

    async function submit(event) {
        event.preventDefault();

        if (busy) {
            return;
        }

        setError("");

        const values = new FormData(event.currentTarget);
        const email = String(values.get("email") || "").trim();
        const password = String(values.get("password") || "");

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            const message = "সঠিক ইমেইল দিন.";

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
        <div className="rounded-xl border border-[#e7eee9] bg-[#ffffffba] p-[22px] max-[540px]:p-5">
            <form onSubmit={submit} noValidate>
                <label htmlFor="email" className={labelStyle}>
                    ইমেইল
                </label>

                <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="আপনার ইমেইল লিখুন"
                    required
                    maxLength={254}
                    className={inputStyle}
                />

                <label htmlFor="password" className={labelStyle}>
                    পাসওয়ার্ড
                </label>

                <div className="relative">
                    <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="কমপক্ষে ৮ অক্ষর"
                        minLength={8}
                        maxLength={128}
                        required
                        className={`${inputStyle} pr-12`}
                    />

                    <button
                        type="button"
                        aria-controls="password"
                        aria-pressed={showPassword}
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
                        className="absolute top-0 right-0 flex h-[39px] w-11 items-center justify-center text-gray-500 hover:text-green-700"
                    >
                        <EyeIcon visible={showPassword} />
                    </button>
                </div>

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
                    {busy && (
                        <span
                            aria-hidden="true"
                            className="h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none"
                        />
                    )}

                    {busy ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
                </Button>
            </form>

            <SocialLogin />

            <p className="mt-[14px] text-center text-[11px] text-[#78877d]">
                অ্যাকাউন্ট নেই?{" "}
                <Link
                    href="/signup"
                    className="font-medium text-[#008d3d]"
                >
                    সাইন আপ করুন
                </Link>
            </p>
        </div>
    );
}