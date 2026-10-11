"use client";

import Link from "next/link";
import { Button } from "@heroui/react";

export default function ErrorPage({ reset }) {
    return (
        <div className="mx-auto mt-[65px] mb-[100px] max-w-[620px] text-center">
            <h1 className="mt-[14px] mb-2 text-[26px] font-semibold">
                তথ্য লোড করা যায়নি
            </h1>

            <p className="mb-[22px] text-[#78877d]">
                ইন্টারনেট সংযোগ বা সেবা সাময়িকভাবে অপ্রাপ্য।
                আবার চেষ্টা করুন।
            </p>

            <div className="flex flex-wrap justify-center gap-2.5">
                <Button
                    type="button"
                    onPress={() => reset()}
                    className="h-10 min-h-10 rounded-md border border-[#008d3d] bg-[#008d3d] px-4 text-sm font-medium text-white shadow-none hover:border-[#007833] hover:bg-[#007833]"
                >
                    আবার চেষ্টা করুন
                </Button>

                <Link
                    href="/"
                    className="inline-flex min-h-10 items-center justify-center rounded-md border border-[#dfe9e2] bg-[#f0f6f2] px-4 py-2 text-sm font-medium text-[#1d3024] hover:bg-[#dfe9e2]"
                >
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
}