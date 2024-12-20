import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase";
import { notFound } from "next/navigation";
import {
  IBooking,
  IBookingDetails,
  ICabin,
  ICabinDetails,
  ICountry,
  IGuest,
  ISettings,
} from "../_types/index";

/////////////
// GET

export async function getCabin(id: number): Promise<ICabinDetails> {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    notFound();
  }

  return data;
}

export async function getCabinPrice(id: number) {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export const getCabins = async function (): Promise<ICabin[]> {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  if (error) throw new Error(error.message);

  return data;
};

// Guests are uniquely identified by their email address
export const getGuest = async function (email: string): Promise<IGuest> {
  const { data } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  return data;
};

export async function getBooking(id: number): Promise<IBookingDetails> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function getBookings(guestId: number): Promise<IBooking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)"
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) throw new Error(error.message);

  if (!data) return [];

  const bookings: IBooking[] = data.map((booking) => ({
    ...booking,
    cabins: Array.isArray(booking.cabins) ? booking.cabins[0] : booking.cabins,
  }));

  return bookings;
}

export async function getBookedDatesByCabinId(
  cabinId: number
): Promise<Date[]> {
  let today: Date | string = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) throw new Error(error.message);

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings(): Promise<ISettings> {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) throw new Error(error.message);

  return data;
}

export async function getCountries(): Promise<ICountry[]> {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();

    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

/////////////
// CREATE

export async function createGuest(newGuest: {
  email: string;
  fullName: string;
}): Promise<IGuest | null> {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) throw new Error(error.message);

  return data;
}
