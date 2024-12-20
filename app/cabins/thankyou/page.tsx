import Link from "next/link";

export default function ThankYou() {
  return (
    <section className="text-center space-y-6 mt-4">
      <h2 className="text-xl md:text-3xl font-semibold">
        Thank you for your reservation!
      </h2>
      <Link
        href="/account/reservations"
        className="underline text-lg md:text-xl text-accent-500 inline-block"
      >
        Manage your reservations &rarr;
      </Link>
    </section>
  );
}
