"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { authClient } from "@/lib/auth-client";

export default function SocialLogin() {
    const [busy, setBusy] = useState(null);

    async function login(provider) {
        if (busy !== null) {
            return;
        }

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

    const buttonStyle =
        "flex h-auto min-h-11 w-full items-center justify-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium shadow-sm transition hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:cursor-wait disabled:opacity-60";

    const spinnerStyle =
        "h-3 w-3 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none";

    return (
        <>
            <div className="my-[14px] flex items-center gap-2.5 text-[11px] text-[#78877d]">
                <span className="h-px flex-1 bg-[#e4ece6]" />
                অথবা
                <span className="h-px flex-1 bg-[#e4ece6]" />
            </div>

            <div className="flex flex-col gap-3">
                <Button
                    type="button"
                    isDisabled={busy !== null}
                    onPress={() => login("google")}
                    className={`${buttonStyle} border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50`}
                >
                    {busy === "google" ? (
                        <span
                            aria-hidden="true"
                            className={spinnerStyle}
                        />
                    ) : (
                        <FcGoogle size={20} aria-hidden="true" />
                    )}

                    <span>
                        {busy === "google"
                            ? "অপেক্ষা করুন..."
                            : "Google দিয়ে সাইন ইন"}
                    </span>
                </Button>

                <Button
                    type="button"
                    isDisabled={busy !== null}
                    onPress={() => login("github")}
                    className={`${buttonStyle} border-gray-900 bg-gray-900 text-white hover:border-gray-800 hover:bg-gray-800`}
                >
                    {busy === "github" ? (
                        <span
                            aria-hidden="true"
                            className={spinnerStyle}
                        />
                    ) : (
                        <FaGithub size={20} aria-hidden="true" />
                    )}

                    <span>
                        {busy === "github"
                            ? "অপেক্ষা করুন..."
                            : "GitHub দিয়ে সাইন ইন"}
                    </span>
                </Button>
            </div>
        </>
    );
}