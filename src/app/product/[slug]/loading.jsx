export default function ProductLoading() {
    return (
        <div
            role="status"
            aria-label="পণ্যের বিস্তারিত লোড হচ্ছে"
        >
            <div className="panel skeleton mb-5 h-32" />

            <div className="panel skeleton h-96" />
        </div>
    );
}