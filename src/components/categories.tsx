"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categoryFilters } from "@/contants/categories";
const Categories = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category");
  const handleTags = (category: string) => () => {
    router.push(`${pathname}?category=${category}`);
  };

  return (
    <div className="flexBetween w-full gap-5 mt-5">
      <ul className="flex gap-2 overflow-auto no-scrollbar">
        {categoryFilters.map((category) => (
          <button
            key={category}
            type="button"
            onClick={handleTags(category)}
            className={`${
              category === selectedCategory ? "bg-light-white-300" : ""
            } px-4 py-3 rounded-lg capitalize whitespace-nowrap font-semibold text-neutral-700`}
          >
            {category}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
