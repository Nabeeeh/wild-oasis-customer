import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "../_lib/actions";

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className="px-1 py-2 md:py-3 md:px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full">
        <ArrowRightOnRectangleIcon className="size-5 text-primary-600" />
        <span className="hidden sm:block">Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
