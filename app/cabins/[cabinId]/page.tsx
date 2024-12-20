import { getCabin, getCabins } from "@/app/_lib/data-service";

import Reservation from "@/app/_components/Reservation";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import CabinInfo from "@/app/_components/CabinInfo";

export const generateMetadata = async ({
  params,
}: {
  params: { cabinId: number };
}) => {
  const { cabinId } = params;
  const { name } = await getCabin(cabinId);

  return {
    title: `Cabin ${name}`,
  };
};

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));

  return ids;
}

const CabinDetails = async ({ params }: { params: { cabinId: number } }) => {
  const { cabinId } = params;

  const cabin = await getCabin(cabinId);

  return (
    <section className="max-w-7xl mx-auto mt-8">
      <CabinInfo cabin={cabin} />

      <div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-accent-400 mb-10">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </section>
  );
};

export default CabinDetails;
