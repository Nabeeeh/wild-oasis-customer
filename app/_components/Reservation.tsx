import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";

import { ICabinDetails } from "../_types/index";

import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

const Reservation = async ({ cabin }: { cabin: ICabinDetails }) => {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const session = await auth();

  return (
    <section className="grid grid-rows-2 lg:grid-rows-none lg:grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? <ReservationForm cabin={cabin} /> : <LoginMessage />}
    </section>
  );
};

export default Reservation;
