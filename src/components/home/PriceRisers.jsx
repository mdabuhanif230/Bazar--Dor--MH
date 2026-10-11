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
            <p className="muted">
                আজ কোনো পণ্যের দাম বাড়েনি।
            </p>
        );
    }

    return (
        <section className="product-section">
            <h2>
                <span className="red-text">▲</span> আজ দাম বেড়েছে
            </h2>

            <div className="product-grid">
                {productCards}
            </div>

            {emptyMessage}
        </section>
    );
}