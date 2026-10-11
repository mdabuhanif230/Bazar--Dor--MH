import ProductCard from "@/components/products/ProductCard";

export default function AllProducts({ products }) {
    const productCards = products.map(function (product) {
        return (
            <ProductCard
                key={product.id}
                product={product}
            />
        );
    });

    return (
        <section id="সব-পণ্য" className="mt-[30px]">
            <h2 className="mb-[14px] text-[17px] font-semibold">
                সব পণ্য
            </h2>

            <p className="-mt-2 mb-4 text-xs text-[#78877d]">
                আজকের বাজারদর দেখুন এবং বিস্তারিত জানতে পণ্যে ক্লিক করুন।
            </p>

            <div className="grid grid-cols-3 gap-4 max-[900px]:gap-3 max-[767px]:grid-cols-2 max-[540px]:grid-cols-1">
                {productCards}
            </div>
        </section>
    );
}