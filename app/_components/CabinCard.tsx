import Image from "next/image";
import Link from "next/link";
import { UsersIcon } from "@heroicons/react/24/solid";

import { ICabin } from "../_types/index";

function CabinCard({ cabin }: { cabin: ICabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex border-primary-800 border">
      <div className="flex-1 relative">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          className="object-cover border-r border-primary-800"
          fill
          sizes="(max-width: 768px) 20vw, 15vw"
        />
      </div>

      <div className="flex-grow">
        <div className="pt-3 pb-2 px-2 md:pt-5 md:pb-4 md:px-7 bg-primary-950">
          <h3 className="text-accent-500 font-semibold text-2xl mb-3">
            Cabin {name}
          </h3>

          <div className="flex gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-600">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${regularPrice}</span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="bg-primary-950 border-t border-t-primary-800 text-right">
          <Link
            href={`/cabins/${id}`}
            className="border-l border-primary-800 p-2 sm:py-4 sm:px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
