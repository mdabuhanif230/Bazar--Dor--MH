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

    return (
        <>
            <div className="breadcrumb">
                <Link href="/">হোম</Link>

                <span>›</span>

                <Link href={categoryPath}>
                    {product.categoryNameBn}
                </Link>

                <span>›</span>

                <span>{product.nameBn}</span>
            </div>

            <section className="panel details-summary">
                <div className="details-title">
                    <span className="details-emoji">
                        {product.image}
                    </span>

                    <div>
                        <h1>{product.nameBn}</h1>

                        <p>
                            দেশের বিভিন্ন বাজারের আজকের দামের সারসংক্ষেপ।
                        </p>

                        <div className="detail-tags">
                            <Link href={categoryPath}>
                                {product.categoryIcon} {product.categoryNameBn}
                            </Link>

                            <span>{unit}</span>
                        </div>
                    </div>
                </div>

                <div className="today-price">
                    <small>আজকের দাম</small>

                    <strong>{price}</strong>

                    <span className={`change-badge change-${change.dir}`}>
                        {change.text}
                    </span>
                </div>
            </section>

            <section className="panel market-panel">
                <h2>দামের সারসংক্ষেপ</h2>

                {summary ? (
                    <div className="summary-grid">
                        <div className="summary-stat">
                            <small>সর্বনিম্ন দাম</small>

                            <strong className="green-text">
                                {formatPrice(summary.min)}
                            </strong>

                            <p>সব বাজারের মধ্যে সর্বনিম্ন</p>
                        </div>

                        <div className="summary-stat">
                            <small>সর্বোচ্চ দাম</small>

                            <strong className="red-text">
                                {formatPrice(summary.max)}
                            </strong>

                            <p>সব বাজারের মধ্যে সর্বোচ্চ</p>
                        </div>

                        <div className="summary-stat">
                            <small>গড় দাম</small>

                            <strong className="green-text">
                                {formatNumber(summary.average, 1)} টাকা
                            </strong>

                            <p>বাজারগুলোর মধ্যদামের গড়</p>
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