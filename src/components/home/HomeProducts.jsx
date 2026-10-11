import { getProducts } from "@/lib/api";
import PriceRisers from "./PriceRisers";
import PriceFallers from "./PriceFallers";
import AllProducts from "./AllProducts";

export default async function HomeProducts() {
    const products = await getProducts();

    return (
        <>
            <PriceRisers products={products} />
            <PriceFallers products={products} />
            <AllProducts products={products} />
        </>
    );
}