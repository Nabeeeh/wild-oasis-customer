"use client";

import { useOptimistic } from "react";
import { deleteReservationAction } from "../_lib/actions";

import { IBooking } from "../_types";

import ReservationCard from "./ReservationCard";

type TReservationsListProps = {
  bookings: IBooking[];
};

const ReservationsList = ({ bookings }: TReservationsListProps) => {
  const [optimisticBookings, setOptimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  const deleteReservationHandler = async (bookingId: number) => {
    setOptimisticDelete(bookingId);
    await deleteReservationAction(bookingId);
  };

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDeleteReservation={deleteReservationHandler}
        />
      ))}
    </ul>
  );
};

export default ReservationsList;
