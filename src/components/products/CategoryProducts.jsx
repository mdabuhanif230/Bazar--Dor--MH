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
            <div className="panel sort-toolbar">
                <span>
                    {productCount}টি পণ্য পাওয়া গেছে
                </span>

                <SortDropdown
                    value={order}
                    onChange={setOrder}
                />
            </div>

            <div className="product-grid">
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