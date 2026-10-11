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

    let changeColor = "bg-[#edf1ee] text-[#88958d]";

    if (change.dir === "up") {
        changeColor = "bg-[#e5f7eb] text-[#15934d]";
    } else if (change.dir === "down") {
        changeColor = "bg-[#fff0ee] text-[#e65c53]";
    }

    return (
        <Link
            href={`/product/${product.slug}`}
            aria-label={`${product.nameBn}, ${price}, বিস্তারিত দেখুন`}
            className="block rounded-xl border border-[#e7eee9] bg-[#ffffffba] p-[18px] transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-[#aed6bb] hover:shadow-[0_4px_14px_#1d302408] max-[900px]:p-[14px] max-[540px]:p-[17px] motion-reduce:transition-none"
        >
            <div className="mb-[13px] flex items-center gap-[10px]">
                <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full bg-[#f0f5f1] text-[23px]">
                    {product.image}
                </span>

                <div>
                    <h3 className="text-[15px] leading-[1.4] font-semibold">
                        {product.nameBn}
                    </h3>

                    <p className="text-[11px] text-[#78877d]">
                        {unit}
                    </p>
                </div>
            </div>

            <div className="mb-0.5 text-[11px] text-[#78877d]">
                আজকের দাম
            </div>

            <div className="flex items-center justify-between gap-2">
                <strong className="text-[18px] leading-[1.3] font-semibold max-[900px]:text-[17px] max-[540px]:text-[20px]">
                    {price}
                </strong>

                <span
                    className={`inline-flex rounded-[5px] px-1.5 py-0.5 text-[10px] font-medium whitespace-nowrap max-[540px]:text-[11px] ${changeColor}`}
                >
                    {change.text}
                </span>
            </div>
        </Link>
    );
}