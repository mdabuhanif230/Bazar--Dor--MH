import Link from "next/link";

export default function NotFound() {
    return (
        <div className="empty-state">
            <p className="error-code">৪০৪</p>

            <h1>পেজটি পাওয়া যায়নি</h1>

            <p>
                আপনার খোঁজা পেজ বা পণ্যটি নেই, অথবা ঠিকানাটি ভুল।
            </p>

            <Link href="/" className="btn btn-primary">
                হোম পেজে ফিরে যান
            </Link>
        </div>
    );
}