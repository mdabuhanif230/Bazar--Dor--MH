import Link from "next/link";

export default function BackToHome() {
    return (
        <Link
            href="/"
            className="back-link"
        >
            ← হোম পেজে ফিরে যান
        </Link>
    );
}