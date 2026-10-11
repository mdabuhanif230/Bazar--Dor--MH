import {
    formatPrice,
    formatNumber,
    toNumber,
} from "@/utils/formatPrice";

export default function MarketPriceTable({ markets }) {
    return (
        <div className="market-section">
            <h2>বাজারভিত্তিক আজকের দাম</h2>

            {markets.length ? (
                <div className="table-scroll">
                    <table className="table market-table">
                        <caption className="sr-only">
                            বিভিন্ন বাজারে সর্বনিম্ন, সর্বোচ্চ ও গড় দাম
                        </caption>

                        <thead>
                            <tr>
                                <th>বাজার</th>
                                <th>বিভাগ</th>
                                <th>সর্বনিম্ন</th>
                                <th>সর্বোচ্চ</th>
                                <th>গড়</th>
                            </tr>
                        </thead>

                        <tbody>
                            {markets.map(function (market, index) {
                                const minimumPrice = toNumber(market.min);
                                const maximumPrice = toNumber(market.max);

                                const averagePrice =
                                    (minimumPrice + maximumPrice) / 2;

                                return (
                                    <tr key={`${market.market}-${index}`}>
                                        <td>{market.market}</td>
                                        <td>{market.division}</td>
                                        <td>{formatPrice(market.min)}</td>
                                        <td>{formatPrice(market.max)}</td>

                                        <td>
                                            {formatNumber(averagePrice, 1)} টাকা
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="muted">
                    এই পণ্যের বাজারভিত্তিক দাম পাওয়া যায়নি।
                </p>
            )}
        </div>
    );
}