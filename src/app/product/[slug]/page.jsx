import { notFound } from "next/navigation";

import { getProductBySlug } from "@/lib/api";

import { requireSession } from "@/lib/session";

import ProductDetails from "@/components/products/ProductDetails";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }) {
    const { slug } = await params;

    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    await requireSession(`/product/${slug}`);

    return <ProductDetails product={product} />;
}