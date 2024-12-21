"use client";

import Image from "next/image";
import { differenceInDays } from "date-fns";

import { useReservation } from "../_context/ReservationContext";
import { useAuth } from "../_context/AuthContext";

import { ICabinDetails, IReservationData } from "../_types/index";
import { CreateReservationAction } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin }: { cabin: ICabinDetails }) {
  const session = useAuth();
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const { from: startDate, to: endDate } = range;

  const numNights = differenceInDays(endDate as Date, startDate as Date);

  const cabinPrice = numNights * (regularPrice - discount);

  const reservationData: IReservationData = {
    cabinId: id,
    startDate,
    endDate,
    numNights,
    cabinPrice,
  };

  const createReservationWithData = CreateReservationAction.bind(
    null,
    reservationData
  );

  return (
    <div>
      <div className="bg-primary-800 text-primary-300 px-4 md:px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <Image
            className="size-8 rounded-full"
            src={session?.user?.image ?? "../../public/default-profile.jpg"}
            alt={session?.user?.name ?? "User image"}
            width={32}
            height={32}
            referrerPolicy="no-referrer"
            unoptimized
          />
          <p>{session?.user?.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await createReservationWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-4 md:px-16 text-sm md:text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-sm sm:text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingText="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
