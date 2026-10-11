import { Suspense } from "react";

import Hero from "@/components/home/Hero";

import HomeProducts from "@/components/home/HomeProducts";

import Loading from "@/components/shared/Loading";

export const dynamic = "force-dynamic";

export default function HomePage(

) {
    return <>
        <Hero />
        <Suspense fallback={<Loading count={12} />}><HomeProducts /></Suspense>
    </>;
}
