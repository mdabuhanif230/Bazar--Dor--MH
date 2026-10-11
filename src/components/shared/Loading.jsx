import { Skeleton } from "@heroui/react";

export default function Loading({ count = 6 }) {
  const skeletonCards = Array.from(
    { length: count },
    function (_, index) {
      return (
        <div
          key={index}
          className="min-h-[160px] rounded-xl border border-[#e7eee9] bg-[#ffffffba] p-[18px]"
        >
          <Skeleton className="h-10 w-10 rounded-full bg-[#dfe9e2] motion-reduce:animate-none motion-reduce:before:animate-none" />

          <Skeleton className="mt-4 h-4 w-2/3 rounded-md bg-[#dfe9e2] motion-reduce:animate-none motion-reduce:before:animate-none" />

          <Skeleton className="mt-3 h-3 w-1/3 rounded-md bg-[#dfe9e2] motion-reduce:animate-none motion-reduce:before:animate-none" />

          <Skeleton className="mt-5 h-5 w-1/2 rounded-md bg-[#dfe9e2] motion-reduce:animate-none motion-reduce:before:animate-none" />
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

      <div
        aria-hidden="true"
        className="grid grid-cols-3 gap-4 max-[900px]:gap-3 max-[767px]:grid-cols-2 max-[540px]:grid-cols-1"
      >
        {skeletonCards}
      </div>
    </div>
  );
}