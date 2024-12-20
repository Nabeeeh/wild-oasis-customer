"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { type TCabinFilter } from "../_types/index";

import CabinsFilterButton from "./CabinsFilterButton";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeFilter = (searchParams.get("capacity") as TCabinFilter) ?? "all";

  const cabinsFilterHandler = (filter: TCabinFilter) => {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex border border-primary-800">
      <CabinsFilterButton
        filter="all"
        activeFilter={activeFilter}
        cabinsFilterHandler={cabinsFilterHandler}
      >
        All Cabins
      </CabinsFilterButton>

      <CabinsFilterButton
        filter="small"
        activeFilter={activeFilter}
        cabinsFilterHandler={cabinsFilterHandler}
      >
        1&mdash;3 Guests
      </CabinsFilterButton>

      <CabinsFilterButton
        filter="medium"
        activeFilter={activeFilter}
        cabinsFilterHandler={cabinsFilterHandler}
      >
        4&mdash;7 Guests
      </CabinsFilterButton>

      <CabinsFilterButton
        filter="large"
        activeFilter={activeFilter}
        cabinsFilterHandler={cabinsFilterHandler}
      >
        8&mdash;12 Guests
      </CabinsFilterButton>
    </div>
  );
};

export default Filter;
