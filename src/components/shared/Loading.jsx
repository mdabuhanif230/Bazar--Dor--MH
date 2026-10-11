export default function Loading({ count = 6 }) {
  const skeletonCards = Array.from(
    { length: count },
    function (_, index) {
      return (
        <div
          key={index}
          className="panel skeleton-card"
        >
          <div className="skeleton h-10 w-10 rounded-full" />

          <div className="skeleton mt-4 h-4 w-2/3" />

          <div className="skeleton mt-3 h-3 w-1/3" />

          <div className="skeleton mt-5 h-5 w-1/2" />
        </div>
      );
    }
  );

  return (
    <div
      role="status"
      aria-label="পণ্যের তথ্য লোড হচ্ছে"
    >
      <span className="sr-only">
        লোড হচ্ছে...
      </span>

      <div className="product-grid">
        {skeletonCards}
      </div>
    </div>
  );
}