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

        let changeColor = "text-[#78877d]";

        if (change.dir === "up") {
            changeColor = "text-[#e7514d]";
        } else if (change.dir === "down") {
            changeColor = "text-[#008d3d]";
        }

        return (
            <span
                key={product.id}
                className="inline-flex items-center gap-[7px] text-[11px] whitespace-nowrap"
            >
                <span>{product.image}</span>

                <span>
                    {product.nameBn} {formatPrice(product.today)}/{unit}
                </span>

                <b className={changeColor}>
                    {change.text}
                </b>
            </span>
        );
    }

    return (
        <div
            aria-label="পণ্যের দামের চলমান তালিকা"
            className="group flex h-[33px] items-center overflow-hidden border-b border-[#e4ece6] bg-white"
        >
            <div className="flex w-max animate-[ticker_65s_linear_infinite] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none">
                {[0, 1].map(function (copy) {
                    return (
                        <div
                            key={copy}
                            aria-hidden={copy === 1 ? true : undefined}
                            className="flex shrink-0 gap-9 pr-9"
                        >
                            {items.map(renderProduct)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}