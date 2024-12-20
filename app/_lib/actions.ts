"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
import { IReservationData } from "../_types";

// Auth Actions
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

// Profile Actions
export async function updateProfileAction(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be Logged In .");

  const nationalID = formData.get("nationalID") as string;
  const [nationality, countryFlag] = (
    formData.get("nationality") as string
  ).split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updatedProfileData = {
    nationalID,
    nationality,
    countryFlag,
  };

  const { error } = await supabase
    .from("guests")
    .update(updatedProfileData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

// Create Action
export async function CreateReservationAction(
  reservationData: IReservationData,
  formData: FormData
) {
  const session = await auth();
  if (!session) throw new Error("You must be Logged In .");

  const newReservation = {
    ...reservationData,
    guestId: session?.user?.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000),
    extrasPrice: 0,
    totalPrice: reservationData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newReservation]);

  if (error) throw new Error(error.message);

  revalidatePath(`/cabins/${newReservation.cabinId}`);

  redirect(`/cabins/thankyou`);
}

// Delete Action

export async function deleteReservationAction(bookingId: number) {
  const session = await auth();
  if (!session) throw new Error("You must be Logged In .");

  const guestBookings = await getBookings(session.user.guestId as number);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You can't delete this reservation");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error(error.message);

  revalidatePath("account/reservations");
}

// Update Action

export async function updateReservationAction(formData: FormData) {
  const bookingId = Number(formData.get("bookingId"));

  const session = await auth();
  if (!session) throw new Error("You must be Logged In .");

  const guestBookings = await getBookings(session.user.guestId as number);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You can't Update this reservation");

  const updatedReservationData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updatedReservationData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/account/reservations", "layout");

  redirect("/account/reservations");
}
