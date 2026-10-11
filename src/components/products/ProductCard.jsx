import Link from "next/link";

import {
    formatPrice,
    unitLabel,
    changeInfo,
} from "@/utils/formatPrice";

export default function ProductCard({ product }) {
    const change = changeInfo(product);
    const price = formatPrice(product.today);
    const unit = unitLabel(product.unit);

    return (
        <Link
            href={`/product/${product.slug}`}
            className="panel product-card"
            aria-label={`${product.nameBn}, ${price}, বিস্তারিত দেখুন`}
        >
            <div className="product-card-top">
                <span className="product-emoji">
                    {product.image}
                </span>

                <div>
                    <h3>{product.nameBn}</h3>
                    <p>{unit}</p>
                </div>
            </div>

            <div className="product-price-label">
                আজকের দাম
            </div>

            <div className="product-price-row">
                <strong>{price}</strong>

                <span className={`change-badge change-${change.dir}`}>
                    {change.text}
                </span>
            </div>
        </Link>
    );
}