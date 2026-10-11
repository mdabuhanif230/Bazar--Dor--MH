import ProductCard from "@/components/products/ProductCard";
import { topMovers } from "@/utils/sortProducts";

export default function PriceRisers({ products }) {
    const items = topMovers(products, "up");

    const productCards = items.map(function (product) {
        return (
            <ProductCard
                key={product.id}
                product={product}
            />
        );
    });

    let emptyMessage = null;

    if (items.length === 0) {
        emptyMessage = (
            <p className="text-[#78877d]">
                আজ কোনো পণ্যের দাম বাড়েনি।
            </p>
        );
    }

    return (
        <section className="mt-[30px]">
            <h2 className="mb-[14px] text-[17px] font-semibold">
                <span className="mr-[5px] text-[13px] text-[#e6504a]">
                    ▲
                </span>{" "}
                আজ দাম বেড়েছে
            </h2>

            <div className="grid grid-cols-3 gap-4 max-[900px]:gap-3 max-[767px]:grid-cols-2 max-[540px]:grid-cols-1">
                {productCards}
            </div>

            {emptyMessage}
        </section>
    );
}