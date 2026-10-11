import {
    formatPrice,
    formatNumber,
    toNumber,
} from "@/utils/formatPrice";

export default function MarketPriceTable({ markets }) {
    const cellStyle =
        "border-b border-[#e4ece6] px-3 py-[11px] whitespace-nowrap";

    return (
        <div>
            <h2 className="mb-[14px] text-[17px] font-semibold">
                বাজারভিত্তিক আজকের দাম
            </h2>

            {markets.length ? (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs">
                        <caption className="sr-only">
                            বিভিন্ন বাজারে সর্বনিম্ন, সর্বোচ্চ ও গড় দাম
                        </caption>

                        <thead className="text-[11px] text-[#78877e]">
                            <tr>
                                <th className={`${cellStyle} font-medium`}>
                                    বাজার
                                </th>

                                <th className={`${cellStyle} font-medium`}>
                                    বিভাগ
                                </th>

                                <th className={`${cellStyle} font-medium`}>
                                    সর্বনিম্ন
                                </th>

                                <th className={`${cellStyle} font-medium`}>
                                    সর্বোচ্চ
                                </th>

                                <th className={`${cellStyle} text-right font-medium`}>
                                    গড়
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {markets.map(function (market, index) {
                                const minimumPrice = toNumber(market.min);
                                const maximumPrice = toNumber(market.max);

                                const averagePrice =
                                    (minimumPrice + maximumPrice) / 2;

                                return (
                                    <tr
                                        key={`${market.market}-${index}`}
                                        className="even:bg-[#eff5f0]"
                                    >
                                        <td className={`${cellStyle} font-medium`}>
                                            {market.market}
                                        </td>

                                        <td className={cellStyle}>
                                            {market.division}
                                        </td>

                                        <td className={cellStyle}>
                                            {formatPrice(market.min)}
                                        </td>

                                        <td className={cellStyle}>
                                            {formatPrice(market.max)}
                                        </td>

                                        <td className={`${cellStyle} text-right`}>
                                            {formatNumber(averagePrice, 1)} টাকা
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-[#78877d]">
                    এই পণ্যের বাজারভিত্তিক দাম পাওয়া যায়নি।
                </p>
            )}
        </div>
    );
}