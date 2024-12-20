"use client";

import { useTransition } from "react";

import { TrashIcon } from "@heroicons/react/24/solid";
import SpinnerMini from "./SpinnerMini";

type TDeleteReservationProps = {
  bookingId: number;
  onDeleteReservation: (bookingId: number) => void;
};

function DeleteReservation({
  bookingId,
  onDeleteReservation,
}: TDeleteReservationProps) {
  const [isPending, startTransition] = useTransition();

  const deleteReservationHandler = () => {
    startTransition(() => onDeleteReservation(bookingId));
  };

  return (
    <button
      onClick={deleteReservationHandler}
      className="group flex flex-1 sm:flex-auto items-center justify-center md:px-1  gap-2  md:gap-1 py-3 border-l sm:border-l-0 sm:border-t border-primary-800  uppercase text-xs font-bold text-primary-300 hover:bg-red-700 transition-colors hover:text-primary-50"
    >
      {isPending ? (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      ) : (
        <>
          <TrashIcon className="size-5 md:size-4 lg:size-5 text-primary-600 group-hover:text-primary-50 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      )}
    </button>
  );
}

export default DeleteReservation;
