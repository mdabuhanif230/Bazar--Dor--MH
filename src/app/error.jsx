"use client";

import Link from "next/link";

export default function ErrorPage({ reset }) {
    return (
        <div className="empty-state">
            <h1>তথ্য লোড করা যায়নি</h1>

            <p>
                ইন্টারনেট সংযোগ বা সেবা সাময়িকভাবে অপ্রাপ্য।
                আবার চেষ্টা করুন।
            </p>

            <div className="error-actions">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={reset}
                >
                    আবার চেষ্টা করুন
                </button>

                <Link
                    href="/"
                    className="btn"
                >
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
}