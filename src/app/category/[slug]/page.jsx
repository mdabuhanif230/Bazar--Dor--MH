import { notFound } from "next/navigation";

import { getCategories, getCategoryProducts } from "@/lib/api";
import CategoryProducts from "@/components/products/CategoryProducts";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }) {
    const { slug } = await params;

    const categories = await getCategories();

    const category = categories.find(function (item) {
        return item.slug === slug;
    });

    if (!category) {
        notFound();
    }

    const products = await getCategoryProducts(slug);

    if (products.length === 0) {
        notFound();
    }

    return (
        <>
            <section className="panel category-heading">
                <span className="details-emoji">
                    {category.icon}
                </span>

                <div>
                    <h1>{category.nameBn}</h1>

                    <p>এই বিভাগের সব পণ্যের আজকের বাজারদর।</p>
                </div>
            </section>

            <CategoryProducts products={products} />
        </>
    );
}