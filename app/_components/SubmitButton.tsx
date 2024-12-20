"use client";

import { useFormStatus } from "react-dom";

type TSubmitButtonProps = {
  children: React.ReactNode;
  pendingText: string;
  startDate?: Date;
  endDate?: Date;
};

const SubmitButton = ({
  children,
  pendingText,
  startDate,
  endDate,
}: TSubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-accent-500 px-4 py-3 md:px-8 md:py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending || !startDate || !endDate}
    >
      {pending ? pendingText : children}
    </button>
  );
};

export default SubmitButton;
