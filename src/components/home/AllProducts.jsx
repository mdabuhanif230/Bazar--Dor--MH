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
        <section id="সব-পণ্য" className="product-section">
            <h2>সব পণ্য</h2>

            <p className="section-subtitle">
                আজকের বাজারদর দেখুন এবং বিস্তারিত জানতে পণ্যে ক্লিক করুন।
            </p>

            <div className="product-grid">
                {productCards}
            </div>
        </section>
    );
}