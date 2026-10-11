"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { authClient } from "@/lib/auth-client";

export default function SocialLogin() {
    const [busy, setBusy] = useState(null);

    async function login(provider) {
        setBusy(provider);

        try {
            const result = await authClient.signIn.social({
                provider,
                callbackURL: "/?auth=success",
                errorCallbackURL: "/signin?error=social",
            });

            if (result.error) {
                throw new Error(result.error.message);
            }
        } catch (error) {
            toast.error(error.message || "সোশ্যাল সাইন ইন হয়নি।");
        } finally {
            setBusy(null);
        }
    }

    const buttonStyle = `
    flex min-h-11 w-full items-center justify-center gap-3
    rounded-lg border px-4 py-3 text-sm font-medium
    shadow-sm transition hover:shadow-md
    focus-visible:outline-2 focus-visible:outline-offset-2
    focus-visible:outline-green-600
    disabled:cursor-wait disabled:opacity-60
  `;

    return (
        <>
            <div className="auth-divider">অথবা</div>

            <div className="flex flex-col gap-3">
                <button
                    type="button"
                    disabled={busy !== null}
                    onClick={() => login("google")}
                    className={`${buttonStyle}
            border-gray-200 bg-white text-gray-700
            hover:border-gray-300 hover:bg-gray-50
          `}
                >
                    {busy === "google" ? (
                        <span className="loading loading-spinner loading-xs" />
                    ) : (
                        <FcGoogle size={20} aria-hidden="true" />
                    )}

                    <span>
                        {busy === "google"
                            ? "অপেক্ষা করুন..."
                            : "Google দিয়ে সাইন ইন"}
                    </span>
                </button>

                <button
                    type="button"
                    disabled={busy !== null}
                    onClick={() => login("github")}
                    className={`${buttonStyle}
            border-gray-900 bg-gray-900 text-white
            hover:border-gray-800 hover:bg-gray-800
          `}
                >
                    {busy === "github" ? (
                        <span className="loading loading-spinner loading-xs" />
                    ) : (
                        <FaGithub size={20} aria-hidden="true" />
                    )}

                    <span>
                        {busy === "github"
                            ? "অপেক্ষা করুন..."
                            : "GitHub দিয়ে সাইন ইন"}
                    </span>
                </button>
            </div>
        </>
    );
}