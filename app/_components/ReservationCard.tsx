import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import { IBooking } from "../_types";
import Image from "next/image";
import Link from "next/link";

type TReservationCardProps = {
  booking: IBooking;
  onDeleteReservation: (bookingId: number) => void;
};

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({
  booking,
  onDeleteReservation,
}: TReservationCardProps) {
  const {
    id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="flex flex-col sm:flex-row border border-primary-800">
      <div className="relative h-32 sm:aspect-square">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          className="object-cover h-full border-r border-primary-800"
          fill
          sizes="(max-width: 640px) 90vw, 15vw"
        />
      </div>

      <div className="py-3 px-3 md:px-1 lg:px-6 flex flex-col sm:flex-grow gap-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg lg:text-2xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 py-1 px-1 lg:px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 py-1 px-1 lg:px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
        </div>

        <p className="mt-2 text-xs md:text-sm lg:text-lg text-primary-300">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex gap-2 lg:gap-5 mt-auto items-baseline">
          <p className="text-base lg:text-xl font-semibold text-accent-400">
            ${totalPrice}
          </p>
          <p className=" text-primary-300">&bull;</p>
          <p className="text-sm lg:text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="ml-auto text-xs lg:text-sm text-primary-400">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      <div className="flex sm:flex-col sm:flex-grow  border-t sm:border-l sm:border-t-0 border-primary-800 ">
        {!isPast(new Date(startDate)) && (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex flex-1 sm:flex-auto items-center justify-center py-3 gap-2 md:px-1 md:gap-1 uppercase text-xs font-bold text-primary-300 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="size-5 md:size-4 lg:size-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span>Edit</span>
            </Link>
            <DeleteReservation
              bookingId={id}
              onDeleteReservation={onDeleteReservation}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;
