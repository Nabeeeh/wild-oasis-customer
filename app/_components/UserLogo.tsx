import Link from "next/link";
import Image from "next/image";
import { auth } from "../_lib/auth";

const UserLogo = async () => {
  const session = await auth();

  return (
    <li>
      {session?.user ? (
        <Link
          href="/account"
          className="hover:text-accent-400 transition-colors flex items-center gap-2 sm:gap-4"
        >
          <Image
            src={session?.user?.image ?? "../../public/default-profile.jpg"}
            alt={session?.user?.name ?? "User image"}
            width={32}
            height={32}
            className="size-8 rounded-full"
            referrerPolicy="no-referrer"
            priority
            unoptimized
          />

          <span>Guest area</span>
        </Link>
      ) : (
        <Link
          href="/account"
          className="hover:text-accent-400 transition-colors"
        >
          Guest area
        </Link>
      )}
    </li>
  );
};

export default UserLogo;
