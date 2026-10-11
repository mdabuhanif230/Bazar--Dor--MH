import Link from "next/link";

import {
    formatPrice,
    formatNumber,
    unitLabel,
    changeInfo,
    marketSummary,
} from "@/utils/formatPrice";

import MarketPriceTable from "./MarketPriceTable";

export default function ProductDetails({ product }) {
    const markets = product.markets || [];
    const summary = marketSummary(markets);
    const change = changeInfo(product);

    const categoryPath = `/category/${product.category}`;
    const price = formatPrice(product.today);
    const unit = unitLabel(product.unit);

    let changeColor = "bg-[#edf1ee] text-[#88958d]";

    if (change.dir === "up") {
        changeColor = "bg-[#e5f7eb] text-[#15934d]";
    } else if (change.dir === "down") {
        changeColor = "bg-[#fff0ee] text-[#e65c53]";
    }

    const statStyle =
        "rounded-[9px] border border-[#e4ece6] p-4 max-[767px]:p-3";

    const numberStyle =
        "block text-[21px] font-semibold max-[767px]:text-[18px]";

    return (
        <>
            <div className="mb-5 flex flex-wrap gap-[9px] text-xs text-[#78877d]">
                <Link href="/" className="hover:text-[#008d3d]">
                    হোম
                </Link>

                <span>›</span>

                <Link
                    href={categoryPath}
                    className="hover:text-[#008d3d]"
                >
                    {product.categoryNameBn}
                </Link>

                <span>›</span>

                <span>{product.nameBn}</span>
            </div>

            <section className="mb-6 flex items-center justify-between gap-[25px] rounded-xl border border-[#e7eee9] bg-[#ffffffba] p-[25px] max-[540px]:flex-col max-[540px]:items-stretch max-[540px]:p-5">
                <div className="flex items-center gap-[17px] max-[540px]:gap-3">
                    <span className="grid h-[55px] w-[55px] shrink-0 place-items-center rounded-full bg-[#eef4ef] text-[32px]">
                        {product.image}
                    </span>

                    <div>
                        <h1 className="text-[26px] font-semibold max-[540px]:text-[23px]">
                            {product.nameBn}
                        </h1>

                        <p className="text-xs text-[#78877d]">
                            দেশের বিভিন্ন বাজারের আজকের দামের সারসংক্ষেপ।
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2.5 text-[11px] text-[#78877d]">
                            <Link
                                href={categoryPath}
                                className="rounded bg-[#eaf5ed] px-[7px] py-px text-[#008d3d]"
                            >
                                {product.categoryIcon} {product.categoryNameBn}
                            </Link>

                            <span>{unit}</span>
                        </div>
                    </div>
                </div>

                <div className="shrink-0 rounded-[9px] bg-[#f0f6f1] px-[18px] py-[14px] text-center max-[540px]:text-left">
                    <small className="block text-[11px] text-[#78877d]">
                        আজকের দাম
                    </small>

                    <strong className="block text-2xl leading-[1.4]">
                        {price}
                    </strong>

                    <span
                        className={`inline-flex rounded-[5px] px-1.5 py-0.5 text-[10px] font-medium whitespace-nowrap max-[540px]:mt-[5px] max-[540px]:text-[11px] ${changeColor}`}
                    >
                        {change.text}
                    </span>
                </div>
            </section>

            <section className="rounded-xl border border-[#e7eee9] bg-[#ffffffba] p-[22px] max-[540px]:p-4">
                <h2 className="mb-[14px] text-[17px] font-semibold">
                    দামের সারসংক্ষেপ
                </h2>

                {summary ? (
                    <div className="mb-[25px] grid grid-cols-3 gap-[15px] max-[767px]:gap-2 max-[540px]:grid-cols-1">
                        <div className={statStyle}>
                            <small className="block text-xs text-[#78877d]">
                                সর্বনিম্ন দাম
                            </small>

                            <strong className={`${numberStyle} text-[#008d3d]`}>
                                {formatPrice(summary.min)}
                            </strong>

                            <p className="text-[11px] text-[#78877d]">
                                সব বাজারের মধ্যে সর্বনিম্ন
                            </p>
                        </div>

                        <div className={statStyle}>
                            <small className="block text-xs text-[#78877d]">
                                সর্বোচ্চ দাম
                            </small>

                            <strong className={`${numberStyle} text-[#e6504a]`}>
                                {formatPrice(summary.max)}
                            </strong>

                            <p className="text-[11px] text-[#78877d]">
                                সব বাজারের মধ্যে সর্বোচ্চ
                            </p>
                        </div>

                        <div className={statStyle}>
                            <small className="block text-xs text-[#78877d]">
                                গড় দাম
                            </small>

                            <strong className={`${numberStyle} text-[#008d3d]`}>
                                {formatNumber(summary.average, 1)} টাকা
                            </strong>

                            <p className="text-[11px] text-[#78877d]">
                                বাজারগুলোর মধ্যদামের গড়
                            </p>
                        </div>
                    </div>
                ) : (
                    <p>দামের সারসংক্ষেপ পাওয়া যায়নি।</p>
                )}

                <MarketPriceTable markets={markets} />
            </section>
        </>
    );
}