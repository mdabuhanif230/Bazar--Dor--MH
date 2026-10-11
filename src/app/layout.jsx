import "@fontsource/hind-siliguri/400.css";
import "@fontsource/hind-siliguri/500.css";
import "@fontsource/hind-siliguri/600.css";
import "@fontsource/hind-siliguri/700.css";

import "./globals.css";

import { Suspense } from "react";

import Navbar from "@/components/layout/Navbar";
import PriceTicker from "@/components/layout/PriceTicker";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/layout/Providers";

import { getCategories, getProducts } from "@/lib/api";

export const metadata = {
    title: {
        default: "বাজার দর | আজকের বাজারের দাম",
        template: "%s | বাজার দর",
    },
    description:
        "প্রয়োজনীয় পণ্যের আজকের দাম, দামের পরিবর্তন এবং বাজারভিত্তিক দামের তুলনা।",
};

async function Header({ date }) {
    let categories = [];
    let failed = false;

    try {
        categories = await getCategories();
    } catch {
        failed = true;
    }

    return (
        <>
            <Navbar categories={categories} date={date} />

            {failed && (
                <p role="alert" className="ticker-fallback">
                    বিভাগের তথ্য পাওয়া যাচ্ছে না। আবার পেজ রিফ্রেশ করুন।
                </p>
            )}
        </>
    );
}


async function Ticker() {
    let products = [];
    let failed = false;

    try {
        products = await getProducts();
    } catch {
        failed = true;
    }

    if (failed) {
        return (
            <div role="alert" className="ticker-fallback">
                বাজারদর পাওয়া যাচ্ছে না। আবার পেজ রিফ্রেশ করুন।
            </div>
        );
    }

    return <PriceTicker products={products} />;
}

export default function RootLayout({ children }) {
    const date = new Intl.DateTimeFormat("bn-BD", {
        dateStyle: "long",
        timeZone: "Asia/Dhaka",
    }).format(new Date());

    return (
        <html lang="bn" data-theme="bazardor">
            <body>
                <Providers>
                    <Suspense
                        fallback={<Navbar categories={[]} date={date} />}
                    >
                        <Header date={date} />
                    </Suspense>

                    <Suspense
                        fallback={
                            <div
                                className="ticker-fallback skeleton"
                                role="status"
                                aria-label="দামের তালিকা লোড হচ্ছে"
                            />
                        }
                    >
                        <Ticker />
                    </Suspense>

                    <main className="site-container main-content">
                        {children}
                    </main>

                    <Footer />
                </Providers>
            </body>
        </html>
    );
}