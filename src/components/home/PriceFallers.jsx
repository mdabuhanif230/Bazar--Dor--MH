import ProductCard from "@/components/products/ProductCard";
import { topMovers } from "@/utils/sortProducts";

export default function PriceFallers({ products }) {
    const items = topMovers(products, "down");

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
            <p className="muted">
                আজ কোনো পণ্যের দাম কমেনি।
            </p>
        );
    }

    return (
        <section className="product-section">
            <h2>
                <span className="green-text">▼</span> আজ দাম কমেছে
            </h2>

            <div className="product-grid">
                {productCards}
            </div>

            {emptyMessage}
        </section>
    );
}