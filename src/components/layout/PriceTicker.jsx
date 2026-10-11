import {
    formatPrice,
    unitLabel,
    changeInfo,
} from "@/utils/formatPrice";

export default function PriceTicker({ products = [] }) {
    if (!products.length) {
        return null;
    }

    const items = products.slice(0, 12);

    function renderProduct(product) {
        const change = changeInfo(product);
        const unit = unitLabel(product.unit).replace("প্রতি ", "");

        return (
            <span className="ticker-item" key={product.id}>
                <span>{product.image}</span>

                <span>
                    {product.nameBn} {formatPrice(product.today)}/{unit}
                </span>

                <b className={`ticker-${change.dir}`}>
                    {change.text}
                </b>
            </span>
        );
    }

    return (
        <div
            className="ticker"
            aria-label="পণ্যের দামের চলমান তালিকা"
        >
            <div className="ticker-track">
                {[0, 1].map(function (copy) {
                    return (
                        <div
                            key={copy}
                            className="ticker-group"
                            aria-hidden={copy === 1 ? true : undefined}
                        >
                            {items.map(renderProduct)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}