import { getCabins } from "../_lib/data-service";

import { type TCabinFilter } from "../_types/index";

import CabinCard from "./CabinCard";

const CabinList = async ({ filter }: { filter: TCabinFilter }) => {
  const cabins = await getCabins();

  if (!cabins.length) return null;

  let filteredCabins;

  if (filter === "all") filteredCabins = cabins;

  if (filter === "small")
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);

  if (filter === "medium")
    filteredCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );

  if (filter === "large")
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins &&
        filteredCabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
    </div>
  );
};

export default CabinList;
