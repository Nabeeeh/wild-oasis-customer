"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { ICabinDetails, ISettings } from "../_types/index";
import { useReservation } from "../_context/ReservationContext";

type TDateSelectorProps = {
  settings: ISettings;
  bookedDates: Date[];
  cabin: ICabinDetails;
};

function isAlreadyBooked(range: DateRange, datesArr: Date[]) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, {
        start: range.from as Date,
        end: range.to as Date,
      })
    )
  );
}

function DateSelector({ settings, bookedDates, cabin }: TDateSelectorProps) {
  const { range, setRange, resetRange } = useReservation();

  const displayedRange = isAlreadyBooked(range, bookedDates)
    ? undefined
    : range;

  const { regularPrice, discount } = cabin;

  const numNights = differenceInDays(
    displayedRange?.to as Date,
    displayedRange?.from as Date
  );

  const cabinPrice = numNights * (regularPrice - discount);

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between my-day-picker">
      <DayPicker
        className="py-4 lg:pt-12 place-self-center"
        mode="range"
        onSelect={(range) => {
          if (range) {
            setRange(range);
          }
        }}
        selected={displayedRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDay) =>
          isPast(curDay) || bookedDates.some((date) => isSameDay(date, curDay))
        }
      />

      <div className="flex items-center justify-between px-1 sm:px-2 py-2 md:px-8 bg-accent-500 text-primary-800">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="flex items-center gap-1  bg-accent-600 px-1 md:px-2 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-base md:text-lg font-bold uppercase">
                  Total
                </span>{" "}
                <span className="text-lg md:text-2xl font-semibold">
                  ${cabinPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-1 sm:px-3 md:px-4 text-sm font-semibold hover:bg-accent-600 transition-all"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
