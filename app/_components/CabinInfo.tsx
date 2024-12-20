import Image from "next/image";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

import { ICabinDetails } from "../_types/index";

const CabinInfo = ({ cabin }: { cabin: ICabinDetails }) => {
  const { name, maxCapacity, image, description } = cabin;

  return (
    <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-[3.5fr_4fr] lg:grid-cols-[3fr_4fr] gap-12 lg:gap-20 border border-primary-800 px-2 py-3 md:px-10 mb-24">
      <div className="relative row-span-1 md:col-span-1 md:scale-[1.15] md:-translate-x-3">
        <Image
          src={image}
          className="object-cover"
          alt={`Cabin ${name}`}
          fill
          sizes="(max-width: 768px) 70vw, 35vw"
        />
      </div>

      <div className="row-span-1 md:col-span-1">
        <h3 className="text-accent-100 font-black text-4xl md:text-7xl mb-5 md:translate-x-[-254px] bg-primary-950 px-0 md:p-6 pb-1 md:w-[150%]">
          Cabin {name}
        </h3>

        <p className="text-lg text-primary-300 mb-10">{description}</p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CabinInfo;
