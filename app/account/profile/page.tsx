import { Metadata } from "next";
import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

export const metadata: Metadata = {
  title: "Update Profile",
};

const Profile = async () => {
  const session = await auth();
  const currentGuest = await getGuest(session?.user?.email as string);

  return (
    <section>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-base md:text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm guest={currentGuest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={currentGuest?.nationality || ""}
        />
      </UpdateProfileForm>
    </section>
  );
};

export default Profile;
