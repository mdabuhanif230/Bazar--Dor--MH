"use client";

import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

import AuthFeedback from "@/components/shared/AuthFeedback";

export default function Providers({ children }) {
    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3500,
                    style: {
                        fontFamily: "inherit",
                        fontSize: "14px",
                    },
                }}
            />

            <Suspense fallback={null}>
                <AuthFeedback />
            </Suspense>

            {children}
        </>
    );
}