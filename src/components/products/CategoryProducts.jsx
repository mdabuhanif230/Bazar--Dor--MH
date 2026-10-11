"use client";

import { useState } from "react";

import ProductCard from "./ProductCard";
import SortDropdown from "./SortDropdown";
import { sortProducts } from "@/utils/sortProducts";

export default function CategoryProducts({ products }) {
    const [order, setOrder] = useState("default");

    const productCount = products.length.toLocaleString("bn-BD");
    const sortedProducts = sortProducts(products, order);

    return (
        <>
            <div className="mb-[18px] flex items-center justify-between gap-4 rounded-xl border border-[#e7eee9] bg-[#ffffffba] px-[18px] py-3 max-[540px]:flex-col max-[540px]:items-start max-[540px]:gap-2.5 max-[540px]:px-[15px]">
                <span className="text-xs text-[#78877d]">
                    {productCount}টি পণ্য পাওয়া গেছে
                </span>

                <SortDropdown
                    value={order}
                    onChange={setOrder}
                />
            </div>

            <div className="grid grid-cols-3 gap-4 max-[900px]:gap-3 max-[767px]:grid-cols-2 max-[540px]:grid-cols-1">
                {sortedProducts.map(function (product) {
                    return (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    );
                })}
            </div>
        </>
    );
}