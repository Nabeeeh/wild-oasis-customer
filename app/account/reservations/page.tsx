import ReservationsList from "@/app/_components/ReservationsList";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reservations",
};

const Reservation = async () => {
  const session = await auth();

  const bookings = await getBookings(session?.user?.guestId as number);

  return (
    <section>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationsList bookings={bookings} />
      )}
    </section>
  );
};

export default Reservation;
