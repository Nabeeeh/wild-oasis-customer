"use client";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h2 className="text-3xl font-semibold">Something went wrong!</h2>
      <p className="text-lg">{error.message}</p>

      <button
        onClick={() => reset()}
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Try again
      </button>
    </main>
  );
};

export default Error;
