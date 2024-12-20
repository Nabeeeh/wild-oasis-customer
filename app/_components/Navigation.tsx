import Link from "next/link";
import UserLogo from "./UserLogo";

export default function Navigation() {
  return (
    <nav className="z-10 text-sm md:text-xl">
      <ul className="flex gap-5 sm:gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <UserLogo />
      </ul>
    </nav>
  );
}
