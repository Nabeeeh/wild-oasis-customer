import Link from "next/link";

const NotFound = () => {
  return (
    <main className="text-center space-y-6 mt-4">
      <h2 className="text-3xl font-semibold">
        This Cabin could not be found :(
      </h2>
      <Link
        href="/cabins"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Go To Cabins
      </Link>
    </main>
  );
};

export default NotFound;
