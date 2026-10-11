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
            <section className="mb-[18px] flex items-center gap-[13px] rounded-xl border border-[#e7eee9] bg-[#ffffffba] p-5">
                <span className="grid h-[55px] w-[55px] shrink-0 place-items-center rounded-full bg-[#eef4ef] text-[32px]">
                    {category.icon}
                </span>

                <div>
                    <h1 className="text-[26px] font-semibold">
                        {category.nameBn}
                    </h1>

                    <p className="text-xs text-[#78877d]">
                        এই বিভাগের সব পণ্যের আজকের বাজারদর।
                    </p>
                </div>
            </section>

            <CategoryProducts products={products} />
        </>
    );
}