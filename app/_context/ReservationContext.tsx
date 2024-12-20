"use client";

import { createContext, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

interface IReservationContext {
  range: DateRange;
  setRange: (range: DateRange) => void;
  resetRange: () => void;
}

const ReservationContext = createContext<IReservationContext | null>(null);

const rangeInitialState = { from: undefined, to: undefined };

export const ReservationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [range, setRange] = useState<DateRange>(rangeInitialState);

  const resetRange = () => setRange(rangeInitialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  const context = useContext(ReservationContext) as IReservationContext;
  if (context === undefined)
    throw new Error("useReservation must be used within a ReservationProvider");
  return context;
};
