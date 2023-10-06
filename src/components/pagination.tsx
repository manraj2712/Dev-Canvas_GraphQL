"use client";

import { useRouter } from "next/navigation";
import Button from "./button";
type Props = {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
const Pagination = ({
  startCursor,
  endCursor,
  hasNextPage,
  hasPreviousPage,
}: Props) => {
  const router = useRouter();

  const handleNavigation = (direction: string) => {
    const currentParams = new URLSearchParams(window.location.search);

    if (direction === "next" && hasNextPage) {
      currentParams.delete("startCursor");
      currentParams.set("endCursor", endCursor);
    } else if (direction === "first" && hasPreviousPage) {
      currentParams.delete("endCursor");
      currentParams.set("startCursor", startCursor);
    }

    const newParams = currentParams.toString();
    const newUrl = `${window.location.pathname}?${newParams}`;
    router.push(newUrl);
  };
  return (
    <div className="w-full flexCenter gap-5 mt-10">
      {hasPreviousPage && (
        <Button
          title="First Page"
          handleClick={() => {
            handleNavigation("first");
          }}
        />
      )}
      {hasNextPage && (
        <Button
          title="Next"
          handleClick={() => {
            handleNavigation("next");
          }}
        />
      )}
    </div>
  );
};

export default Pagination;
