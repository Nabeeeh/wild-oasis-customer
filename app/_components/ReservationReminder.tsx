"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useReservation } from "../_context/ReservationContext";

function ReservationReminder() {
  const { range, resetRange } = useReservation();

  if (!range?.from || !range?.to) return null;

  return (
    <div className="fixed bottom-6 left-1/2 w-4/5 sm:w-auto -translate-x-1/2 px-4 py-1 md:py-5 md:px-8 rounded-full bg-accent-500 text-primary-800 text-xs sm:text-sm  font-semibold shadow-xl shadow-slate-900 flex gap-1 md:gap-8 items-center justify-between">
      <p>
        <span>👋</span> Don&apos;t forget to reserve your dates <br /> from{" "}
        {format(new Date(range.from), "MMM dd yyyy")} to{" "}
        {format(new Date(range.to), "MMM dd yyyy")}
      </p>
      <button
        className="rounded-full p-1 hover:bg-accent-600 transition-all"
        onClick={resetRange}
      >
        <XMarkIcon className="h-4 w-4 md:h-5 md:w-5" />
      </button>
    </div>
  );
}

export default ReservationReminder;
