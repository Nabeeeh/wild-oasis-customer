import { Metadata } from "next";
import { getBooking, getCabin } from "@/app/_lib/data-service";
import { updateReservationAction } from "@/app/_lib/actions";

import SubmitButton from "@/app/_components/SubmitButton";

export const metadata: Metadata = {
  title: "Edit Reservation",
};

const EditReservation = async ({
  params,
}: {
  params: { bookingId: number };
}) => {
  const { bookingId } = params;

  const { numGuests, observations, cabinId } = await getBooking(bookingId);

  const { maxCapacity } = await getCabin(cabinId);

  return (
    <section>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <form
        action={updateReservationAction}
        className="bg-primary-900 py-8 px-5 md:px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests" className="text-base sm:text-lg">
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="px-2 md:px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
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

        <input
          type="hidden"
          name="bookingId"
          id="bookingId"
          value={bookingId}
        />

        <div className="space-y-2">
          <label htmlFor="observations" className="text-base sm:text-lg">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={observations}
          />
        </div>

        <div className="flex justify-end items-center">
          <SubmitButton pendingText="Updating...">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </section>
  );
};

export default EditReservation;
