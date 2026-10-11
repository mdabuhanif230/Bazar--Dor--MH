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
                <p
                    role="alert"
                    className="h-[33px] p-1.5 text-center text-[11px]"
                >
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
            <div
                role="alert"
                className="h-[33px] p-1.5 text-center text-[11px]"
            >
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
        <html lang="bn" className="light" data-theme="light">
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
                                role="status"
                                aria-label="দামের তালিকা লোড হচ্ছে"
                                className="h-[33px] bg-[#dfe9e2] motion-safe:animate-pulse"
                            />
                        }
                    >
                        <Ticker />
                    </Suspense>

                    <main className="mx-auto min-h-[calc(100svh-224px)] w-[calc(100%-48px)] max-w-[1120px] pt-[30px] pb-[72px] max-[767px]:w-[calc(100%-32px)] max-[540px]:pt-5 max-[540px]:pb-[42px]">
                        {children}
                    </main>

                    <Footer />
                </Providers>
            </body>
        </html>
    );
}