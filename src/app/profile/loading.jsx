import { Skeleton } from "@heroui/react";

export default function ProfileLoading() {
    return (
        <div
            className="mx-auto mt-[25px] mb-[60px] max-w-[680px]"
            role="status"
            aria-label="প্রোফাইল লোড হচ্ছে"
        >
            <span className="sr-only">প্রোফাইল লোড হচ্ছে...</span>

            <div aria-hidden="true">
                <Skeleton className="mb-5 h-8 w-40 rounded-md bg-[#dfe9e2] motion-reduce:animate-none motion-reduce:before:animate-none" />

                <Skeleton className="h-32 w-full rounded-xl border border-[#e7eee9] bg-[#dfe9e2] motion-reduce:animate-none motion-reduce:before:animate-none" />
            </div>
        </div>
    );
}