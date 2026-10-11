import { Skeleton } from "@heroui/react";

export default function ProductLoading() {
    return (
        <div
            role="status"
            aria-label="পণ্যের বিস্তারিত লোড হচ্ছে"
        >
            <span className="sr-only">
                পণ্যের বিস্তারিত লোড হচ্ছে...
            </span>

            <div aria-hidden="true">
                <Skeleton className="mb-5 h-32 w-full rounded-xl border border-[#e7eee9] bg-[#dfe9e2] motion-reduce:animate-none motion-reduce:before:animate-none" />

                <Skeleton className="h-96 w-full rounded-xl border border-[#e7eee9] bg-[#dfe9e2] motion-reduce:animate-none motion-reduce:before:animate-none" />
            </div>
        </div>
    );
}