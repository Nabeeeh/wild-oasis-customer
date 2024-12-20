import { Metadata } from "next";
import { auth } from "../_lib/auth";

export const metadata: Metadata = {
  title: "Guest Area",
};

const Account = async () => {
  const session = await auth();

  return (
    <section>
      <h2 className="font-semibold text-2xl mb-7">
        Welcome, <span className="text-accent-400">{session?.user?.name}</span>
      </h2>
    </section>
  );
};

export default Account;
