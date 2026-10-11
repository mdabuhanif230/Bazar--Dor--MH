import Link from "next/link";

export default function NotFound() {
    return (
        <div className="mx-auto mt-[65px] mb-[100px] max-w-[620px] text-center">
            <p className="text-[60px] leading-none font-bold text-[#008d3d]">
                ৪০৪
            </p>

            <h1 className="mt-[14px] mb-2 text-[26px] font-semibold">
                পেজটি পাওয়া যায়নি
            </h1>

            <p className="mb-[22px] text-[#78877d]">
                আপনার খোঁজা পেজ বা পণ্যটি নেই, অথবা ঠিকানাটি ভুল।
            </p>

            <Link
                href="/"
                className="inline-flex min-h-10 items-center justify-center rounded-md border border-[#008d3d] bg-[#008d3d] px-4 py-2 text-sm font-medium text-white hover:border-[#007833] hover:bg-[#007833]"
            >
                হোম পেজে ফিরে যান
            </Link>
        </div>
    );
}