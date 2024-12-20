export interface ICabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
}

export interface ICabinDetails {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}

export interface IGuest {
  id: number;
  created_at: Date;
  fullName: string;
  email: string;
  nationality?: string | undefined;
  nationalID?: string | undefined;
  countryFlag?: string | undefined;
}

export interface IBooking {
  id: number;
  created_at: Date;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  guestId: number;
  cabinId: number;
  cabins: {
    name: string;
    image: string;
  };
}

export interface IBookingDetails {
  id: number;
  created_at: Date;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-out" | "checked-in";
  hasBreakfast: boolean;
  isPaid: boolean;
  observations?: string;
  cabinId: number;
  guestId: number;
}

export interface IReservationData {
  cabinId: number;
  startDate?: Date;
  endDate?: Date;
  numNights: number;
  cabinPrice: number;
}

export interface INewReservation extends IReservationData {
  guestId: number;
  numGuests: number;
  observations: string;
  extrasPrice: number;
  totalPrice: number;
  isPaid: boolean;
  hasBreakfast: boolean;
  status: "unconfirmed" | "checked-out" | "checked-in";
}

export interface ISettings {
  id: number;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

export interface ICountry {
  name: string;
  flag: string;
  independent: boolean;
}

export type TCabinFilter = "all" | "small" | "medium" | "large";

export type TSearchParams = {
  capacity?: TCabinFilter;
};
